import { Camera } from "./Camera";
import { ShaderBase } from "./Shader.base";


// 着色器引擎，用于更新/绘制 Shader Program 
export class ShaderDrag{

  // Canvas DOM
  public readonly element: HTMLCanvasElement
  // Canvas Context 
  public readonly gl: WebGLRenderingContext

  // 相机
  public readonly camera: Camera

  // 帧率
  public FPS: number = 0

  public shaderBucket: ShaderBase[] = [] 
  public nexTickBucket: (()=>void)[] = []
  constructor(element: HTMLCanvasElement){
    this.element = element
    this.gl = element.getContext('webgl') as WebGLRenderingContext
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA,  this.gl.ONE_MINUS_SRC_ALPHA);
    this.camera = new Camera();

    // 渲染
    (()=>{
      let frameCount = 0;
      let startTime = performance.now();
  
      const render = () => {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
  
        if (elapsedTime >= 1000) {
          const fps = frameCount / (elapsedTime / 1000);
          this.FPS = fps
          // 重置计数器和开始时间
          frameCount = 0;
          startTime = currentTime;
        }
        frameCount++;
        // 在这里执行每帧的操作
  
        this.draw()
        requestAnimationFrame(render);
      }
      render()
    })()
  }

  
  // 挂载shader
  public use(Shader: new (element: HTMLCanvasElement,gl: WebGLRenderingContext, camera: Camera)=>ShaderBase){
    const shader = new Shader(this.element,this.gl, this.camera)
    shader.init()
    shader.createData()
    this.shaderBucket.push(shader)
    return this
  }

  // 绘制shader
  public draw(){
    let {shaderBucket} = this
    shaderBucket.forEach((shader)=>{
      this.nexTickBucket.forEach(callback=>{
        callback()
      })
      shader.bindAttrib()
      shader.useProgram()
      shader.render()
    })
    return
  }
  
  // nexTick
  nexTick(callback: ()=> void){
    this.nexTickBucket.push(callback)
  }
}