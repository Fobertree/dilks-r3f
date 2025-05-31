// import { ActiveCollisionTypes } from "@dimforge/rapier3d-compat";
import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RigidBody, Physics } from "@react-three/rapier";
// import { useRef } from "react";

import { PlayerControls } from "./PlayerControls";

function App() {
  // TODO: Pass ref into PlayerControls and MapController, so we can hook it up to the useEffect
  // var level = useRef<string>("NONE");

  return (
     <>
      <div style={{width: '100vw', height: '100vh'}}>
        <Canvas shadows camera = {{position: [30,30,30], fov: 30}}>
          <PlayerControls/>
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
