import { App, createPage } from 'vuepress/core';
import { path } from 'vuepress/utils';
import { readdir, stat, writeFile, readFile } from 'fs/promises';

const fileDict: Record<string, string[]> = {};

export default {
    // 插件名称
    name: 'vuepress-plugin-ensure-dir',

    async onPrepared(app: App) {
        debugger
    },


    // onPrepared 钩子
    async onInitialized(app: App) {

        const lightDir = path.resolve(app.dir.source(), 'light');
        const dirents = await readdir(lightDir, {
            recursive: true,
            withFileTypes: true,
        });
        const jpegDirents = dirents.filter(
            (d) => d.isFile() && /\.jpe?g$/i.test(d.name)
        );
        const CONCURRENCY = 64; // 可根据系统调整，建议 32-128
        for (let i = 0; i < jpegDirents.length; i += CONCURRENCY) {
            const chunk = jpegDirents.slice(i, i + CONCURRENCY);
            // 并发获取当前块所有文件的 stat
            const stats = await Promise.all(chunk.map((d) => stat(path.join(d.parentPath, d.name))));
            // 处理当前块的数据
            chunk.forEach((d, index) => {
                const filePath = path.join(d.parentPath, d.name);
                const birthtime = stats[index].birthtime;
                const year = birthtime.getFullYear() + '';
                const month = (birthtime.getMonth() + 1) + '';
                const day = birthtime.getDate() + '' + '';
                const date = year +'年'+ month + '月' + day +'日';
                if (!fileDict[date]) {
                    fileDict[date] = [];
                }
                const relativePath = path.relative(lightDir, filePath);
                fileDict[date].push(relativePath);
            });
        }
        
        let data = '## 图片画廊\n'
        for (const date in fileDict) {
            console.log(date);
            data += `\n ## ${date}\n`
            data += `<div class="gallery-container" style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:12px;">\n`
            fileDict[date].forEach((filePath) => {
                data += `<img src="@source/light/${filePath}" alt="" />\n`
            })
            data += `</div>\n`
        }
        
        // 5. 创建一个普通页面（链接到该组件）
        const page = await createPage(app, {
            path: '/gallery.html',
            content: data,
            frontmatter: {
                title: '图片画廊',
                layout: 'Layout',
            },
        });
        
        // 写入文件
        await writeFile(page.componentFilePath, page.content);
        app.pages.push(page);
    }
};
