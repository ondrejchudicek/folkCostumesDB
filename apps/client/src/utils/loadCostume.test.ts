import { describe, expect, it } from 'vitest';
import { useCostumePartsModels } from './loadCostume';
import type { Costume, Model3D } from '../types';

describe('loadCostume', () => {
  it("loads all costume's models", () => {
    const costume: Costume = {
        costumeID: '18de65c8-75f9-4120-946c-eac9e8a66711',
        name: 'Kněždubský mužský nedělní kroj',
        description:
        'I když dokumentovaná historie kněždubského kroje sahá do 18. století, v průběhu let se výrazně vyvíjel. Ať už díky lepší dostupnosti materiálů, vývoji průmyslu, bohatnutí obyvatelstva i změně preferencí vesničanů na jeho vzhled a snaze odlišit se od ostatních vesnic. Dnešní podoba kroje je poměrně mladá, asi z 60. let 20. století a charakterizuje ji bohatá výzdoba. Tato verze kroje byla převážně používána na nedělní mše svaté. O svátcích, pouti, hodech či svatbách však byla používána mírně zdobnější verze doplněna o mašli a košili s širokými šringlovanými rukávy. Kroj se skládá z košile, modré vesty kordule, soukenných kalhot zvaných nohavice, vysokých kožených bot zvaných čižmy, šátku na boku a klobouku s kohoutím peřím kosárkem. Peří a šátek označují svobodného muže.',
        parts: [
            {
                partID: 'part_18de65c8-75f9-4120-946c-eac9e8a66711_3',
                name: 'Kordula',
                path: '/models/a3906112-8d35-4b45-897e-8ab2e5685d39-kordula3.glb',
            },
        ],
        images: [
            {
                imageID: 'image_18de65c8-75f9-4120-946c-eac9e8a66711_0',
                name: 'Nedělní kroj',
                path: '/images/5d60a609-178e-4e6a-b3fb-bb67d1cef811-1.jpg',
            },
        ],
    }
    let lastCostumePartsModels: Model3D[] = useCostumePartsModels(costume);
    expect(lastCostumePartsModels.length).toEqual(1);
  });
});
