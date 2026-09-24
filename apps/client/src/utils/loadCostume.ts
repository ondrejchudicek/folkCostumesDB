/**
 * NOT A UTIL!! its a custom hook
 * Loads all GLTF models of given Costume into lastCostumePartsModels context, regardless of them being active.
 * Sets lastCostumeID context, which stores the ID of last loaded Costume.
 */

import { useGLTF } from '@react-three/drei';
import type { Costume, Model3D } from '../types';
import * as THREE from 'three';

export function useCostumePartsModels(costume: Costume): Model3D[] {
  const paths = costume.parts.map((part) => part.path);

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
