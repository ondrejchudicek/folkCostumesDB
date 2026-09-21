import { describe, expect, it } from 'vitest';
import { prepareRenderedParts } from './prepareRenderedParts';
import { Group } from 'three';

describe('prepareRenderedParts', () => {
  it('returns only active parts', () => {
    const modelA = new Group();
    const modelB = new Group();
    const modelC = new Group();
    const models = [modelA, modelB, modelC];

    const toggles = [
      { isActive: true, partID: '1' },
      { isActive: false, partID: '2' },
      { isActive: true, partID: '3' },
    ];

    expect(prepareRenderedParts(toggles, models)).toEqual([
      { model: modelA, key: '1' },
      { model: modelC, key: '3' },
    ]);
  });

  it("returns an empty array when lengths don't match", () => {
    const modelA = new Group();
    const modelB = new Group();
    const models = [modelA, modelB];

    const toggles = [{ isActive: true, partID: '1' }];

    expect(prepareRenderedParts(toggles, models)).toEqual([]);
  });
});
