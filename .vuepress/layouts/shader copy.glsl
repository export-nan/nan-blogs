#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform float fv;

in vec2 vTexCoord;
out vec4 fragColor;

const bool DEBUG_NOISE_POSITION = false;

float hash21(vec2 p)
{
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

float valueNoise(vec2 p)
{
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float starCell(vec2 p)
{
    vec2 i = floor(p);
    vec2 f = fract(p) - .5;
    float seed = hash21(i);
    vec2 star = vec2(hash21(i + 19.17), hash21(i + 73.41)) - .5;
    float glow = smoothstep(.085, .0, length(f - star));

    return glow * step(.982, seed);
}

float starTrailField(vec2 p, vec2 pullDir, float corePull)
{
    float stretch = 1.0 + corePull * 1.4;
    float trail = starCell(p);

    trail += .78 * starCell(p - pullDir * (2.2 * stretch));
    trail += .56 * starCell(p - pullDir * (4.4 * stretch));
    trail += .34 * starCell(p - pullDir * (6.8 * stretch));
    trail += .18 * starCell(p - pullDir * (9.6 * stretch));

    return trail;
}

void mainImage(out vec4 O, vec2 F)
{
    //Iterator and attenuation (distance-squared)
    float i = .2, a;
    //Resolution for scaling and centering
    vec2 r = iResolution.xy,
         //Centered ratio-corrected coordinates
         p = ( F+F - r ) / r.y / .7,
         //Diagonal vector for skewing
         d = vec2(-1,1),
         //Blackhole center
         b = p - i*d,
         //Rotate and apply perspective
         c = p * mat2(1, 1, d/(.01 + i/dot(b,b))),
         //Rotate into spiraling coordinates
         v = c * mat2(cos(.5*log(a=dot(c,c)) + iTime*i + vec4(0,33,11,0)))/i,
         //Waves cumulative total for coloring
         w = vec2(0);
    vec2 blackholeCoord = v;

    //Loop through waves
    for(; i++<9.; w += 1.+sin(v) )
        //Distort coordinates
        v += .7* sin(v.yx*i+iTime) / i + .5;
    //Acretion disk radius
    i = length( sin(v/.3)*.4 + c*(3.+d) );
    //Noise becomes denser as it falls toward the black hole.
    float corePull = 1.0 - smoothstep(.08, 1.15, length(p));
    float globalNoise = .48 + corePull * .52;
    float noiseScale = mix(20.0, 120.0, corePull);
    vec2 noiseCoord = blackholeCoord * noiseScale + c * (14.0 + corePull * 22.0);
    noiseCoord += vec2(iTime * .65, -iTime * .37);
    float rawDust = valueNoise(noiseCoord);
    rawDust += .75 * valueNoise(noiseCoord * 2.1 + iTime);
    rawDust += .35 * valueNoise(noiseCoord * 4.3 - iTime * .7);
    rawDust /= 2.1;
    float dust = smoothstep(.36, .88, rawDust) * globalNoise;
    vec2 flowDir = normalize(vec2(-c.y, c.x) + vec2(.001));
    vec2 pullDir = normalize(-p + vec2(.001));
    vec2 shearStep = flowDir * (1.2 + corePull * 3.0);
    float flowNoise = valueNoise(noiseCoord + flowDir * iTime * (2.0 + corePull * 7.0));
    float shear = abs(valueNoise(noiseCoord + shearStep) - valueNoise(noiseCoord - shearStep));

    if (DEBUG_NOISE_POSITION) {
        vec2 gridUv = fract(noiseCoord);
        float edgeDistance = min(min(gridUv.x, 1.0 - gridUv.x), min(gridUv.y, 1.0 - gridUv.y));
        float noiseGrid = 1.0 - smoothstep(.0, .055, edgeDistance);
        float noiseSpot = smoothstep(.45, .86, rawDust);
        vec3 noiseView = mix(vec3(.015, .02, .04), vec3(.07, .16, .28), rawDust * globalNoise);

        noiseView += vec3(.08, .38, 1.0) * noiseGrid * (.55 + corePull * .65);
        noiseView += vec3(1.0, .58, .14) * noiseSpot * (.7 + corePull * 1.2);

        O = vec4(noiseView, 1.0);
        return;
    }

    //Red/blue gradient
    O = 1. - exp( -exp( c.x * sin(iTime/4.0) * vec4(.6,-.4,-1,0) )
                   //Wave coloring
                   /  w.xyyx
                   //Acretion disk brightness
                   / ( 2. + i*i/4. - i )
                   //Center darkness
                   / ( .5 + 1. / a )
                   //Rim highlight
                   / ( .03 + abs( length(p)-.7 ) )
             );
    float diskLight = smoothstep(.08, .7, length(O.rgb));
    float diskBand = smoothstep(.02, .42, clamp(1.0 / (2. + i*i/4. - i), 0.0, 1.0));
    float brightDiskMask = diskLight * diskBand;
    float friction = smoothstep(.18, .78, shear + abs(flowNoise - dust) * .75);
    friction *= dust * brightDiskMask * (1.0 + corePull * .85);

    vec2 starCoord = noiseCoord * .65 + pullDir * iTime * (4.0 + corePull * 10.0);
    float starTrail = starTrailField(starCoord, pullDir, corePull);
    starTrail *= friction * (1.0 + corePull * 1.8);

    vec3 dustColor = mix(vec3(.18, .35, .8), vec3(1.0, .48, .18), corePull);
    vec3 sparkColor = mix(vec3(.5, .8, 1.0), vec3(1.0, .72, .28), corePull);
    O.rgb += dust * dustColor * brightDiskMask * (.55 + friction * .85);
    O.rgb += sparkColor * brightDiskMask * (friction * 1.05 + starTrail * 3.0);
    O.a = 1.0;
}
