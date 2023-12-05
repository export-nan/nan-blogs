import {mat4, mat3, vec3, vec4, glMatrix} from "gl-matrix"

// 视图矩阵
export function viewMatrix4f(){
  // 创建一个4x4单位矩阵
  const viewMatrix = mat4.create();

  // 设置相机位置和朝向
  const cameraPosition = vec3.fromValues(0, 0, 0); // 相机位置
  const targetPosition = vec3.fromValues(0, 0, 1); // 观察目标位置
  const upVector = vec3.fromValues(0, 1, 0); // 相机的上向量

  // 计算视图矩阵
  mat4.lookAt(viewMatrix, cameraPosition, targetPosition, upVector);

  return viewMatrix
}

// 单位矩阵
export function identityMatrix(){
  const modelViewMatrix = mat4.create();
  mat4.identity(modelViewMatrix);
  return modelViewMatrix
}

// 正交矩阵
export function orthographicMatrix(near: number, far: number){
  const projectionMatrix = mat4.create();
  mat4.ortho(projectionMatrix, -1, 1, -1, 1, near, far);
  return projectionMatrix
}

// 透视矩阵
export function perspectiveMatrix(fov: number, aspect: number,near: number, far: number){
  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix, glMatrix.toRadian(fov), aspect, near, far);
  return projectionMatrix
}

// 旋转矩阵 使用罗德里德公式进行
// axis 旋转轴向量, angle: 旋转的角度
export function rotationMatrix(axis: vec3, angle: number){
  const rotation = mat4.create();

  const r = glMatrix.toRadian(angle)
  const sinTheta = Math.sin(angle);
  const cosTheta = Math.cos(angle);

  // 第一部分
  // cos(α)I I为单位矩阵
  const cosI = (()=>{
    const identity = mat3.create()
    mat3.identity(identity)
    return mat3.multiplyScalar(mat3.create(), identity, cosTheta)
  })()
  
  // 第二部分
  // (1−cos(α))nN n为axis N为axis的转置
  const _cosN = (()=>{
    const cosn = vec3.scale(vec3.create(), axis, 1 - cosTheta)
    return mat3.fromValues(
      cosn[0] * axis[0], cosn[0] * axis[1], cosn[0] * axis[2],
      cosn[1] * axis[0], cosn[1] * axis[1], cosn[1] * axis[2],
      cosn[2] * axis[0], cosn[2] * axis[1], cosn[2] * axis[2]
    );
  })()

  // 第三部分
  // sin(α)K
  const sinK = (()=>{
    const ant = mat3.fromValues(
      0, -axis[2], axis[1],
      axis[2], 0, -axis[0],
      -axis[1], axis[0], 0
    )
    return mat3.multiplyScalar(mat3.create(), ant, sinTheta)

  })()

  // R(ax,an) = cos(r)I + (1−cos(α))nN + sin(α)K
  const R = mat3.add(mat3.create(), mat3.add(mat3.create(), cosI, _cosN), sinK);

  return mat4.fromValues(
    R[0],R[1],R[2],0,
    R[3],R[4],R[5],0,
    R[6],R[7],R[8],0,
    0,0,0,1
  )
} 

// 将 十六进制颜色代码转换为 0 到 1 范围内的 RGBA 值
export function hexToRgb(hex) {
  // 去除可能的 # 符号
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }

  // 切分 RGB 值
  const r = parseInt(hex.substring(0, 2), 16) / 255 ;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const a = parseInt(hex.substring(6, 8), 16) / 255;

  return [r || 0, g || 0, b || 0, isNaN(a)?1:a];
}


// 输出一个十二面体的十二个顶点
export function  generateRegularIcosahedronGraph(radius: number = 1) {
  // Define the geometry
  const vertices: number[] = [];
  const phi = (1 + Math.sqrt(5)) / 2;
  const a = 1 / Math.sqrt(1 + phi * phi);
  const b = a * phi;

  const icosahedronVertices = [
    [0, a, -b],
    [a, b, 0],
    [-a, b, 0],
    [0, a, b],
    [0, -a, -b],
    [-a, -b, 0],
    [0, -a, b],
    [a, -b, 0],
    [b, 0, -a],
    [b, 0, a],
    [-b, 0, -a],
    [-b, 0, a],
  ];

  for (const vertex of icosahedronVertices) {
    const scaledVertex = vertex.map(coord => coord * radius);
    vertices.push(...scaledVertex);
  }
  return vertices
}



