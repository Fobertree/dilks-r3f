// import { ActiveCollisionTypes } from "@dimforge/rapier3d-compat";
import { Box, Sphere, PerspectiveCamera } from "@react-three/drei";
import { useFrame, Canvas } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, Physics } from "@react-three/rapier";
// import * as THREE from 'three'

function App() {

  return (
     <>
      <div style={{width: '100vw', height: '100vh'}}>
        <Canvas shadows camera = {{position: [30,30,30], fov: 30}}>
          <color attach="background" args={["#1d3bb5"]}/>
          <ambientLight intensity={0.5}/>
          <directionalLight position={[-10,10,0]} intensity={0.4}/>
          {/* <OrbitControls/> */}
          <Physics gravity={[0, 0,0]}>
            <RigidBody type='fixed'>
                <Box position={[0,0,0]} args={[30,1,30]}>
                    <meshStandardMaterial color="springgreen"/>
                </Box>
            </RigidBody>

          </Physics>
        </Canvas>
      </div>
    </>
  )
}

export default App
