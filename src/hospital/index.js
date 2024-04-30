import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, useGLTF, OrbitControls } from '@react-three/drei';
import { HexColorPicker } from 'react-colorful';
import { proxy, useSnapshot } from 'valtio';

const stateVillage = proxy({
  current: null,
  items: {
    // bed_lowpoly_equipment_material_0: '#333',
    // mattress_lowpoly_equipment_material_0: '#333',
    // desk_lowpoly_equipment_material_0: '#333',
    // pouf_legs_lowpoly_equipment_material_0: '#333',
    // pouf_seat_lowpoly_equipment_material_0: '#333',
    // cupboards_lowpoly_equipment_material_0: '#333',
    // book_lowpoly_equipment_material_0: '#333',
    // shoe_lowpoly_equipment_material_0: '#333',
    // wardrobe_lowpoly_equipment_material_0: '#333',
    // room_lowpoly_room_material_0: '#333',
    // blanket_lowpoly_equipment_material_0: '#333',
    // pillow_big_lowpoly_equipment_material_0: '#333',
    // pillow_03_lowpoly_equipment_material_0: '#333',
    // pillow_02_lowpoly_equipment_material_0: '#333',
    // bed_lowpoly_equipment_material_0: '#333',
    Commode: '#ffffff',
    Sign: '#ffffff',
    Wall1: '#ffffff',
    Wall2: '#ffffff',
    Wall3: '#ffffff',
    WindowWall: '#ffffff',
    DoorWall: '#ffffff',
    Door: '#ffffff',
    Wall5: '#ffffff',
    Ground: '#ffffff',
    Light1: '#ffffff',
    Light2: '#ffffff',
    FoodTable: '#ffffff',
    IvPole: '#ffffff',
    Serum: '#ffffff',
    Curtain: '#ffffff',
    Machine_O: '#ffffff',
    Machine: '#ffffff',
    OxygenTube: '#ffffff',

    ElectricSystm: '#ffffff',
    ElectricSystm: '#ffffff',
    material_8: '#ffffff',
    TvSystm: '#ffffff',
    Cabinet1: '#ffffff',
    Cabinet1DoorGlass: '#ffffff',
    Cabinet1Door: '#ffffff',
    material: '#ffffff',
    Cabinet2: '#ffffff',
    Sofa: '#ffffff',
    Table: '#ffffff',
    Chair: '#ffffff',
  },
});

export function VillageModel(props) {
  const ref = useRef();
  const snap = useSnapshot(stateVillage);

  const { nodes, materials } = useGLTF('/hospital_room.glb');

  useFrame(() => {
    // No need for automatic animation if you've commented it out
  });

  const [hovered, set] = useState(null);
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
        <mesh geometry={nodes['Commode-material'].geometry} material={materials.Commode} position={[0.038, 0.167, 0]} scale={0.001} />
        <mesh geometry={nodes['Sign-material'].geometry} material={materials.Sign} position={[0.004, -0.261, 0.203]} scale={0.001} />
        <mesh geometry={nodes['Wall1-material'].geometry} material={materials.Wall1} position={[-0.418, -1.495, 0]} scale={0.001} />
        <mesh geometry={nodes['Wall2-material'].geometry} material={materials.Wall2} position={[-0.418, -0.871, 0]} scale={0.001} />
        <mesh geometry={nodes['Wall3-material'].geometry} material={materials.Wall3} position={[-0.147, -0.995, 0]} scale={0.001} />
        <mesh geometry={nodes['WindowWall-material'].geometry} material={materials.WindowWall} position={[-0.023, -1.429, 0]} scale={0.001} />
        <mesh geometry={nodes['Door-material'].geometry} material={materials.Door} position={[-0.027, -0.915, 0]} scale={0.001} />
        <mesh geometry={nodes['DoorWall-material'].geometry} material={materials.DoorWall} position={[-0.024, -0.995, 0]} scale={0.001} />
        <mesh geometry={nodes['Wall5-material'].geometry} material={materials.Wall5} position={[-0.147, -0.494, 0]} scale={0.001} />
        <mesh geometry={nodes['Ground-material'].geometry} material={materials.Ground} position={[0.213, -0.494, 0]} scale={0.001} />
        <mesh geometry={nodes['Light1-material'].geometry} material={materials.Light1} position={[0.002, -0.007, 0.445]} scale={0.001} />
        <mesh geometry={nodes['Light2-material'].geometry} material={materials.Light2} position={[0.002, -0.007, 0.445]} scale={0.001} />
        <mesh geometry={nodes['FoodTable-material'].geometry} material={materials.FoodTable} position={[0.107, 0.275, 0.038]} scale={0.001} />
        <mesh geometry={nodes['IvPole-material'].geometry} material={materials.IvPole} position={[0.042, -0.149, 0]} scale={0.001} />
        <mesh geometry={nodes['Serum-material'].geometry} material={materials.Serum} position={[0.042, -0.117, 0.193]} scale={0.001} />
        <mesh geometry={nodes['Curtain-material'].geometry} material={materials.Curtain} position={[-0.004, 0.486, 0.159]} scale={0.001} />
        <mesh geometry={nodes['Machine-material'].geometry} material={materials.Machine} position={[0.035, 0.747, 0]} scale={0.001} />
        <mesh geometry={nodes['Machine_O-material'].geometry} material={materials.Machine_O} position={[0.035, 0.747, 0]} scale={0.001} />
        <mesh geometry={nodes['OxygenTube-material'].geometry} material={materials.OxygenTube} position={[0.028, 0.919, 0]} scale={0.001} />
        <mesh geometry={nodes['ElectricSystm-material'].geometry} material={materials.ElectricSystm} position={[-0.01, -0.007, 0.207]} scale={0.001} />
        <mesh geometry={nodes['TvSystm-material'].geometry} material={materials.TvSystm} position={[-0.008, -0.062, 0.24]} scale={0.001} />
        <mesh geometry={nodes['Tv-material'].geometry} material={materials.material_8} position={[0.048, -0.061, 0.388]} scale={0.001} />
        <mesh geometry={nodes['Cabinet1-material'].geometry} material={materials.Cabinet1} position={[0.04, 1.133, -0.005]} scale={0.001} />
        <mesh geometry={nodes['Cabinet1DoorGlass-material'].geometry} material={materials.Cabinet1DoorGlass} position={[0.081, 1.185, 0.133]} scale={0.001} />
        <mesh geometry={nodes['Cabinet1Door-material'].geometry} material={materials.Cabinet1Door} position={[0.081, 1.185, 0.133]} scale={0.001} />
        <mesh geometry={nodes['Bed-material'].geometry} material={materials.material} position={[0.17, -0.002, 0.045]} scale={0.001} />
        <mesh geometry={nodes['Cabinet2-material'].geometry} material={materials.Cabinet2} position={[0.03, 1.326, 0]} scale={0.001} />
        <mesh geometry={nodes['Sofa-material'].geometry} material={materials.Sofa} position={[0.042, 1.913, 0]} scale={0.001} />
        <mesh geometry={nodes['Table-material'].geometry} material={materials.Table} position={[0.05, 1.636, 0]} rotation={[0, 0, -0.573]} scale={0.001} />
        <mesh geometry={nodes['Chair-material'].geometry} material={materials.Chair} position={[0.037, 1.493, 0]} scale={0.001} />
      </group>
    </group>
    // <group
    //   {...props}
    //   dispose={null}
    //   ref={ref}
    //   onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
    //   onPointerOut={(e) => e.intersections.length === 0 && set(null)}
    //   onPointerMissed={() => (stateVillage.current = null)}
    //   onPointerDown={(e) => (e.stopPropagation(), (stateVillage.current = e.object.material.name))}
    // >
    //   <mesh 
    //     geometry={nodes.bed_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-199, 100, 90]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.bed_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.mattress_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-199, 100, 90]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.mattress_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.desk_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[200, -20, -250]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.desk_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.pouf_legs_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-40, 100, -180]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.pouf_legs_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.pouf_seat_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-40, 125, -180]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.pouf_seat_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.cupboards_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[100, 520, -300]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.cupboards_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.book_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-270, 474, -260]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.book_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.shoe_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-60, 0, -50]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.shoe_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.wardrobe_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[299, 100, -199]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.wardrobe_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.room_lowpoly_room_material_0.geometry} 
    //     material={materials.room_material} 
    //     position={[0, 300, 0]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.room_lowpoly_room_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.blanket_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[0, 0.959, 0]
    //     } rotation={[-Math.PI / 2, 0, 0]} scale={100}
    //     color={snap.items.blanket_lowpoly_equipment_material_0}
    //    />
    //   <mesh 
    //     geometry={nodes.pillow_big_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     rotation={[-Math.PI / 2, 0,0]} 
    //     scale={100} 
    //     color={snap.items.pillow_big_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.pillow_03_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     rotation={[-Math.PI / 2, 0, 0]} 
    //     scale={100} 
    //     color={snap.items.pillow_03_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.pillow_02_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.pillow_02_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.pillow_01_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     rotation={[-Math.PI / 2, 0, 0]} 
    //     scale={100} 
    //     color={snap.items.pillow_01_lowpoly_equipment_material_0}
    //     />
    //   <mesh 
    //     geometry={nodes.plant_big_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[32, 180, -233]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.plant_big_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.laptop_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-240, 180, -260]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.laptop_lowpoly_equipment_material_0}
    //   />
    //   <mesh 
    //     geometry={nodes.sock_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[158.6, 78.06, -165.9]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //     color={snap.items.sock_lowpoly_equipment_material_0}
    //   />

    //   {/* UPTOTHIS */}
    //   <mesh 
    //     geometry={nodes.box_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-240, 0, -240]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //   />
    //   <mesh 
    //     geometry={nodes.toy_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-245.706, 100.171, 
    //     -196.972]} rotation={[-Math.PI / 2, 0, 0]} scale=
    //   {100} />
    //   <mesh 
    //     geometry={nodes.plant_small_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-315, 200, -39]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //   />
    //   <mesh 
    //     geometry={nodes.fan_02_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-153, 200, -320]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //   />
    //   <mesh 
    //     geometry={nodes.timer_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-319, 215, 29]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //   />
    //   <mesh 
    //     geometry={nodes.photos_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-99.538, 488.523, 
    //     -295.392]} rotation={[-Math.PI / 2, 0, 0]} scale=
    //   {100} />
    //   <mesh 
    //     geometry={nodes.shutter_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[0, 287, 0]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //   />
    //   <mesh 
    //     geometry={nodes.window_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[0, 300, 0]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //   />
    //   <mesh 
    //     geometry={nodes.fan_01_lowpoly_equipment_material_0.geometry} 
    //     material={materials.equipment_material} 
    //     position={[-153, 200, -320]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //   />
    //   <mesh 
    //     geometry={nodes.ray_lowpoly_ray_material_0.geometry} 
    //     material={materials.ray_material} 
    //     position={[0, 300, 0]} 
    //     rotation={[-Math.PI / 2, 0, 0]} scale={100} 
    //   />
    //   {/* <group rotation={[-Math.PI / 2, 0, 0]} scale={0.202}>
    //     <mesh 
    //       geometry={nodes['sky-material'].geometry} 
    //       material={materials.material} position={[20.856, -8.63, 6.316]} 
    //       rotation={[Math.PI, Math.PI / 2, 0]} 
    //       color={snap.items.skyMaterial}
    //     />
    //     <mesh 
    //       geometry={nodes['light-material'].geometry} 
    //       material={materials.light} position={[0.233, 7.538, 4.378]} 
    //       rotation={[1.804, 0, 0]} scale={[3.498, 3.01, 3.473]} 
    //       color={snap.items.lightMaterial}
    //     />
    //     <mesh 
    //       geometry={nodes['bed_room-material'].geometry} 
    //       material={materials.bed_room} position={[0.233, 7.538, 4.378]} 
    //       rotation={[1.804, 0, 0]} scale={[3.498, 3.01, 3.473]} 
    //       color={snap.items.bed_roomMaterial}
    //     />
    //     <mesh 
    //       geometry={nodes['rien-material'].geometry} 
    //       material={materials.rien} position={[-12.8, 10.486, 0.008]} 
    //       rotation={[-Math.PI, 0, Math.PI / 2]} scale={[0.848, 1, 1]} 
    //       color={snap.items.rienMaterial}
    //     />
    //   </group> */}
    // </group>
  );
}

useGLTF.preload('/hospital_room.glb');

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
  return (
    <div className='main-board'>
    <Canvas
      camera={{ position: [2, 0, 12.25], fov: 60 }}
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
      <VillageModel  position={[0.025, -0.9, 0]} />
      </Suspense>
      <OrbitControls 
        enableDamping={false} 
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
