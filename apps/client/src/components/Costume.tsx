import { useState } from 'react';
import type { Costume, ToRender } from '../types.ts';
import type { Model3D } from '../types.ts';
import { useActiveCostume } from '../CostumeContext.tsx';
import { prepareRenderedParts } from '../utils/prepareRenderedParts.ts';
import { loadCostumePartsModels } from '../utils/loadCostume.ts';

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

  return (
    <>
      {toRender.map((part) => (
        <primitive key={part.key} object={part.model} scale={1} />
      ))}
    </>
  );
}
