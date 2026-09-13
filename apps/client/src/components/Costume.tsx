import {
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useGLTF } from "@react-three/drei";
import type { ActiveCostume, Costume } from "../types.ts";
import * as THREE from "three";
import type { Model3D } from "../types.ts";

function loadPartModel(path: string): Model3D {
  const scene = useGLTF(path).scene;

  scene.position.y = -1;

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.side = THREE.DoubleSide;
    }
  });

  return scene;
}

function loadCostumePartsModels(
  costume: Costume,
  setLastCostumePartsModels: Dispatch<SetStateAction<Model3D[]>>,
  setLastCostumeID: Dispatch<SetStateAction<string | null>>,
): void {
  const loadingParts: Model3D[] = [];

  costume.parts.map((part) => loadingParts.push(loadPartModel(part.path)));
  setLastCostumePartsModels(loadingParts);
  setLastCostumeID(costume.costumeID);
}

function prepareRenderedParts(
  costume: Costume,
  costumePartsModels: Model3D[],
): Model3D[] {
  const toRender: Model3D[] = [];

  if (costume.parts.length !== costumePartsModels.length) return [];

  for (let i = 0; i < costume.parts.length; i++) {
    if (costume.parts[i]) {
      toRender.push(costumePartsModels[i]);
    }
  }

  return toRender;
}

interface CostumeProps {
  activeCostume: ActiveCostume;
  children?: ReactNode;
}

// ideally this would remember list of GLBs + bools and only reload when activeCostume chages, update visibility when activeParts changes
// activeParts have to be shared with UI, so prob in ActiveCostume, which will trigger reload if parts change
// although this function always has to trigger to update the rendered items so I should instead try to avoid requesting loaded parts from DB and store them somewhere instead
// something like remember last costume in state and check if available when reloading

// prob have to load costume with GLTFLoader externally and change active costume when its ready
export default function Costume({ activeCostume }: CostumeProps) {
  const [lastCostumePartsModels, setLastCostumePartsModels] = useState<
    Model3D[]
  >([]);
  const [lastCostumeID, setLastCostumeID] = useState<string | null>(null);

  if (!lastCostumeID || lastCostumeID !== activeCostume.costume.costumeID) {
    loadCostumePartsModels(
      activeCostume.costume,
      setLastCostumePartsModels,
      setLastCostumeID,
    );
  }

  const toRender: Model3D[] = prepareRenderedParts(
    activeCostume.costume,
    lastCostumePartsModels,
  );

  return (
    <>
      {toRender.map((part, index) => (
        <primitive key={index} object={part} scale={1} />
      ))}
    </>
  );
}
