import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, useGLTF, OrbitControls } from '@react-three/drei';
import { HexColorPicker } from 'react-colorful';
import { proxy, useSnapshot } from 'valtio';
import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Preloader from '../utils/Preloader';

const stateVillage = proxy({
  current: null,
  items: {
    Window: '#fff',
    window_Glass: '#fff',
    Tree: '#fff',
    Vazo: '#fff',
    Other_Object: '#fff',
    Other_Object: '#fff',
    Other_Object: '#fff',
    Other_Object: '#fff',
    Other_Object: '#fff',
    Other_Object: '#fff',
    Other_Object: '#fff',
    Other_Object: '#fff',
    Other_Object: '#fff',
    Lights: '#fff',
    Lights: '#fff',
    Lights: '#fff',
    Lights: '#fff',
    Window: '#fff',
    Window: '#fff',
    Base_Build: '#fff',
    Base_Build: '#fff',
    Base_Build: '#fff',
    Base_Build: '#fff',
    Base_Build: '#fff',
    Base_Build: '#fff',
    Base_Build: '#fff',
    material: '#fff',
    Cabinet_glass: '#fff',
    Big_Cabinet: '#fff',
    Big_Cabinet: '#fff',
    Big_Cabinet: '#fff',
    Big_Cabinet: '#fff',
    Freezer: '#fff',
    Chair: '#fff',
    Chair: '#fff',
    Chair: '#fff',
    Chair: '#fff',
    Chair: '#fff',
    Chair: '#fff',
    Tezgah: '#fff',
    Tezgah: '#fff',
    up_Cabinet: '#fff',
    Down_Cabinet: '#fff',
    Down_Cabinet: '#fff',
    Down_Cabinet: '#fff',
    Down_Cabinet: '#fff',
    Down_Cabinet: '#fff',
    Down_Cabinet: '#fff',
    Down_Cabinet: '#fff',
    Down_Cabinet: '#fff',
    Down_Cabinet: '#fff',
    Down_Cabinet: '#fff',
    Commode: '#fff'
  },
});
let replaced = false

export function VillageModel(props) {
  const ref = useRef();
  const snap = useSnapshot(stateVillage);

  const { nodes, materials } = useGLTF('/kitchen_interior_design.glb');
  const { nodes: secondModelNodes, materials:  secondModelMaterials } = useGLTF('/hospital_room.glb');

  useFrame(() => {
    // No need for automatic animation if you've commented it out
  });

  const [hovered, set] = useState(null);

  useEffect(() => {
    props.handleLoader(true)
    if(materials){
      props.handleLoader(false)
    }
  }, [materials])

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`;
  }, [hovered]);

  useEffect(() => {
    if (materials) {
      Object.keys(snap.items).forEach((item) => {
        const material = materials[item];
        if (material) {
          material.color.set(snap.items[item]);
        }
      });
    }
  }, [snap.items, materials]);

  return (
    <group
      {...props}
      dispose={null}
      ref={ref}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (stateVillage.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (stateVillage.current = e.object.material.name))}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[25.396, 213.8, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.001}>
            <mesh geometry={nodes.defaultMaterial_16.geometry} material={materials.Window} />
            <mesh geometry={nodes.defaultMaterial_17.geometry} material={materials.window_Glass} />
          </group>
          <mesh 
            geometry={secondModelNodes['Commode-material'].geometry} 
            material={secondModelMaterials.Commode} 
            position={[-182.527, 142.456, 459.101]} 
            rotation={[-Math.PI / 2, 0, 1.146]} scale={0.4} 
          />
          <mesh geometry={nodes.defaultMaterial_1.geometry}  material={materials.Vazo} position={[-162.134, 20.68, 766.988]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.Other_Object} position={[-247.369, 166.804, 58.929]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.Other_Object} position={[207.325, 134.601, 268.244]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_4.geometry} material={materials.Other_Object} position={[-259.081, 347.719, -40.226]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_5.geometry} material={materials.Other_Object} position={[194.311, 136.929, -203.774]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_6.geometry} material={materials.Other_Object} position={[-259.179, 81.209, 255.144]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_7.geometry} material={materials.Other_Object} position={[-241.542, 272.356, -35.235]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_8.geometry} material={materials.Other_Object} position={[-241.542, 272.356, 310.524]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_9.geometry} material={materials.Other_Object} position={[-206.114, 92.606, 144.084]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_10.geometry} material={materials.Other_Object} position={[110.88, 23.819, 195.306]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_11.geometry} material={materials.Lights} position={[523.416, 481.732, 672.76]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_12.geometry} material={materials.Lights} position={[134.121, 358.316, 141.921]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_13.geometry} material={materials.Lights} position={[134.121, 501.337, 265.446]} rotation={[-Math.PI / 2, 0, 0]} scale={[5.336, 145.586, 9.82]} />
          <mesh geometry={nodes.defaultMaterial_14.geometry} material={materials.Lights} position={[134.121, 452.138, 265.446]} rotation={[-Math.PI / 2, 0, 0]} scale={[10.329, 166.713, 9.82]} />
          <mesh geometry={nodes.defaultMaterial_15.geometry} material={materials.Window} position={[-250.486, 354.134, 145.624]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_18.geometry} material={materials.Window} position={[-289.13, 238.499, 150.761]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_19.geometry} material={materials.Base_Build} position={[600.577, 282.177, 43.149]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_20.geometry} material={materials.Base_Build} position={[777.493, 229.722, 288.066]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_21.geometry} material={materials.Base_Build} position={[-274.976, 215.63, 208.385]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_22.geometry} material={materials.Base_Build} position={[284.635, 269.358, -274.753]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_23.geometry} material={materials.Base_Build} position={[205.196, 622.013, 289.117]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_24.geometry} material={materials.Base_Build} position={[267.23, -24.569, 289.128]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_25.geometry} material={materials.Base_Build} position={[611.63, 634.253, 289.675]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_26.geometry} material={materials.material} position={[-216.128, 194.534, 457.936]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_27.geometry} material={materials.Cabinet_glass} position={[571.201, 92.711, 421.276]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh 
            geometry={nodes.defaultMaterial_28.geometry} 
            material={materials.Big_Cabinet} 
            position={[566.275, 92.711, 421.276]} 
            rotation={[-Math.PI / 2, 0, 0]} scale={100} 
          />
          <mesh 
            geometry={nodes.defaultMaterial_29.geometry} 
            material={materials.Big_Cabinet} 
            position={[546.856, 493.442, 256.925]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            scale={100} 
          />
          <mesh 
            geometry={nodes.defaultMaterial_30.geometry} 
            material={materials.Big_Cabinet} 
            position={[546.856, 493.442, 97.541]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            scale={100} 
          />
          <mesh 
            geometry={nodes.defaultMaterial_31.geometry} 
            material={materials.Big_Cabinet} 
            position={[-259.179, 81.209, 414.687]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            scale={100} 
          />
          <mesh geometry={nodes.defaultMaterial_32.geometry} material={materials.Freezer} position={[522.436, 192.425, 388.067]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_33.geometry} material={materials.Chair} position={[277.935, 32.96, 143.591]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_34.geometry} material={materials.Chair} position={[299.166, 122.365, 143.644]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_35.geometry} material={materials.Chair} position={[277.935, 32.96, 267.991]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_36.geometry} material={materials.Chair} position={[299.166, 122.365, 268.044]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_37.geometry} material={materials.Chair} position={[277.935, 32.96, 383.415]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_38.geometry} material={materials.Chair} position={[299.166, 122.365, 383.467]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh 
            geometry={nodes.defaultMaterial_39.geometry} 
            material={materials.Tezgah} 
            position={[156.98, 130.898, 268.244]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            scale={100} 
          />
          <mesh geometry={nodes.defaultMaterial_40.geometry} material={materials.Tezgah} position={[-81.508, 130.87, 8.793]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_41.geometry} material={materials.up_Cabinet} position={[105.798, 268.461, -203.185]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_42.geometry} material={materials.Down_Cabinet} position={[-259.179, 81.209, 255.144]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_43.geometry} material={materials.Down_Cabinet} position={[460.604, 81.209, -40.226]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_44.geometry} material={materials.Down_Cabinet} position={[359.747, 81.209, -40.226]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_45.geometry} material={materials.Down_Cabinet} position={[130.397, 81.209, -40.226]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh 
            geometry={nodes.defaultMaterial_46.geometry} 
            material={materials.Down_Cabinet} 
            position={[30.128, 81.209, -40.226]} 
            rotation={[-Math.PI / 2, 0, 0]} scale={100} 
          />
          <mesh 
            geometry={replaced ? nodes.defaultMaterial_47.geometry : secondModelNodes['Commode-material'].geometry} 
            material={replaced ? materials.Down_Cabinet : secondModelMaterials.Commode} 
            position={replaced ? [-70.839, 81.209, -40.226] : [-20.839, -20.209, -200.226]} 
            rotation={[-Math.PI / 2, 0, 0]} scale={1.3} 
          />
          {/* <mesh 
            geometry={nodes.defaultMaterial_47.geometry} 
            material={materials.Down_Cabinet} 
            position={[-70.839, 81.209, -40.226]} 
            rotation={[-Math.PI / 2, 0, 0]} scale={100} 
          /> */}
          <mesh geometry={nodes.defaultMaterial_48.geometry} material={materials.Down_Cabinet} position={[-259.179, 81.209, 33.5]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_49.geometry} material={materials.Down_Cabinet} position={[-259.179, 81.209, 144.084]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_50.geometry} material={materials.Down_Cabinet} position={[-259.179, 81.209, 144.084]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.defaultMaterial_51.geometry} material={materials.Down_Cabinet} position={[-259.179, 81.209, 144.084]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/kitchen_interior_design.glb');

function Picker() {
  const snap = useSnapshot(stateVillage);
  if (!snap.current) {
    return null; // or any other fallback UI when snap.current is null
  }
  return (
    // <div className='h-auto w-[200px] bg-white rounded-sm position-absolute top-0 bottom-0 left-0  '>
      <div className='p-4 color-picker-main w-[240px] h-full bg-white' style={{ display: snap.current ? 'block' : 'none' }}>
      <div className=''>
        <p className='font-bold text-lg mb-4'>Colors</p>
        <HexColorPicker
        className="picker"
        color={snap.items[snap.current]}
        onChange={(color) => (stateVillage.items[snap.current] = color)}
      />
      </div>
      
      <div className=''>
        <p className='font-bold text-lg mt-5 mb-4'>Textures</p>
        <div className='grid grid-cols-2 gap-[12px] '>
          <div className='item w-[100px] h-[100px] border rounded-sm p-2'>test</div>
          <div className='item w-[100px] h-[100px] border rounded-sm p-2'>test</div>
          <div className='item w-[100px] h-[100px] border rounded-sm p-2'>test</div>
          <div className='item w-[100px] h-[100px] border rounded-sm p-2'>test</div>
          <div className='item w-[100px] h-[100px] border rounded-sm p-2'>test</div>
          <div className='item w-[100px] h-[100px] border rounded-sm p-2'>test</div>
        </div>
      </div>

      <div className='left-options'>
        <div className='option' onClick={() => {
          replaced=false
        }}>black</div>
        <div className='option' onClick={() => {
          replaced=true
        }}>white</div>
      </div>
    </div>
    // </div>
  );
}

export default function App() {
  const [loader, setLoader] = useState(true)

  const handleLoader = (value) => {
    setLoader(value)
  }
  return (
    <div className='main-board'>
      <Picker />
      {loader &&
        <Preloader />}
        <Canvas
            camera={{ position: [2, 0, 12.25], fov: 60 }}
            style={{
              backgroundColor: '#e1e1e1',
              width: '100vw',
              height: 'calc(100vh - 50px)',
            }}
        >
            <ambientLight intensity={1.25} />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.1} />
            <Suspense fallback={null}>
            <VillageModel position={[-10.25, -200.9, -300]} handleLoader={handleLoader} />
            </Suspense>
            <OrbitControls
              enableDamping={false}
              minDistance={20}
              maxDistance={180}
              rotateSpeed={.2}
              minPolarAngle={0}
              maxPolarAngle={2.5}
              minAzimuthAngle={-1.4}
              maxAzimuthAngle={1.6}
            />
        </Canvas>
    </div>
  )
}
