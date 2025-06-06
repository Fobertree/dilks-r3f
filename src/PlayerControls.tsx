import { useFrame } from '@react-three/fiber'
import { PointerLockControls, PerspectiveCamera } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const MOVE_SPEED : number = 5;

export const PlayerControls = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
  const direction = new THREE.Vector3()
  const keys = useRef<{ [key: string]: boolean }>({})

  // Track pressed keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => (keys.current[e.code] = true)
    const handleKeyUp = (e: KeyboardEvent) => (keys.current[e.code] = false)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  
  // useEffect(() => {
  //       cameraRef.current.position.set(0,0,0);
  //       direction.set(0,0,0);
  //   }, []) // TODO: hook this useEffect up to a level state manager


  useFrame((_, delta) => {
    const cam = cameraRef.current
    if (!cam) return
    
    if (keys.current['KeyW']) direction.z = 1
    if (keys.current['KeyS']) direction.z = -1
    if (keys.current['KeyA']) direction.x = 1
    if (keys.current['KeyD']) direction.x = -1
    
    // this is spaghetti, but we don't need a damping factor
    if (!(
      keys.current['KeyW'] || 
      keys.current['KeyS'] || 
      keys.current['KeyA'] || 
      keys.current['KeyD']
    )) {
      direction.z = 0;
      direction.x = 0;
    }

    direction.normalize()

    // Get camera direction and apply movement
    const moveSpeed = MOVE_SPEED
    const forward = new THREE.Vector3()
    cam.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()

    const right = new THREE.Vector3()
    right.crossVectors(cam.up, forward).normalize()

    const move = new THREE.Vector3()
    move.addScaledVector(forward, direction.z)
    move.addScaledVector(right, direction.x)
    move.multiplyScalar(moveSpeed * delta)

    cam.position.add(move)
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 5]} fov={75} />
      <PointerLockControls />
    </>
  )
}
