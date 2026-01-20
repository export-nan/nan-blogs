## Threejs 3d 地图加载器

```ts
// @ts-ignore
import * as THREE from 'three';
// @ts-ignore
import * as d3 from 'd3';
import type {Featuresjson, Mapjson, Coordinates, Coordinate} from './map_package/type';
import { geojsons } from './map_package/index';

const depth = 3 // 设置模型的厚度

let containerElement: HTMLElement;
let screenBox: HTMLElement;
const mouse = new THREE.Vector2();
const mouseRaycaster = new THREE.Raycaster();

// 事件点数组
let eventPoint: Record<string, EventPoint|undefined> = {}

// threejs 渲染器
export class ThreeMap {

    public renderer: THREE.WebGLRenderer;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public height: number;
    public width: number;

    constructor(element: HTMLElement){
        containerElement = element;
        const {width, height} = element.getBoundingClientRect();
        this.height = height;
        this.width = width;

        // 创建webGL渲染器
        this.renderer = new THREE.WebGLRenderer( { antialias: true,alpha: true} );
        this.renderer.shadowMap.enabled = true; // 开启阴影
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.25;   
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setSize(width, height);
    
        // 场景
        this.scene = new THREE.Scene();

        // 相机 透视相机
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
        this.camera.position.set(0, -40, 150);
        this.camera.lookAt(0, 0, 0);

        // 将渲染器注入到容器里
        containerElement.appendChild(this.renderer.domElement);
        containerElement.addEventListener('mousemove',(event) => Object.bind(this, this.onMouseMove(event)));
        containerElement.addEventListener('click',(event) => Object.bind(this, this.onMouseClick(event)));
        this.resizeObserver.observe(containerElement)

        // 添加一个屏幕空间UI盒子 用来放置一些UI元素
        screenBox = document.createElement('div')
        screenBox.style.position = 'absolute'
        screenBox.className = 'screen-space-ui'
        containerElement.appendChild(screenBox)
    }

    // 切换地图模型
    public switchMap(mapName: string){
        // 移除上一个地图对象
        const current = this.mapModleRecord[this.currentMapName]
        if(current!==undefined) {
            current.destroy()
        }

        if(geojsons[mapName]===undefined) {
            console.error('地图不存在')
            return
        }
        this.createMapModle(geojsons[mapName])
        Object.values(eventPoint).forEach(item=>{
            if(item!==undefined) item.remove()
        })
        eventPoint = {}
    }

    // 创建地图模型
    private mapModleRecord: Record<string, CreateMap> = {};
    private currentMapName: string = '';
    private createMapModle(mapJson: Mapjson){
        let MapModle = this.mapModleRecord[mapJson.name]
        if(MapModle===undefined){
            MapModle = new CreateMap(mapJson)
            this.mapModleRecord[mapJson.name] = MapModle
        }else{
            MapModle.rebuild()
        }
        this.currentMapName = mapJson.name
        this.scene.add(MapModle.Object3D as THREE.Object3D)
    }

    // 获取一个区块的中心点坐标
    private getFeatureCentroid(featureName: string){
        return this.mapModleRecord[this.currentMapName].getFeatureCentroid(featureName)
    }

    // 事件点
    setEventPoint(data: {name: string, value: number}[], template?: (name: string, value: number)=>string){
        const newEventPoint:Record<string, EventPoint|undefined> = {}
        data.forEach(item=>{
            const defaultTemplate = (name: string, value: number) =>{
                return `
                    <div class='point'></div>
                    <div class='text'>
                        <span class='name'>${name}</span>
                        <span class='value'>${value}</span>
                    </div>
                `
            }
            const ponit = this.updateEventPoint(item.name, item.value, template||defaultTemplate)
            newEventPoint[item.name] = ponit
            eventPoint[item.name] = undefined
        })
        Object.values(eventPoint).forEach(item=>{
            if(item===undefined) return
            item.remove()
        })
        eventPoint = newEventPoint
    }
    // 更新事件点
    public updateEventPoint(featureName: string, value: number, template: (name: string, value: number)=>string){
        let dom = eventPoint[featureName]
        const featureCenter = this.getFeatureCentroid(featureName)
        if(featureCenter===undefined)return undefined
        const [x, y, z] = featureCenter
        const sp = this.toScreenPosition(new THREE.Vector3(x, -y, z))
        if(dom!==undefined){
            dom.value = value
            dom.x = sp.x
            dom.y = sp.y
        }else{
            dom = new EventPoint(sp.x, sp.y, featureName, value, template)
        }
        return dom
    }
    // 获取所有事件点
    public getAllEventPoint(): EventPoint[]{
        return Object.values(eventPoint).filter(item=>item!==undefined) as EventPoint[]
    }

    // 渲染场景
    async render(){
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(()=>this.render())
    }

    // 防抖
    private debounce?: number
    private intersectMap: boolean = false
    private onMouseMove(event: any) {
        const currentMap = this.mapModleRecord[this.currentMapName]
        // 将鼠标位置转换为归一化设备坐标 (-1 到 +1)
        const rect = containerElement.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        mouse.x = (mouseX / rect.width) * 2 - 1;
        mouse.y = -(mouseY / rect.height) * 2 + 1;
    
        // 更新射线
        mouseRaycaster.setFromCamera(mouse, this.camera);

        const intersectFeatures:CreateFeature[] = []
        const activeFeatures:CreateFeature[] = []
        if(currentMap===undefined)return
        const features = Object.values(currentMap.features)
        
        const intersectMap = mouseRaycaster.intersectObject(currentMap.Object3D as THREE.Object3D)
        if(intersectMap.length===0){
            if(this.intersectMap){
                features.filter(item=>item.isActive).forEach(feature=>{
                    feature.isActive = false
                })
            }
            this.intersectMap = false
            this.emitMoveMouseEvent(null)
            return
        }
        this.intersectMap = true
        
        features.forEach((feature)=>{
            if(feature.isActive){
                activeFeatures.push(feature)
            }
            if(feature.Object3D===null)return 
            const inter = mouseRaycaster.intersectObject(feature.Object3D)
            if(inter.length>0){
                intersectFeatures.push(feature)
            }
        })

        if(this.debounce!==undefined){
            clearTimeout(this.debounce)
            this.debounce = undefined
        }
        this.debounce = setTimeout(()=>{
            if(intersectFeatures.length>0){
                activeFeatures.filter(item=>item.name!==intersectFeatures[0].name).forEach(feature=>{
                    feature.isActive = false
                })
                const feature = intersectFeatures[0]
                feature.isActive = true
                this.emitMoveMouseEvent(feature)
                
            }
            clearTimeout(this.debounce)
            this.debounce = undefined
        }) as number
    }

    // 监听鼠标点击事件
    private onMouseClick(event: any) {
        const currentMap = this.mapModleRecord[this.currentMapName]

        const features = Object.values(currentMap.features)
        const intersectFeatures:CreateFeature[] = []

        features.forEach((feature)=>{
            if(feature.Object3D===null)return 
            const inter = mouseRaycaster.intersectObject(feature.Object3D)
            if(inter.length>0){
                intersectFeatures.push(feature)
            }
        })

        if(intersectFeatures.length>0){
            this.emitClickMouseEvent(intersectFeatures[0])
        }
    }

    // 监听鼠标移动事件
    private moveMouseEventList:Map<(feature: CreateFeature|null)=>void, {that: Object}> = new Map()
    public onMoveMouseEvent(callback: (feature: CreateFeature|null)=>void, that: Object = window){
        this.moveMouseEventList.set(callback,{that})
    }
    public removeMoveMouseEvent(callback: (feature: CreateFeature|null)=>void){
        this.moveMouseEventList.delete(callback)
    }
    private emitMoveMouseEvent(feature: CreateFeature|null){
        this.moveMouseEventList.forEach((item, callback)=>{
            callback.bind(item.that)(feature)
        })
    }
    // 监听鼠标点击事件
    private mouseClickEventList:Map<(feature: CreateFeature)=>void, {that: Object}> = new Map()
    public onClickMouseEvent(callback: (feature: CreateFeature)=>void, that: Object = window){
        this.mouseClickEventList.set(callback,{that})
    }
    public removeClickMouseEvent(callback: (feature: CreateFeature)=>void){
        this.mouseClickEventList.delete(callback)
    }
    private emitClickMouseEvent(feature: CreateFeature){
        this.mouseClickEventList.forEach((item, callback)=>{
            callback.bind(item.that)(feature)
        })
    }


    // 设置一个区块高亮状态
    setHighlightStatus(featureName: string, highlight: boolean = false) {
        const currentMap = this.mapModleRecord[this.currentMapName]
        if(currentMap===undefined)return
        currentMap.setHighlightStatus(featureName, highlight);
        
        const featureCentroid = currentMap.getFeatureCentroid(featureName);
        if(featureCentroid===undefined)return
        const [x, y, z] = featureCentroid

        const p = eventPoint[featureName]
        if(p === undefined)return
        const sp = this.toScreenPosition(new THREE.Vector3(x, -y, z));
        p.x = sp.x;
        p.y = sp.y;
    }

    // 清空其他区域的高亮
    clearHighlight() {
        const currentMap = this.mapModleRecord[this.currentMapName]
        if(currentMap===undefined)return
        Object.values(currentMap.features).forEach((feature) => {
            this.setHighlightStatus(feature.name)
        });
    }


    // 将 3D 坐标转换到屏幕空间坐标的函数
    toScreenPosition(vec3: THREE.Vector3) {
        // 将世界坐标投影到相机的裁剪空间
        vec3.project(this.camera);

        // 将裁剪空间坐标转换为屏幕空间坐标
        const rect = containerElement.getBoundingClientRect();

        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;

        return {
            x: (vec3.x * halfWidth) + halfWidth,
            y: -(vec3.y * halfHeight) + halfHeight
        };
    }

    resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const { width, height } = entry.contentRect;
            this.resize(width, height);
        }
    });

    // 更新地图的大小
    private resizeDebounce?: number
    resize(width: number, height: number) {
        if(this.resizeDebounce!==undefined){
            clearTimeout(this.resizeDebounce)
            this.resizeDebounce = undefined
        }
        this.resizeDebounce = setTimeout(()=>{
            if(width!==this.width||height!==this.height){
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(width, height);
                this.getAllEventPoint().forEach((eventPoint)=>{
                    const featureCenter = this.getFeatureCentroid(eventPoint.name)
                    if(featureCenter===undefined)return undefined
                    const [x, y] = featureCenter
                    const sp = this.toScreenPosition(new THREE.Vector3(x, -y, 2))
                    eventPoint.x = sp.x
                    eventPoint.y = sp.y
                })
            }
            clearTimeout(this.resizeDebounce)
            this.resizeDebounce = undefined
        }) as number
    }

    // 销毁整个地图
    destroy(){
        Object.values(this.mapModleRecord).forEach((map)=>{
            map.destroy()
        })
        Object.values(eventPoint).forEach((eventPoint)=>{
            eventPoint?.remove()
        })
    }
}

// 事件点虚拟dom
class EventPoint{
    dom: HTMLElement
    template:(name: string, value: number)=>string

    private _name: string = ''
    set name(value: string){
        this._name = value;
        this.dom.innerHTML = this.template(this.name, this.value)
    }
    get name(){
        return this._name
    }

    private _value: number = 0
    set value(value: number){
        this._value = value;
        this.dom.innerHTML = this.template(this.name, this.value)
    }
    get value(){
        return this._value
    }

    private _x: number = 0
    set x(value: number){
        this._x = value
        this.dom.style.left = `${value}px`
    }
    get x(){
        return this._x
    }

    private _y: number = 0
    set y(value: number){
        this._y = value
        this.dom.style.top = `${value}px`
    }
    get y(){
        return this._y
    }

    private _className: Record<string, boolean> = {}
    get className(){
        return Object.keys(this._className).filter((item)=>{
            return this._className[item]
        }).join(' ')
    }

    addClassNames(value: string){
        this._className[value] = true
        this.dom.className = this.className
    }

    removeClassNames(value: string){
        this._className[value] = false
        this.dom.className = this.className
    }


    constructor(x: number, y: number, name: string, value: number, template:(name: string, value: number)=>string){
        this.template = template
        this.dom = document.createElement('div')
        this.dom.style.position = 'absolute'
        this.dom.innerHTML = template(name, value)
        this.x = x
        this.y = y
        this.name = name
        this.value = value
        this.addClassNames('evnet-point')
        screenBox.appendChild(this.dom)
    }

    remove(){
        this.dom.remove()
    }
}



// 创建地图 模型
class CreateMap{
    Object3D: THREE.Object3D|null // 地图的3D对象
    
    readonly features: Record<string, CreateFeature> = {} // 区块

    private projection:d3.GeoProjection; // 墨卡托投影转换

    constructor(mapJson: Mapjson){
        this.Object3D = new THREE.Object3D()

        const bbox = mapJson.bbox;
        const offset = mapJson.offset;
        const rect = containerElement.getBoundingClientRect();

        this.projection = d3.geoMercator()
        .center(
            bbox===undefined?[104.0, 37.5]:
            [(bbox[0][0] + bbox[1][0]) / 2, (bbox[0][1] + bbox[1][1]) / 2]
        )
        .translate(offset===undefined? [0, 0] :[offset[0], offset[1]])
        if(bbox!==undefined){
            const bboxWidth = bbox[1][0] - bbox[0][0];
            const bboxHeight = bbox[0][1] - bbox[1][1];
            const scale = Math.min(rect.width / bboxWidth, rect.height / bboxHeight) * (mapJson.scale||6);
            this.projection = this.projection.scale(scale)
        }

        const {features} = mapJson;
        features.forEach((feature) => {
            const Feature = this.createFeature(feature)
            this.Object3D?.add(Feature.Object3D as THREE.Object3D);
        })
    }

    // 创建区块对象
    createFeature(feature: Featuresjson){
        const area  = new CreateFeature(feature, this.projection as (opt: [number, number])=> [number, number])
        this.features[feature.properties.name] = area
        return area
    }

    // 获取一个区块的质心
    getFeatureCentroid(name: string):[number, number, number]|undefined{
        const feature = this.features[name]
        if(!feature) return undefined
        const centroid = feature?.centroid
        const depth = feature.depth
        if (!centroid) return undefined
        const [x, y] = centroid
        return [x, y, depth] as [number, number, number]
    }

    // 设置一个区块高亮状态
    setHighlightStatus(featureName: string, highlight: boolean = false) {
        const feature = this.features[featureName];
        if (feature) {
            feature.isActive = highlight;
        }
    }

    // 销毁当前模型
    destroy(){
        Object.values(this.features).forEach((feature) => {
            feature.destroy()
        })
        this.Object3D?.parent?.remove(this.Object3D)
        this.Object3D === null
    }

    // 重新构建
    rebuild(){
        if(this.Object3D !== null){
            this.destroy()
        }
        this.Object3D = new THREE.Object3D()
        Object.values(this.features).forEach((feature) => {
            const FeatureObject3D = feature.rebuild();
            this.Object3D?.add(feature.Object3D as THREE.Object3D);
        })
    }
}


// 创建区块 模型
class CreateFeature{
    Object3D: THREE.Object3D|null // 区块的3D对象

    name: string // 区块的名称
    center?: [number, number] // 区块的中心点
    centroid?: [number, number] // 质心点

    is2d: boolean = false // 区块是否为2D
    shapes: THREE.Shape[] = [] // 平面图形
    geometrys: THREE.ExtrudeGeometry[] = [] // 立体模型
    mesh: THREE.Mesh[] = [] // 区块的网格模型
    
    private _isActive: boolean = false // 区块是否被选中
    // 区块是否被选中
    get isActive(){
        return this._isActive
    }
    set isActive(value: boolean){
        this._isActive = value
        this.setHighlight(value)
        this.scaleZ = value?2:1
        const eventpoint = eventPoint[this.name]
        if(eventpoint!==undefined){
            if(value){
                eventpoint.addClassNames('active')
            }else{
                eventpoint.removeClassNames('active')
            }
        }
    }

    _scaleZ: number = 1 // 区块的z轴拉伸
    get scaleZ(){
        return this._scaleZ
    }
    set scaleZ(value: number){
        this._scaleZ = value
        this.updateModelHeight(value)
    }
    get depth(){
        return depth * this.scaleZ
    }

    constructor(features: Featuresjson, projection:(opt:[number,number])=>[number,number], ){
        this.Object3D = new THREE.Object3D()

        this.name = features.properties.name
        this.is2d = features.properties.is2d || false

        if(features.properties.centroid){
            this.centroid = projection(features.properties.centroid)
        }

        if(features.properties.center){
            this.center = projection(features.properties.center)
        }

        this.generateShapes(features.geometry.coordinates, projection)
        this.generateMesh(this.depth)
    }

    // 生成区块的平面图
    generateShapes(coordinates: Coordinates, projection:(opt:[number,number])=>[number,number]){
        const innerThis = this

        // 用于递归coordinates数组
        function recursion(coordinates: Coordinates){
            coordinates.forEach((item) => {
                if(typeof (item[0] as Coordinates)[0] === 'number'){
                    buildMesh(item as Coordinate[])
                }else{
                    recursion(item as Coordinates)
                }
            })
        }

        // 用来构建模型
        function buildMesh(coordinates: Coordinate[]){
            const shape = new THREE.Shape();
            innerThis.shapes.push(shape);

            // 绘制平面图形
            for (let i = 0; i < coordinates.length; i++) {
                let [x, y] = projection(coordinates[i]);
                if (i === 0) {
                    shape.moveTo(x, -y);
                }
                shape.lineTo(x, -y);
            }
        }
        recursion(coordinates)
    }

    // 生成区块的冲压模型
    generateMesh(depth: number) {
       this.cleasMesh()

        const innerThis = this

        this.shapes.forEach((shape) => {
            const geometry = new THREE.ExtrudeGeometry(shape, {
                depth: innerThis.is2d? 0 : depth , // 模型的深度
                bevelEnabled: false, // 对挤出的形状应用是否斜角
                bevelSegments: 1, // 斜角的分段层数
                bevelThickness: 0.2 // 设置原始形状上斜角的厚度。
            })
            this.geometrys.push(geometry)
            // 创建网格对象
            const mesh = new THREE.Mesh(geometry, [
                innerThis.topMaterial,
                innerThis.verticalMaterial,
            ]);
            this.mesh.push(mesh)
            // 为模型添加描边
            // TODO 性能差，耗时太多，需要优化
            const edges =  new THREE.EdgesGeometry( geometry );
            const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
            mesh.add( line );

            innerThis.Object3D?.add(mesh)
        })
    }

    private topMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color( 0x62797a ) },
        },
        fragmentShader: `
            uniform vec3 color;
            void main() {
                gl_FragColor = vec4( color, 1.0 );
            }
        `
    })

    private verticalMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color( 0x62797a ) },
        },
        fragmentShader: `
            uniform vec3 color;
            void main() {
                gl_FragColor = vec4( color, 1.0 );
            }
        `
    })

    setHighlight(isHighlight: boolean){
        if(isHighlight){
            this.topMaterial.uniforms.color.value = new THREE.Color(0x36c793)
            this.verticalMaterial.uniforms.color.value = new THREE.Color(0x36c793)
        }else{
            this.topMaterial.uniforms.color.value = new THREE.Color(0x62797a)
            this.verticalMaterial.uniforms.color.value = new THREE.Color(0x62797a)
        }
    }

    // 跟新模型的高度
    updateModelHeight(newHeight: number) {
        this.mesh.forEach(mesh => {
            mesh.scale.z = newHeight
            mesh.updateMatrix()
        })
    }

    cleasMesh(){
        this.geometrys.forEach(geometry => {
            geometry.dispose()
        })
        this.geometrys = []

        this.mesh.forEach(mesh => {
            this.Object3D?.remove(mesh)
        })
        this.mesh = []
    }

    // 销毁当前区块
    destroy(){
        this.cleasMesh()
        this.Object3D?.parent?.remove(this.Object3D)
        this.Object3D = null
    }

    rebuild(){
        if(this.Object3D!==null){
            this.destroy()
        }
        this.Object3D = new THREE.Object3D()
        this.generateMesh(depth)
    }
}
```
