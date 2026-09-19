import { useState, type Dispatch, type SetStateAction } from "react";
import { useGLTF } from "@react-three/drei";
import type { Costume, PartToggle, ToRender } from "../types.ts";
import * as THREE from "three";
import type { Model3D } from "../types.ts";
import { useActiveCostume } from "../CostumeContext.tsx";

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
  partToggles: PartToggle[],
  costumePartsModels: Model3D[],
): ToRender[] {
  const toRender: ToRender[] = [];

  if (partToggles.length !== costumePartsModels.length) return [];

  for (let i = 0; i < partToggles.length; i++) {
    if (partToggles[i].isActive) {
      toRender.push({
        model: costumePartsModels[i],
        key: partToggles[i].partID,
      });
    }
  }

  return toRender;
}

// ideally this would remember list of GLBs + bools and only reload when activeCostume chages, update visibility when activeParts changes
// activeParts have to be shared with UI, so prob in ActiveCostume, which will trigger reload if parts change
// although this function always has to trigger to update the rendered items so I should instead try to avoid requesting loaded parts from DB and store them somewhere instead
// something like remember last costume in state and check if available when reloading

// prob have to load costume with GLTFLoader externally and change active costume when its ready
export default function Costume() {
  const { activeCostume } = useActiveCostume();

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

  const toRender: ToRender[] = prepareRenderedParts(
    activeCostume.partToggles,
    lastCostumePartsModels,
  );

  console.log("Costume render", toRender);

  return (
    <>
      {toRender.map((part) => (
        <primitive key={part.key} object={part.model} scale={1} />
      ))}
    </>
  );
}
