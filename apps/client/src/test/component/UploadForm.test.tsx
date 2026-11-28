import { render, screen } from '@testing-library/react';
import UploadForm from '../../components/UploadForm';
import {
  ActiveCostumeContext,
  PreviewContext,
  SetIsLoadingContext,
} from '../../Contexts';
import type { ActiveCostume, AvailableCostumes } from '../../types';

const avC: AvailableCostumes = [
  {
    costumeID: 1,
    name: 'Kněždubský mužský nedělní kroj',
    description:
      'I když dokumentovaná historie kněždubského kroje sahá do 18. století, v průběhu let se výrazně vyvíjel. Ať už díky lepší dostupnosti materiálů, vývoji průmyslu, bohatnutí obyvatelstva i změně preferencí vesničanů na jeho vzhled a snaze odlišit se od ostatních vesnic. Dnešní podoba kroje je poměrně mladá, asi z 60. let 20. století a charakterizuje ji bohatá výzdoba. Tato verze kroje byla převážně používána na nedělní mše svaté. O svátcích, pouti, hodech či svatbách však byla používána mírně zdobnější verze doplněna o mašli a košili s širokými šringlovanými rukávy. Kroj se skládá z košile, modré vesty kordule, soukenných kalhot zvaných nohavice, vysokých kožených bot zvaných čižmy, šátku na boku a klobouku s kohoutím peřím kosárkem. Peří a šátek označují svobodného muže.',
    thumbnailImageID: null,
  },
  {
    costumeID: 2,
    name: 'Kněždubský ženský nedělní kroj',
    description:
      'Placeholder pro lepší scan, pro ukázku funkčnosti s více modely.',
    thumbnailImageID: null,
  },
];

const initialActiveCostume: ActiveCostume = {
  costume: avC[0],
  partToggles: [
    { isActive: true, partID: 1 },
    { isActive: true, partID: 2 },
  ],
  parts: [
    { partID: 1, name: 'Čižmy' },
    { partID: 2, name: 'Šátek' },
  ],
  images: [],
};

it('renders Upload Form', () => {
  function UploadFormContextWrapper() {
    const setIsLoading = vi.fn();

    return (
      <ActiveCostumeContext
        value={{
          activeCostume: initialActiveCostume,
          setActiveCostume: vi.fn(),
        }}
      >
        <SetIsLoadingContext.Provider value={setIsLoading}>
          <PreviewContext.Provider
            value={{
              preview: { previewParts: null, reloadPreview: false, paths: [] },
              setPreview: vi.fn(),
            }}
          >
            <UploadForm
              isOpen={true}
              closeUploadForm={vi.fn()}
              isMobileLayout={false}
              openGuide={vi.fn()}
              openStatus={vi.fn()}
              closeStatus={vi.fn()}
              setStatus={vi.fn()}
            />
          </PreviewContext.Provider>
        </SetIsLoadingContext.Provider>
      </ActiveCostumeContext>
    );
  }
  render(<UploadFormContextWrapper />);

  expect(screen.getByText('Nový kroj')).toBeVisible();
  expect(screen.getByText('Nahrát obrázky')).toBeVisible();
  expect(screen.getByText('Nahrát modely')).toBeVisible();
});
