// "use client";

// import { useRef, useMemo } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { ShaderMaterial, Vector2 } from "three";
// import { OrbitControls } from "@react-three/drei";

// const LightningRing = () => {
//   const meshRef = useRef(null);
//   const materialRef = useRef(null);

//   const uniforms = useMemo(
//     () => ({
//       uTime: { value: 0 },
//       uColor1: { value: new Vector2(0.1, 0.3) },
//       uColor2: { value: new Vector2(0.9, 1.0) },
//     }),
//     []
//   );

//   useFrame((state) => {
//     const { clock } = state;
//     if (materialRef.current) {
//       materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
//     }
//     if (meshRef.current) {
//       meshRef.current.rotation.z += 0.005;
//     }
//   });

//   const vertexShader = `
//     varying vec2 vUv;
//     void main() {
//       vUv = uv;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
//   `;

//   const fragmentShader = `
//     uniform float uTime;
//     uniform vec2 uColor1;
//     uniform vec2 uColor2;
//     varying vec2 vUv;

//     // Simplex 2D noise
//     vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

//     float snoise(vec2 v) {
//       const vec4 C = vec4(0.211324865405187, 0.366025403784439,
//                 -0.577350269189626, 0.024390243902439);
//       vec2 i  = floor(v + dot(v, C.yy) );
//       vec2 x0 = v -   i + dot(i, C.xx);
//       vec2 i1;
//       i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
//       vec4 x12 = x0.xyxy + C.xxzz;
//       x12.xy -= i1;
//       i = mod(i, 289.0);
//       vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
//         + i.x + vec3(0.0, i1.x, 1.0 ));
//       vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
//         dot(x12.zw,x12.zw)), 0.0);
//       m = m*m ;
//       m = m*m ;
//       vec3 x = 2.0 * fract(p * C.www) - 1.0;
//       vec3 h = abs(x) - 0.5;
//       vec3 ox = floor(x + 0.5);
//       vec3 a0 = x - ox;
//       m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
//       vec3 g;
//       g.x  = a0.x  * x0.x  + h.x  * x0.y;
//       g.yz = a0.yz * x12.xz + h.yz * x12.yw;
//       return 130.0 * dot(m, g);
//     }

//     void main() {
//       float noise = snoise(vec2(vUv.x * 10.0 + uTime, vUv.y * 10.0));
//       float ring = smoothstep(0.5, 0.51, distance(vUv, vec2(0.5)));
//       ring *= smoothstep(0.51, 0.5, distance(vUv, vec2(0.5)));
      
//       float lightning = smoothstep(0.1, 0.0, abs(noise - ring));
      
//       vec3 color1 = vec3(uColor1.x, uColor1.y, 1.0);
//       vec3 color2 = vec3(uColor2.x, uColor2.y, 1.0);
//       vec3 finalColor = mix(color1, color2, lightning);
      
//       gl_FragColor = vec4(finalColor, 1.0);
//     }
//   `;

//   return (
//     <mesh ref={meshRef}>
//       <ringGeometry args={[0.7, 1, 128]} />
//       <shaderMaterial
//         ref={materialRef}
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//         uniforms={uniforms}
//         transparent
//       />
//     </mesh>
//   );
// };

// export default function ThunderLoadingAnimation() {
//   return (
//     <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
//       <div className="w-64 h-64">
//         <Canvas>
//           <OrbitControls enableZoom={false} enablePan={false} />
//           <LightningRing />
//         </Canvas>
//       </div>
//     </div>
//   );
// }
