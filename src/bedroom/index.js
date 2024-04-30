import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, useGLTF, OrbitControls } from '@react-three/drei';
import { HexColorPicker } from 'react-colorful';
import { proxy, useSnapshot } from 'valtio';
import BedRoomPreloader from '../utils/BedRoomPreloader';

const stateVillage = proxy({
  current: null,
  items: {
    Bedroom_Bedroom_0: '#ffffff',
    Bedroom_Bedroom_0_1: '#ffffff',
    Bedroom_Duvet_0: '#ffffff',
    Bedroom_Carpet_0: '#ffffff',
    Bedroom_Windows_0: '#ffffff',
  },
});

export function VillageModel(props) {
  const ref = useRef();
  const snap = useSnapshot(stateVillage);

  const { nodes, materials } = useGLTF('/minimalistic_modern_bedrooms.glb');
  console.log("materila is ", materials?.Bedroom.color)
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
          console.log("snap.items[item] ", snap.items[item])
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
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.094}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[2721.36, 3174.92, 1814.24]}>
            <mesh geometry={nodes.Bedroom_Bedroom_0.geometry} material={materials.Bedroom} />
            <mesh geometry={nodes.Bedroom_Bedroom_0_1.geometry} material={materials.Bedroom} />
            <mesh geometry={nodes.Bedroom_Duvet_0.geometry} material={materials.Duvet} />
            <mesh geometry={nodes.Bedroom_Carpet_0.geometry} material={materials.Carpet} />
            <mesh geometry={nodes.Bedroom_Windows_0.geometry} material={materials.Windows} />
          </group>
        </group>
    </group>
    </group>
  );
}

useGLTF.preload('/minimalistic_modern_bedrooms.glb');

function Picker() {
  const snap = useSnapshot(stateVillage);
  if (!snap.current) {
    console.log("its null here.")
    return null; // or any other fallback UI when snap.current is null
  }
  return (
    <div style={{ display: snap.current ? 'block' : 'none' }}>
      <HexColorPicker
        className="picker"
        color={snap.items[snap.current]}
        onChange={(color) => (stateVillage.items[snap.current] = color)}
      />
      <h1>{snap.current}</h1>
    </div>
  );
}

export default function App() {
  const [loader, setLoader] = useState(true)

  const handleLoader = (value) => {
    setLoader(value)
  }
  return (
    <div className='main-board' style={{position: 'relative'}}>
      {/* <div className='left'> */}
      {/* <Picker /> */}
      {/* </div> */}
      {loader &&
        <BedRoomPreloader />}
    <Canvas
      camera={{ position: [2, 0, 12.25], fov: 60 }}
      style={{
         backgroundColor: '#e1e1e1',
         width: '100vw',
         height: 'calc(100vh - 80px)',
      }}
   >
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
      <VillageModel position={[-0.025, 0.1, 0]} handleLoader={handleLoader} />
      </Suspense>
      <OrbitControls 
        enableDamping={false} 
        minDistance={.2}
        maxDistance={2}
        rotateSpeed={.2}
        minPolarAngle={.5}
        maxPolarAngle={2.5}
        minAzimuthAngle={-.6}
        maxAzimuthAngle={0.6}
      />
   </Canvas>
    </div>
  )
}
