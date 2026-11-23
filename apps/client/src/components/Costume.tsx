import type { Costume, Model3D, ToRender } from '../types.ts';
import { useActiveCostume, useSetIsLoadingContext } from '../Contexts.ts';
import { prepareRenderedParts } from '../utils/prepareRenderedParts.ts';
import { useCostumePartsModels } from '../utils/loadCostume.ts';

export default function Costume() {
  const setIsLoading = useSetIsLoadingContext();
  const { activeCostume } = useActiveCostume();
  let costumePartsModels: Model3D[];

  setIsLoading(true);
  if (
    activeCostume.costume.costumeID < 0 &&
    activeCostume.costume.name === 'Preview'
  ) {
    costumePartsModels = useCostumePartsModels(activeCostume.parts, true);
  } else {
    costumePartsModels = useCostumePartsModels(activeCostume.parts, false);
  }
  setIsLoading(false);

  const toRender: ToRender[] = prepareRenderedParts(
    activeCostume.partToggles,
    costumePartsModels,
  );

  const primitives = toRender.map((part) => (
    <primitive key={part.key} object={part.model} scale={1} visible />
  ));

  return <>{primitives}</>;
}
