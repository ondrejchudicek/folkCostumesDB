/**
 * NOT A UTIL!! its a custom hook
 * Loads all GLTF models of given Costume into lastCostumePartsModels context, regardless of them being active.
 * Sets lastCostumeID context, which stores the ID of last loaded Costume.
 */

import { useGLTF } from '@react-three/drei';
import type { Model3D, Part } from '../types';
import * as THREE from 'three';

const API = 'http://localhost:3000/api';

export function useCostumePartsModels(parts: Part[]): Model3D[] {
  const paths = parts.map((part) => `${API}/models/${part.partID}`);

  const models = useGLTF(paths);

  return models.map(({ scene }) => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.side = THREE.DoubleSide;
      }
    });

    return scene;
  });
}
