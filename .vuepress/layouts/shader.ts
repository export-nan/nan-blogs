import fragment_shader_2d from './shader.glsl?raw';

export interface MousePosition {
  x: number;
  y: number;
  active: boolean;
  fv?: number;
}

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
out vec2 vTexCoord;

void main() {
    // 将位置从[0,1]转换到[-1,1]（NDC）
    gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    // 将纹理坐标传递给片段着色器
    vTexCoord = aPosition;
}`;

const FRAGMENT_SHADER = `${fragment_shader_2d}
void main() {
    // 将纹理坐标转换为像素坐标，类似于Shadertoy的fragCoord
    vec2 fragCoord = vTexCoord * iResolution;
    

    vec4 color;
    mainImage(color, fragCoord);

    fragColor = color; // 示例：红色
}`;

export default function main(gl: WebGL2RenderingContext, mousePosition: MousePosition): () => void {
  const shaders: WebGLShader[] = [];
  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let vertexArray: WebGLVertexArrayObject | null = null;
  let frame: number | null = null;
  let disposed = false;

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    if (frame !== null) cancelAnimationFrame(frame);
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.useProgram(null);
    if (vertexArray) gl.deleteVertexArray(vertexArray);
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
    for (const shader of shaders) gl.deleteShader(shader);
    shaders.length = 0;
  };

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Unable to allocate a WebGL shader.');
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || 'Unable to compile a WebGL shader.');
    }
    return shader;
  };

  try {
    const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    program = gl.createProgram();
    if (!program) throw new Error('Unable to allocate a WebGL program.');
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'Unable to link the WebGL program.');
    }
    for (const shader of shaders) {
      gl.detachShader(program, shader);
      gl.deleteShader(shader);
    }
    shaders.length = 0;

    const resolution = gl.getUniformLocation(program, 'iResolution');
    const time = gl.getUniformLocation(program, 'iTime');
    const mouse = gl.getUniformLocation(program, 'iMouse');
    const mouseActive = gl.getUniformLocation(program, 'iMouseActive');
    const fv = gl.getUniformLocation(program, 'fv');
    const position = gl.getAttribLocation(program, 'aPosition');
    if (position < 0) throw new Error('The WebGL program is missing aPosition.');

    buffer = gl.createBuffer();
    if (!buffer) throw new Error('Unable to allocate the WebGL vertex buffer.');
    vertexArray = gl.createVertexArray();
    if (!vertexArray) throw new Error('Unable to allocate the WebGL vertex array.');
    gl.bindVertexArray(vertexArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const startTime = performance.now();
    const render = (timestamp: number) => {
      if (disposed) return;
      gl.useProgram(program);
      gl.bindVertexArray(vertexArray);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.uniform2f(resolution, gl.canvas.width, gl.canvas.height);
      // Older GLSL uses (0, 0) as the inactive mouse sentinel.
      const active = mousePosition.active;
      gl.uniform2f(mouse, active ? mousePosition.x : 0, active ? mousePosition.y : 0);
      gl.uniform1f(mouseActive, active ? 1 : 0);
      gl.uniform1f(fv, mousePosition.fv ?? 0);
      gl.uniform1f(time, (timestamp - startTime) / 1000);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = requestAnimationFrame(render);
    };
    render(startTime);
  } catch (error) {
    console.error('Unable to initialize the animated background:', error);
    dispose();
  }
  return dispose;
}
