import fragment_shader_2d from './shader.glsl?raw';

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


class Result<T> {
  value: T | null;
  error: string | null;

  constructor(value: T | null, error: string | null) {
    this.value = value;
    this.error = error;
  }

  isSuccess(): boolean {
    return this.error === null;
  }

  static success<U>(value: U): Result<U> {
    return new Result<U>(value, null);
  }

  static failure<U>(error: string): Result<U> {
    return new Result<U>(null, error);
  }

  public asType<T>(): Result<T> {
    return Result.failure<T>(this.error || "Unknown error");
  }
}

class ShaderUtil {
  /** 初始化Buffer缓冲区
   *  @param target 目标缓冲区类型
   *  @param data 数据源
   *  @param usage 使用方式
   */
  public initBuffers(gl: WebGLRenderingContext, target: number, data: number[], usage: GLenum) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, new Float32Array(data), usage);
    return buffer;
  }
  /** 创建着色器
   * @param type 着色器类型
   * @param source 着色器代码
   */
  static createShader(gl: WebGLRenderingContext, type: number, source: string): Result<WebGLShader> {
    const shader = gl.createShader(type); // 创建着色器对象
    if (!shader) return Result.failure("创建着色器失败");
    gl.shaderSource(shader, source); // 提供数据源
    gl.compileShader(shader); // 编译 -> 生成着色器
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return Result.success(shader);
    }else {
      const err = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      return Result.failure(err || "创建着色器失败");
    }
  }
  /** 创建着色器程序
   * @param gl 
   * @param vertexShader 
   * @param fragmentShader 
   * @returns
   */
  static createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): Result<WebGLProgram> {
    const program = gl.createProgram() as WebGLProgram; // 创建程序对象
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return Result.success(program);
    }else {
      const err = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      return Result.failure(err || "创建着色器程序失败");
    }
  }
};
export default function main(gl: WebGLRenderingContext, mousePosition: { x: number, y: number }) {
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const vertexShader = ShaderUtil.createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  if (!vertexShader.isSuccess()) {
    return console.error(vertexShader.error)
  };
  const fragmentShader = ShaderUtil.createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!fragmentShader.isSuccess()) {
    return console.error(fragmentShader.error)
  };
  const programResult = ShaderUtil.createProgram(gl, vertexShader.value!, fragmentShader.value!);
  if (!programResult.isSuccess()) {
    return console.error(programResult.error)
  };
  const program = programResult.value!;
  const resolutionLocation = gl.getUniformLocation(program, "iResolution");
  const timeLocation = gl.getUniformLocation(program, "iTime");
  const mouseLocation = gl.getUniformLocation(program, "iMouse");
  const fv = gl.getUniformLocation(program, "fv");
  const positionLocation = gl.getAttribLocation(program, "aPosition");
  gl.useProgram(program);
  const startTime = Date.now();
  let f_v = 0.05;
  const a = mousePosition.x;
  const b = mousePosition.y;
  (function render(){
    if(mousePosition.x !== a || mousePosition.y !== b){
      f_v = 0.05
    }
    if (f_v > 0.01){
      f_v -= 0.01;
    }
    console.log(f_v)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    const time = Date.now() - startTime;
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(mouseLocation, mousePosition.x, mousePosition.y);
    gl.uniform1f(timeLocation, time/1000);
    gl.uniform1f(fv, f_v);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  })()
}