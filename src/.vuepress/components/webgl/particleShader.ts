import { ShaderBase } from "./Shader.base"
import {glMatrix, vec4, vec3, mat4} from 'gl-matrix'
import { perspectiveMatrix, viewMatrix4f } from "./utils"
import { Camera } from "./Camera"

export type ITriangleVertex = [vec3,vec3,vec3]


// class Sphere{
//   // 顶点坐标数组 3个为一组xyz
//   vertices: number[] = [];
//   // 顶点坐标数组 3个为一组xyz
//   normals: number[] = [];
//   // 纹理坐标数组 2个为一组uv
//   textureCoords: number[] = [];
//   // 三角形的三个顶点在vertices上的顺序 3个为一组
//   indices: number[] = [];

//   constructor(latitudeBands: number){
//     const {vertices, normals, textureCoords, indices} = this

    
//     // for(let lat =  0, longitudeBands = 1; lat <= latitudeBands; lat++){
//     //   // 计算y值
//     //   const y =  2 / latitudeBands  * (lat+1) - 1;


//     //   if(longitudeBands===1){
//     //     vertices.push(0, y, 0)
//     //   }


//     //   console.log('sss',y)
//     //   longitudeBands = y>0? lat*5 : (latitudeBands-lat)*5

//     //   // 求出当下维度下切面的半径
//     //   const absY = Math.abs(y)
//     //   if(absY === 1) continue
//     //   const radius = Math.sqrt(absY * absY - 1);  //范围 1 ～ -1

//     //   // 求出当前维度下的顶点密度
//     //   for(let long = 0; long <= longitudeBands; long++){
//     //     const angle = (long / longitudeBands) * 2 * Math.PI;
//     //     const x = radius * Math.cos(angle);
//     //     const z = radius * Math.sin(angle);
//     //     vertices.push(x, y, z);
//     //   }
//     // }
//   }
// }

// 球体顶点算法
// function createSphere(radius: number, latitudeBands: number, longitudeBands: number) {
//   // 顶点坐标数组 3个为一组xyz
//   const vertices:number[] = [];
//   // 顶点坐标数组 3个为一组xyz
//   const normals:number[] = [];
//   // 纹理坐标数组 2个为一组uv
//   const textureCoords: number[] = [];
//   // 三角形的三个顶点在vertices上的顺序 3个为一组
//   const indices: number[] = [];

//   for (let lat =  0; lat <= latitudeBands; lat++) {
//     const theta = (lat * Math.PI) / latitudeBands;
//     const sinTheta = Math.sin(theta);
//     const cosTheta = Math.cos(theta);

//     for (let long = 0; long <= longitudeBands; long++) {
//       const phi = (long * 2 * Math.PI) / longitudeBands;
//       const sinPhi = Math.sin(phi);
//       const cosPhi = Math.cos(phi);

//       const x = cosPhi * sinTheta;
//       const y = cosTheta;
//       const z = sinPhi * sinTheta;
//       const u = 1 - (long / longitudeBands);
//       const v = 1 - (lat / latitudeBands);

//       vertices.push(radius * x, radius * y, radius * z);
//       normals.push(x, y, z);
//       textureCoords.push(u, v);
//     }
//   }

//   for (let lat = 0; lat < latitudeBands; lat++) {
//     for (let long = 0; long < longitudeBands; long++) {
//       const first = lat * (longitudeBands + 1) + long;
//       const second = first + longitudeBands + 1;

//       indices.push(first, second, first + 1);
//       indices.push(second, second + 1, first + 1);
//     }
//   }

//   return { vertices, normals, textureCoords, indices };
// }


export class ParticleShader extends ShaderBase{

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
    this.position[2] = 20
  }

  createData(){
    const vertexData:number[] = []
    const vertexColorData:number[] = []

    // 三角形粒子效果顶点
    for(let i=0; i<this.density; i++){
      const t = this.createBasicTeminor()      
      vertexData.push(...(t.flat() as number[]))
      t.forEach((v,k)=>{
        const c = [Math.random(), Math.random(), Math.random(), Math.random()*(1-0.5)+0.5]
        vertexColorData.push(...(c as number[]))
      })
    }

    // 球体顶点

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

    const rad = glMatrix.toRadian((performance.now()-this.createTime)*0.01)

    // 启用program
    this.gl.useProgram(this.program);

    // 绑定透视投影,视图,模型矩阵
    const uProjectionMatrixLocation = gl.getUniformLocation(program, 'u_ProjectionMatrix');
    const uViewMatrixLocation = gl.getUniformLocation(program, 'u_ViewMatrix');
    const uModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');

    gl.uniformMatrix4fv(uProjectionMatrixLocation, false, projectionMatrix);
    gl.uniformMatrix4fv(uViewMatrixLocation, false, camera.viewMatrix);
    gl.uniformMatrix4fv(uModelMatrix, false, this.modelMatrix);

    this.position[2] -= 0.04

    // 渲染
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.density*3);
  }

  // 构建元三角
  createBasicTeminor():ITriangleVertex{

    // 定义一个正三角形
    const d = 0.2
    const pointA = vec4.fromValues(0.5 * d, Math.sqrt(3) / 6 * d, 0, 0);
    const pointB = vec4.fromValues(-0.5 * d, Math.sqrt(3) / 6 * d, 0, 0);
    const pointC = vec4.fromValues(0 * d, -Math.sqrt(3) / 3 * d, 0, 0);

    // 绕随机轴旋转
    let angle  = glMatrix.toRadian(Math.random()*(360 - 0) + 0);   // 旋转角度（弧度)
    let axis = vec3.fromValues(
      this.randomPN*(Math.random()*(1 - 0) + 0),
      this.randomPN*(Math.random()*(1 - 0) + 0),
      this.randomPN*(Math.random()*(1 - 0) + 0)
    )
    
    let rotationMatrix = mat4.fromRotation(mat4.create(),this.randomPN*angle, axis)

    vec4.transformMat4(pointA, pointA, rotationMatrix)
    vec4.transformMat4(pointB, pointB, rotationMatrix);
    vec4.transformMat4(pointC, pointC, rotationMatrix);

    // 计算法向量
    const vectorAB = vec4.subtract(vec4.create(), pointB, pointA);
    vec4.normalize(vectorAB,vectorAB)
    const vectorAC = vec4.subtract(vec4.create(), pointC, pointA);
    vec4.normalize(vectorAC,vectorAC)
    const normalVector = vec3.cross(vec3.create(), [vectorAC[0], vectorAC[1], vectorAC[2]], [vectorAB[0], vectorAB[1], vectorAB[2]]);    
    // 沿着法向量的方向位移0.1～1个长度
    const direction = vec4.normalize(vec4.create(), [normalVector[0], normalVector[1], normalVector[2],1]);
    vec4.scale(direction,direction, this.randomPN)

    const moveVector = vec4.scale(vec4.create(),direction, Math.random()*(10 - 8) + 8)
      
    // 将三角形整体位移
    vec4.add(pointA, pointA, moveVector);
    vec4.add(pointB, pointB, moveVector);
    vec4.add(pointC, pointC, moveVector);

    return [
      [pointA[0],pointA[1],pointA[2]],
      [pointB[0],pointB[1],pointB[2]],
      [pointC[0],pointC[1],pointC[2]]
    ]
  }

  // 返回随机正负
  get randomPN(){
    return Math.random() < 0.5 ? -1 : 1
  }
}
