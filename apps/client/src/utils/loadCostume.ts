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
    //if (!preview.previewParts) return [];

    if (preview.reloadPreview && preview.previewParts) {
      for (let i = 0; i < preview.previewParts.length; i++) {
        const path = URL.createObjectURL(preview.previewParts[i]);
        paths.push(path);
      }

      setPreview({
        previewParts: preview.previewParts,
        reloadPreview: false,
        paths,
      });
    } else {
      paths = preview.paths;
    }
  } else {
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
