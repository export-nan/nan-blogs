#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

in vec2 vTexCoord;
out vec4 fragColor;
/*
    "Singularity" by @XorDev

    A whirling blackhole.
    Feel free to code golf!
    
    FabriceNeyret2: -19
    dean_the_coder: -12
    iq: -4
*/
void mainImage(out vec4 O, vec2 F) {
  float i = .2, a;
  vec2 r = iResolution.xy;
  vec2 p = (F+F - r) / r.y / .7;
  vec2 d = vec2(-1,1);
  
  // 两个黑洞绕共同质心旋转
  vec2 bh1 = vec2(0.0, 0.0);
  vec2 bh2 = iMouse.xy;
  
  // 动态计算引力叠加
  vec2 offset = vec2(0);
  // 第一个黑洞的引力
  vec2 toBH1 = p - bh1;
  float dist1 = max(length(toBH1), 0.5);
  offset += toBH1 * (0.1 / (dist1*dist1 + 0.01));
  // 第二个黑洞的引力
  vec2 toBH2 = p - bh2;
  float dist2 = max(length(toBH2), 0.001);
  offset += toBH2 * (0.05 / (dist2*dist2 + 0.01));
  
  // 应用两个黑洞的共同偏移
  vec2 p_perturbed = p + offset;
  
  // 后续计算使用被扰动后的坐标
  vec2 b = p_perturbed - i*d;
  vec2 c = p_perturbed * mat2(1, 1, d/(.1 + i/dot(b,b)));
  vec2 v = c * mat2(cos(.5*log(a=dot(c,c)) + iTime*i + vec4(0,33,11,0)))/i;
  vec2 w;
  
  for(; i++<9.; w += 1.+sin(v))
      v += .7* sin(v.yx*i+iTime) / i + .5;
  i = length( sin(v/.3)*.4 + c*(3.+d) );
  
  // 注意：将最后的length(p)改为length(p_perturbed)
  O = 1. - exp( -exp( c.x * sin(iTime/4.0) * vec4(.6,-.4,-1,0) )
                / w.xyyx
                / ( 2. + i*i/4. - i )
                / ( .5 + 1. / a )
                / ( .03 + abs( length(p_perturbed)-.7 ) )
            );
}
