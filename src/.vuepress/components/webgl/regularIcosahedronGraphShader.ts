import { ShaderBase } from "./Shader.base"
import {glMatrix, vec4, vec3, mat4} from 'gl-matrix'
import { generateRegularIcosahedronGraph, hexToRgb, perspectiveMatrix, viewMatrix4f } from "./utils"
import { Camera } from "./Camera"

export type ITriangleVertex = [vec3,vec3,vec3]

export class RegularIcosahedronGraphShader extends ShaderBase{

  vertexShaderSource=`
  attribute vec3 a_Position;
  attribute vec4 a_Color;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ModelMatrix;

  varying vec4 v_Color;

  void main() {
    // 顶点的位置
    gl_Position =  u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * vec4(a_Position, 1.0);
    v_Color = a_Color;
  }
  `

  framgmentShaderSource=`
  precision highp float;

  varying vec4 v_Color;

  void main() {
    gl_FragColor = v_Color;
  }
  `
  // 密度 屏幕空间内的粒子数量
  public density: number = 10000

  // 元顶点集 三角型的其中一个点的坐标
  public vertexData:Float32Array
  public vertexColorData:Float32Array
  
  public colors = [
    '061b4d',
    '264d94',
    '6a1d67',
    '7c124c',
    'c86591',
    'd9bb62',
    '8cca7d',
    '1d8c77',
  ]

  public previousRender: number|null  = null
  public readonly createTime = performance.now()
  
  public get projectionMatrix(){
    const { width, height } = this.element    
    return perspectiveMatrix(70, width/height, 0.1, 1000)
  };

  constructor(element: HTMLCanvasElement, gl: WebGLRenderingContext, camera: Camera){
    super(element, gl, camera)
  }

  createData(){
    const vertexData:number[] = this.generateRegularIcosahedronGraph()
    const vertexColorData:number[] = []
    for(let i = 0; i < vertexData.length/3; i++){
      vertexColorData.push(...hexToRgb('1d8c77'))
    }    
    this.vertexData = new Float32Array(vertexData)
    this.vertexColorData = new Float32Array(vertexColorData)
  }

  
  bindAttrib() {
    let {gl, program} = this

    // 获取顶点数据
    let {vertexData, vertexColorData} = this
    
    const aPositionLocation = gl.getAttribLocation(program, 'a_Position');
    // 创建位置缓冲区
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aPositionLocation);
    gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0);

    const aColorLocation = gl.getAttribLocation(program, 'a_Color');
    // 创建颜色缓冲区
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColorData, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aColorLocation);
    gl.vertexAttribPointer(aColorLocation, 4, gl.FLOAT, false, 0, 0);
  }

  // 渲染
  render(){
    let {gl, program, projectionMatrix, camera} = this

    // 启用program
    this.gl.useProgram(this.program);

    // 绑定透视投影,视图,模型矩阵
    const uProjectionMatrixLocation = gl.getUniformLocation(program, 'u_ProjectionMatrix');
    const uViewMatrixLocation = gl.getUniformLocation(program, 'u_ViewMatrix');
    const uModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');

    gl.uniformMatrix4fv(uProjectionMatrixLocation, false, projectionMatrix);
    gl.uniformMatrix4fv(uViewMatrixLocation, false, camera.viewMatrix);
    gl.uniformMatrix4fv(uModelMatrix, false, this.modelMatrix);
    // 渲染
    this.gl.drawArrays(this.gl.POINTS, 0, this.vertexData.length/3);
  }

  generateRegularIcosahedronGraph(radius: number = 1) {
    // Define the geometry
    const vertices: number[] = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    const a = 1 / Math.sqrt(1 + phi * phi);
    const b = a * phi;
  
    const icosahedronVertices = [
      [0, a, -b], [a, b, 0], [-a, b, 0],
      [0, a, b], [0, -a, -b], [-a, -b, 0],
      [0, -a, b], [a, -b, 0], [b, 0, -a],
      [b, 0, a], [-b, 0, -a], [-b, 0, a],
    ];
  
    for (const vertex of icosahedronVertices) {
      const scaledVertex = vertex.map(coord => coord * radius);
      vertices.push(...scaledVertex);
    }
    return vertices
  }
}


{

  


}



export class name{

  // 可用的名称key
  keys:string
  // 指针
  pointer: number = 0
  // 宽度
  breadth: number = 0


  // 当前已使用的名称
  map: Map<string, name|null> = new Map() 

  constructor(keys: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRST'){
    this.keys = keys
  }

  createName(){
    
    const now = 

    // 先判断当层是否已经满了，如果没有就在当前层查找空位
    if(!this.isFull()){
      const key = this.getPointerKey()
    }


    // 如果当前层满了就，去往下一层

  }

  


  next(){
    return this.keys[this.pointer++]
  }

  has(key: string){
    return this.map.has(key)
  }

  get(key: string){
    return this.map.get(key)
  }

  get key(){
    return this.keys[this.pointer]
  }

  get value(){
    const key = this.key
    return this.map.get(key)
  }

  // 当前名称是否已经满了
  isFull(){
    return this.map.size === this.keys.length
  }
}