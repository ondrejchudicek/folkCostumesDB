import type { Model3D, PartToggle, ToRender } from '../types';

export function prepareRenderedParts(
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
