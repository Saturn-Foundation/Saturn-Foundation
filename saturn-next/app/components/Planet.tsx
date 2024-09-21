/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: NestaEric (https://sketchfab.com/Nestaeric)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/saturn-c09a1970148c43ad99db134a9d6d00b5
Title: Saturn
*/

// import React, { useRef } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { GroupProps, MeshProps } from '@react-three/fiber';

// interface ModelProps extends GroupProps {
//   userState?:string
// }

// export function Planet(props: ModelProps) {
//   const { nodes, materials } = useGLTF('/saturn.glb') as any; // Type assertion as any for now
//   return (
//     <group {...props} dispose={null}>
//       <group scale={0.00002}>
//         <group rotation={[-1.229, -0.324, 0.842]}>
//           <group position={[-0.094, 0.047, 0]}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Saturn2_B_saturn2_B_0.geometry}
//               material={materials.saturn2_B}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Saturn2_B_saturn2_A_0.geometry}
//               material={materials.saturn2_A}
//             />
//             {/* ... (other mesh components remain the same) ... */}
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Saturn2_B_saturn2_A_0_48.geometry}
//               material={materials.saturn2_A}
//             />
//           </group>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes['0'].geometry}
//             material={materials.saturn1_A}
//           />
//         </group>
//         <group rotation={[-1.551, -0.437, -0.663]}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Mimas_Mimas_0.geometry}
//             material={materials.Mimas}
//             position={[-185000.016, -0.004, 0]}
//           />
//         </group>
//         <group rotation={[-1.619, -0.156, 2.769]}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Enceladus_Enceladus_0.geometry}
//             material={materials.Enceladus}
//             position={[-237999.984, 0.004, 0.004]}
//           />
//         </group>
//       </group>
//     </group>
//   );
// }

// useGLTF.preload('/saturn.glb');

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps, MeshProps, useFrame } from '@react-three/fiber';
import { Group } from 'three/src/Three.js';

interface ModelProps extends GroupProps {
  userState?: string;
}

export function Planet(props: ModelProps) {
  const { nodes, materials } = useGLTF('/saturn.glb') as any; // Type assertion as any for now
  const groupRef = useRef<Group | null>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Rotate 360 degrees (2 * Math.PI radians) every 15 seconds
      groupRef.current.rotation.y = (clock.getElapsedTime() / 15) * Math.PI * 2;
    }
  });

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <group scale={0.00002}>
        <group rotation={[-1.229, -0.324, 0.842]}>
          <group position={[-0.094, 0.047, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Saturn2_B_saturn2_B_0.geometry}
              material={materials.saturn2_B}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Saturn2_B_saturn2_A_0.geometry}
              material={materials.saturn2_A}
            />
            {/* ... (other mesh components remain the same) ... */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Saturn2_B_saturn2_A_0_48.geometry}
              material={materials.saturn2_A}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['0'].geometry}
            material={materials.saturn1_A}
          />
        </group>
        <group rotation={[-1.551, -0.437, -0.663]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mimas_Mimas_0.geometry}
            material={materials.Mimas}
            position={[-185000.016, -0.004, 0]}
          />
        </group>
        <group rotation={[-1.619, -0.156, 2.769]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Enceladus_Enceladus_0.geometry}
            material={materials.Enceladus}
            position={[-237999.984, 0.004, 0.004]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/saturn.glb');