import { useGLTF } from '@react-three/drei';
import type { Dispatch, SetStateAction } from 'react';
import type { Model3D, Costume } from '../types';
import * as THREE from 'three';

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

export function loadCostumePartsModels(
  costume: Costume,
  setLastCostumePartsModels: Dispatch<SetStateAction<Model3D[]>>,
  setLastCostumeID: Dispatch<SetStateAction<string | null>>,
): void {
  const loadingParts: Model3D[] = [];

  costume.parts.map((part) => loadingParts.push(loadPartModel(part.path)));
  setLastCostumePartsModels(loadingParts);
  setLastCostumeID(costume.costumeID);
}
