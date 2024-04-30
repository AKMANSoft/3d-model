import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, useGLTF, OrbitControls } from '@react-three/drei';
import { HexColorPicker } from 'react-colorful';
import { proxy, useSnapshot } from 'valtio';
import BedRoomPreloader from '../utils/BedRoomPreloader';

const stateVillage = proxy({
  current: null,
  items: {
    Material_2146803309: '#ffffff',
    Material_2146802824: '#ffffff',
    Material_38: '#ffffff',
    Material_2146802826: '#ffffff',
    Material_2146802871: '#ffffff',
    Material_2146803016: '#ffffff',
    Material_39: '#ffffff',
    Material_2146802870: '#ffffff',
    Material_2146804358: '#ffffff',
  },
});

export function VillageModel(props) {
  const ref = useRef();
  const snap = useSnapshot(stateVillage);

  const { nodes, materials } = useGLTF('/tiny_isometric_room.glb');
//   console.log("materila is ", materials?.Bedroom.color)
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
      scale={0.5}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bed_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-199, 100, 90]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mattress_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-199, 100, 90]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.desk_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[200, -20, -250]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pouf_legs_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-40, 100, -180]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pouf_seat_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-40, 125, -180]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cupboards_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[100, 520, -300]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.book_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-270, 474, -260]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shoe_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-60, 0, -50]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wardrobe_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[299, 100, -199]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.room_lowpoly_room_material_0.geometry}
        material={materials.room_material}
        position={[0, 300, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blanket_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[0, 0.959, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pillow_big_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pillow_03_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pillow_02_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pillow_01_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.plant_big_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[32, 180, -233]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.laptop_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-240, 180, -260]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sock_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[158.6, 78.06, -165.9]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.box_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-240, 0, -240]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.toy_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-245.706, 100.171, -196.972]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.plant_small_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-315, 200, -39]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.fan_02_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-153, 200, -320]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.timer_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-319, 215, 29]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.photos_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-99.538, 488.523, -295.392]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shutter_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[0, 287, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.window_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[0, 300, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.fan_01_lowpoly_equipment_material_0.geometry}
        material={materials.equipment_material}
        position={[-153, 200, -320]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ray_lowpoly_ray_material_0.geometry}
        material={materials.ray_material}
        position={[0, 300, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload('/tiny_isometric_room.glb');

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
      camera={{ position: [1, 1, 1.25], fov: 60 }}
      style={{
         backgroundColor: '#e1e1e1',
         width: '100vw',
         height: '90vh',
      }}
   >
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
      <VillageModel  position={[0.025, -100.9, -20]} handleLoader={handleLoader} />
      </Suspense>
      <OrbitControls 
        enableDamping={false} 
        minDistance={100}
        maxDistance={280}
      />
      {/* <OrbitControls 
          enableDamping={false} 
          minPolarAngle={Math.PI / 2} 
          maxPolarAngle={Math.PI / 2} 
          enableZoom={true} 
          enablePan={true} 
        /> */}
   </Canvas>
    </div>
  )
}
