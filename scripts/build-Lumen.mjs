import { readdir, mkdir, rm, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import exifr from 'exifr';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'Lumen');
const output = path.join(root, '.vuepress/public/Lumen');
const supported = /\.(jpe?g|png|webp|avif|tiff?)$/i;

async function scan(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await scan(full));
    else if (entry.isFile() && supported.test(entry.name)) files.push(full);
  }
  return files.sort();
}

function equipmentName(make, model) {
  const manufacturer = typeof make === 'string' ? make.trim() : '';
  const name = typeof model === 'string' ? model.trim() : '';
  if (!name) return undefined;
  return manufacturer && !name.toLowerCase().includes(manufacturer.toLowerCase())
    ? `${manufacturer} ${name}` : name;
}

function photoMetadata(exif) {
  const metadata = {};
  const camera = equipmentName(exif?.Make, exif?.Model);
  const lens = equipmentName(exif?.LensMake, exif?.LensModel);
  if (camera) metadata.camera = camera;
  if (lens) metadata.lens = lens;
  for (const [field, tag] of Object.entries({
    iso: 'ISO', aperture: 'FNumber', exposureTime: 'ExposureTime',
    focalLength: 'FocalLength', focalLength35mm: 'FocalLengthIn35mmFormat',
  })) {
    const value = exif?.[tag];
    if (typeof value === 'number' && Number.isFinite(value) && value > 0) metadata[field] = value;
  }
  return Object.keys(metadata).length ? metadata : undefined;
}

export async function buildLumen() {
  await mkdir(source, { recursive: true });
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  const photos = [];
  for (const file of await scan(source)) {
    const relative = path.relative(source, file);
    try {
      // Preserve camera-local dates instead of shifting EXIF dates through UTC.
      const exif = await exifr.parse(file, {
        pick: ['DateTimeOriginal', 'CreateDate', 'Make', 'Model', 'LensMake', 'LensModel',
          'ISO', 'FNumber', 'ExposureTime', 'FocalLength', 'FocalLengthIn35mmFormat'],
        reviveValues: false,
      }).catch(() => null);
      const metadata = photoMetadata(exif);
      const raw = exif?.DateTimeOriginal ?? exif?.CreateDate;
      const match = typeof raw === 'string' && raw.match(/^(\d{4})[:-](\d{2})[:-](\d{2})[ T](\d{2}):(\d{2}):(\d{2})/);
      const fallback = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
      }).format((await stat(file)).mtime).replace(' ', 'T');
      const capturedAt = match ? `${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6]}` : fallback;
      const id = createHash('sha256').update(relative).digest('hex').slice(0, 20);
      const pipeline = sharp(file).rotate().flatten({ background: '#fff' }).toColourspace('srgb');
      // Sequential JPEG can paint decoded rows over the preview while downloading.
      const original = await pipeline.clone().jpeg({ quality: 95, progressive: false, mozjpeg: false }).toFile(path.join(output, `${id}.jpg`));
      await pipeline.clone().resize({ width: 720, height: 720, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(output, `${id}-preview.jpg`));
      // Bypass cached progressive originals when switching to sequential encoding.
      photos.push({ id, title: path.parse(file).name, capturedAt, date: capturedAt.slice(0, 10),
        preview: `/Lumen/${id}-preview.jpg`, original: `/Lumen/${id}.jpg?v=sequential-1`,
        width: original.width, height: original.height, ...(metadata ? { metadata } : {}) });
    } catch (error) {
      throw new Error(`处理照片失败：${relative} — ${error.message}`, { cause: error });
    }
  }
  photos.sort((a, b) => b.capturedAt.localeCompare(a.capturedAt) || a.id.localeCompare(b.id));
  await writeFile(path.join(output, 'photos.json'), JSON.stringify(photos, null, 2));
  console.log(`[Lumen] 已生成 ${photos.length} 张照片的原图和预览图`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await buildLumen();
