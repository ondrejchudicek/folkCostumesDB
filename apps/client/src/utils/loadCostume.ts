/**
 * NOT A UTIL!! its a custom hook
 * Loads all GLTF models of given Costume into lastCostumePartsModels context, regardless of them being active.
 * Sets lastCostumeID context, which stores the ID of last loaded Costume.
 */

import { useGLTF } from '@react-three/drei';
import type { Model3D, Part } from '../types';
import * as THREE from 'three';
import { usePreviewContext } from '../Contexts';

const API = 'http://localhost:3000/api';

export function useCostumePartsModels(
  parts: Part[],
  isPreview: boolean,
): Model3D[] {
  let paths = [];
  const previewContext = usePreviewContext();
  const preview = previewContext.preview;
  const setPreview = previewContext.setPreview;

  if (isPreview) {
    if (!preview.previewParts) return [];
    console.log('loading preview ');
    if (preview.reloadPreview) {
      for (let i = 0; i < preview.previewParts.length; i++) {
        // i thiunk on second reload this creates a new URL for the same model which rerenders app again
        const path = URL.createObjectURL(preview.previewParts[i]);
        paths.push(path);
        console.log(path);
      }

      setPreview({
        previewParts: preview.previewParts,
        reloadPreview: false,
        paths: paths,
      });
    } else {
      paths = preview.paths;
    }
  } else {
    console.log('loading parts');
    paths = parts.map((part) => `${API}/models/${part.partID}`);
  }

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
