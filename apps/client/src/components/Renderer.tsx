import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Costume from './Costume.tsx';
import {
  useCallback,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from 'react';

export default function Renderer({
  setControlsReset,
}: {
  setControlsReset: Dispatch<SetStateAction<() => void>>;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const handleReset = useCallback(() => {
    const controls = controlsRef.current;

    if (!controls) return;

    controls.object.position.set(0, 1, 2);
    controls.target.set(0, 1, 0);
    controls.update();
  }, []);

  useEffect(() => {
    setControlsReset(() => handleReset);
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 bg-green-700">
      <Canvas camera={{ fov: 65, near: 0.01, far: 100, position: [0, 1, 2] }}>
        <ambientLight intensity={1} />
        <OrbitControls
          ref={controlsRef}
          enableDamping={true}
          dampingFactor={0.15}
          enablePan={true}
          target={[0, 1, 0]}
        />
        <Costume />
      </Canvas>
    </div>
  );
}
