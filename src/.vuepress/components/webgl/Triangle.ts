import {vec3} from 'gl-matrix'


export interface ITriangleVertex {
  0: vec3,
  1: vec3,
  2: vec3
}

export class Triangle{

  // 三角形的三个顶点
  public vertex: ITriangleVertex = [
    vec3.create(),
    vec3.create(),
    vec3.create(),
  ]

  // 设置顶点的数据
  public setIVertex(index: 0|1|2, ver: vec3){
    this.vertex[index] = ver
  }
}