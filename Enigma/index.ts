// 可用字符
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
// 获取当前字符在数组中的位置
function getCharIndex(char: string): number {
  return alphabet.indexOf(char);
}
// 输出一个打乱打字符
function getCharByIndex(): string {
  const r = alphabet.split("");
  // 随机打乱这个数组
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }

  return r.join("");
}


class rotors{
  // 当前位置
  pointer: number;
  // 当前的编码盘
  rotor: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"


  constructor(initPointer: number){
    this.pointer =  initPointer%alphabet.length;
  }

  // 触发

}



function enigmaMachine(): number {
    

  return (1)
}