// 用于生成随机数
// number 点的数量
// container 用来存放点的容器
// offset 当前生成量在点上的偏移


self.onmessage = function(event) {
  // 接收主线程发送的数据
  const data = event.data;
  const {number, callback} = data
  let vertexData = new Float32Array(number*3*3)
  for(let i=0; i<number; i++){
    const t = callback()
    vertexData.set(t.flat() as ArrayLike<number>, i*3*3)
  }
  self.postMessage(vertexData)
};
