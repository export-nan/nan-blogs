import { mat4, vec3} from "gl-matrix"

export class Camera{
  cameraPosition = vec3.fromValues(0, 0, 0); // 相机位置
  targetPosition = vec3.fromValues(0, 0, 1); // 观察目标位置
  upVector = vec3.fromValues(0, 1, 0); // 相机的上向量

  // 相机矩阵
  get viewMatrix(){
    const { cameraPosition, targetPosition,upVector} = this
    return mat4.lookAt(mat4.create(), cameraPosition, targetPosition, upVector);
  }
 
   // 旋转相机
  translate(axis: vec3, angle: number){    
  let rotationMatrix = mat4.fromRotation(mat4.create(), angle, axis)
    vec3.transformMat4(this.targetPosition, this.targetPosition, rotationMatrix)
    vec3.transformMat4(this.upVector, this.upVector, rotationMatrix)
  }
} 