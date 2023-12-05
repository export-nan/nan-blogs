import { Camera } from "./Camera"
import {mat4, vec3} from 'gl-matrix'

type VERTEX_SHADER = WebGLRenderingContextBase

// 着色器基类
export abstract class ShaderBase {
  public readonly element: HTMLCanvasElement
  public readonly gl: WebGLRenderingContext

  // 顶点着色器
  public abstract vertexShaderSource: string
  public vertexShader: WebGLShader
  // 片源着色器
  public abstract framgmentShaderSource: string
  public fragmentShader: WebGLShader

  // 生成数据
  abstract createData():void

  // 绑定数据到着色器程序 
  // 将生成的数据绑定到program的对应变量中去
  abstract bindAttrib():void

  // 渲染Shader
  // 在这里可以对视图进行调整
  abstract render():void

  // 着色器程序
  public program: WebGLProgram

  // 相机矩阵
  public camera: Camera

  // 模型位置信息
  public position = vec3.fromValues(0,0,0)
  // 模型旋转角度
  public rotation = vec3.fromValues(0,0,0)

  public get modelMatrix():mat4{
    const {position, rotation} = this

    const matrix = mat4.identity(mat4.create())
    mat4.fromTranslation(matrix, position)
    
    return matrix
  }


  constructor(element: HTMLCanvasElement, gl: WebGLRenderingContext, camera: Camera){
    this.element = element
    this.gl = gl
    this.camera = camera
  }

  /**
   * 渲染顺序
   * new -> init -> createData -> bindAttrib -> useProgram -> render
   * */ 

  // 初始化着色器程序
  public init(){
    let {gl} = this
    this.vertexShader = this.createShader(gl.VERTEX_SHADER, this.vertexShaderSource) as WebGLShader
    this.fragmentShader = this.createShader(gl.FRAGMENT_SHADER, this.framgmentShaderSource) as WebGLShader;
    this.program = this.createProgram() as WebGLProgram
  }

  

  // 启用当前着色器程序
  public useProgram(){
    const {gl, program} = this
    gl.useProgram(program)
  }
  
  // 创建着色器
  private createShader(type: number, source: string) {
    const gl = this.gl
    const shader = gl.createShader(type) as WebGLShader;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    gl.deleteShader(shader);
    throw Error(gl.getShaderInfoLog(shader) as string)
  }

  // 创建着色器程序
  private createProgram() {
    const {gl, vertexShader, fragmentShader} = this
    
    const program = gl.createProgram() as WebGLProgram;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return program;
    }
    gl.deleteProgram(program);
    throw Error(gl.getProgramInfoLog(program) as string)
  }
}

// init -> createData -> bindAttrib -> useProgram