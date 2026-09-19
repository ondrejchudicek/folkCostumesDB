import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Costume from "./Costume.tsx";

export default function Renderer() {
  // hook to costume context and update parts when currentCostume changes
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 bg-green-700">
      <Canvas camera={{ fov: 65, near: 0.01, far: 100, position: [0, 0, 2] }}>
        <ambientLight intensity={1} />
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.15}
          enablePan={true}
        />
        <Costume />
      </Canvas>
    </div>
  );
}
