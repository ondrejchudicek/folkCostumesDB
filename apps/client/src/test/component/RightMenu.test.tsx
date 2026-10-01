import { render, screen } from '@testing-library/react';
import RightMenu from '../../components/RightMenu';
import userEvent from '@testing-library/user-event';
import {
  ActiveCostumeContext,
  AvailableCostumesContext,
  OpenFullScreenImageContext,
} from '../../Contexts';
import { useState } from 'react';
import type {
  ActiveCostume,
  AvailableCostumes,
  FullScreenImageInfo,
  rightMenuButtonsOnClicks,
} from '../../types';
import {
  closeRightMenu,
  openFullScreenImage,
  openRightMenu,
} from '../../utils/manageOpenComponents';

const rightMenuButtonsOnClicks: rightMenuButtonsOnClicks = {
  about: vi.fn(),
  upload: vi.fn(),
  resetCamera: vi.fn(),
};

function ContextWrapper({
  isMobileLayout,
  startOpen = false,
}: {
  isMobileLayout: boolean;
  startOpen?: boolean;
}) {
  const avC: AvailableCostumes = [
    {
      costumeID: '18de65c8-75f9-4120-946c-eac9e8a66711',
      name: 'Kněždubský mužský nedělní kroj',
      description:
        'I když dokumentovaná historie kněždubského kroje sahá do 18. století, v průběhu let se výrazně vyvíjel. Ať už díky lepší dostupnosti materiálů, vývoji průmyslu, bohatnutí obyvatelstva i změně preferencí vesničanů na jeho vzhled a snaze odlišit se od ostatních vesnic. Dnešní podoba kroje je poměrně mladá, asi z 60. let 20. století a charakterizuje ji bohatá výzdoba. Tato verze kroje byla převážně používána na nedělní mše svaté. O svátcích, pouti, hodech či svatbách však byla používána mírně zdobnější verze doplněna o mašli a košili s širokými šringlovanými rukávy. Kroj se skládá z košile, modré vesty kordule, soukenných kalhot zvaných nohavice, vysokých kožených bot zvaných čižmy, šátku na boku a klobouku s kohoutím peřím kosárkem. Peří a šátek označují svobodného muže.',
      parts: [
        {
          partID: 'part_18de65c8-75f9-4120-946c-eac9e8a66711_0',
          name: 'Čižmy',
          path: '/models/19aa583e-8c75-4d48-b4f6-372685178f55-boty2.glb',
        },
        {
          partID: 'part_18de65c8-75f9-4120-946c-eac9e8a66711_1',
          name: 'Nohavice',
          path: '/models/cec8dcf6-2fa2-426c-9840-43523f641e54-gate2.glb',
        },
        {
          partID: 'part_18de65c8-75f9-4120-946c-eac9e8a66711_2',
          name: 'Klobúk',
          path: '/models/5d34007c-bb74-494e-8022-d4f4d9f19ed8-klobuk.glb',
        },
        {
          partID: 'part_18de65c8-75f9-4120-946c-eac9e8a66711_3',
          name: 'Kordula',
          path: '/models/a3906112-8d35-4b45-897e-8ab2e5685d39-kordula3.glb',
        },
        {
          partID: 'part_18de65c8-75f9-4120-946c-eac9e8a66711_4',
          name: 'Košela',
          path: '/models/03e0a448-fd59-450c-8d56-40e97a986c91-kosela3.glb',
        },
        {
          partID: 'part_18de65c8-75f9-4120-946c-eac9e8a66711_5',
          name: 'Šátek',
          path: '/models/6db672b4-eb4a-43a8-acc3-442012629129-satek2.glb',
        },
      ],
      images: [
        {
          imageID: 'image_18de65c8-75f9-4120-946c-eac9e8a66711_0',
          name: 'Nedělní kroj',
          path: '/images/5d60a609-178e-4e6a-b3fb-bb67d1cef811-1.jpg',
        },
        {
          imageID: 'image_18de65c8-75f9-4120-946c-eac9e8a66711_1',
          name: 'Kordula',
          path: '/images/072fb165-9390-48bb-bddf-363f8c287e8d-2.jpg',
        },
        {
          imageID: 'image_18de65c8-75f9-4120-946c-eac9e8a66711_2',
          name: 'Vyšívání na kordule',
          path: '/images/7964ed96-e5e6-4b76-b82f-98f64eb01ec6-3.jpg',
        },
        {
          imageID: 'image_18de65c8-75f9-4120-946c-eac9e8a66711_3',
          name: 'Vyšívaná košela',
          path: '/images/b3ee0be2-2160-4cea-ad51-573023b2518e-4.jpg',
        },
        {
          imageID: 'image_18de65c8-75f9-4120-946c-eac9e8a66711_4',
          name: 'Súkené nohavice',
          path: '/images/a00ab324-fd98-413f-bb8c-b9c9c11c6541-5.jpg',
        },
        {
          imageID: 'image_18de65c8-75f9-4120-946c-eac9e8a66711_5',
          name: 'Šátek',
          path: '/images/a0b1c774-9edc-48d4-9174-f34d8cd3d939-6.jpg',
        },
        {
          imageID: 'image_18de65c8-75f9-4120-946c-eac9e8a66711_6',
          name: 'Kožené čižmy',
          path: '/images/1dfe973c-8273-4bfe-b8a0-c89424e10aaf-7.jpg',
        },
        {
          imageID: 'image_18de65c8-75f9-4120-946c-eac9e8a66711_7',
          name: 'Klobúk s kosárkem',
          path: '/images/486b8532-734d-4e6b-b3d6-e68a0bede7a3-8.jpg',
        },
        {
          imageID: 'image_18de65c8-75f9-4120-946c-eac9e8a66711_8',
          name: 'Na lúkách',
          path: '/images/688b5897-2ba8-4c6c-a7bd-153a398a0cd4-9.jpg',
        },
      ],
    },
    {
      costumeID: '088a1718-70c2-421e-b151-1121115a8e3d',
      name: 'Kněždubský ženský nedělní kroj',
      description:
        'Placeholder pro lepší scan, pro ukázku funkčnosti s více modely.',
      parts: [
        {
          partID: 'part_088a1718-70c2-421e-b151-1121115a8e3d_0',
          name: 'Kroj',
          path: '/models/66f2cb99-b1b4-4ac8-a259-b3dec91147a6-teta_exp.glb',
        },
      ],
      images: [
        {
          imageID: 'image_088a1718-70c2-421e-b151-1121115a8e3d_0',
          name: 'Nedělní kroj',
          path: '/images/f1a2785e-8855-4e63-9d4f-aeeb17513e90-IMG_5674.jpg',
        },
        {
          imageID: 'image_088a1718-70c2-421e-b151-1121115a8e3d_1',
          name: 'Fěrtúšek',
          path: '/images/8b10d771-abd9-4d89-a480-7c8c9df6d7eb-IMG_5678.jpg',
        },
        {
          imageID: 'image_088a1718-70c2-421e-b151-1121115a8e3d_2',
          name: 'Jupka',
          path: '/images/a0ef0ac3-ceb1-48c8-9849-305de3fa2262-IMG_5679.jpg',
        },
        {
          imageID: 'image_088a1718-70c2-421e-b151-1121115a8e3d_3',
          name: 'Šátek',
          path: '/images/9a491578-26be-44de-9702-6e7ca68de23e-IMG_5681.jpg',
        },
      ],
    },
  ];

  const initialActiveCostume: ActiveCostume = {
    costume: avC[0],
    partToggles: avC[0].parts.map((part) => ({
      isActive: true,
      partID: part.partID,
    })),
  };

  const [activeCostume, setActiveCostume] = useState(initialActiveCostume);
  const [areOpenElements, setAreOpenElements] = useState({
    leftMenuOpen: startOpen,
    rightMenuOpen: false,
    leftTriggerOpen: !startOpen,
    rightTriggerOpen: true,
    aboutOpen: false,
    uploadFormOpen: false,
    fullScreenImageOpen: false,
  });
  const setFullScreenImageInfo = vi.fn();

  return (
    <AvailableCostumesContext.Provider value={{ availableCostumes: avC }}>
      <ActiveCostumeContext.Provider
        value={{ activeCostume, setActiveCostume }}
      >
        <OpenFullScreenImageContext.Provider
          value={{
            openAndSetFullScreenImage(
              fullScreenImageInfo: FullScreenImageInfo,
            ) {
              openFullScreenImage(areOpenElements, setAreOpenElements);
              setFullScreenImageInfo(fullScreenImageInfo);
            },
          }}
        >
          <RightMenu
            isMobileLayout={isMobileLayout}
            areOpenElements={areOpenElements}
            openRightMenu={() =>
              openRightMenu(areOpenElements, setAreOpenElements, isMobileLayout)
            }
            closeRightMenu={() =>
              closeRightMenu(areOpenElements, setAreOpenElements)
            }
            rightMenuButtonsOnClicks={rightMenuButtonsOnClicks}
          />
        </OpenFullScreenImageContext.Provider>
      </ActiveCostumeContext.Provider>
    </AvailableCostumesContext.Provider>
  );
}

it('renders RightMenu', () => {
  render(<ContextWrapper isMobileLayout={false} startOpen={true} />);

  expect(screen.getByText('Fotky')).toBeVisible();
  expect(screen.getByAltText('Nedělní kroj')).toBeVisible();
  expect(screen.getByAltText('Na lúkách')).toBeVisible();
  expect(screen.getByText('Resetovat kameru')).toBeVisible();
  expect(screen.getByText('Nahrát kroj')).toBeVisible();
  expect(screen.getByText('O aplikaci')).toBeVisible();
});

it('RightMenu interacts on hover', async () => {
  const user = userEvent.setup();

  render(<ContextWrapper isMobileLayout={false} />);
  const rightMenu =
    screen.getByText('Fotky').parentElement?.parentElement?.parentElement;

  expect(rightMenu).toHaveClass('opacity-0');
  expect(screen.getByText('Menu')).toHaveClass('opacity-100');

  await user.hover(screen.getByText('Fotky'));

  expect(rightMenu).toHaveClass('opacity-100');
  expect(screen.getByText('Menu')).toHaveClass('opacity-0');

  await user.unhover(screen.getByText('Fotky'));

  expect(rightMenu).toHaveClass('opacity-0');
  expect(screen.getByText('Menu')).toHaveClass('opacity-100');
});

it('RightMenu interacts on mobile', async () => {
  const user = userEvent.setup();

  render(<ContextWrapper isMobileLayout={true} />);
  const rightMenu =
    screen.getByText('Fotky').parentElement?.parentElement?.parentElement;

  expect(rightMenu).toHaveClass('opacity-0');
  expect(screen.getByText('Menu')).toHaveClass('opacity-100');

  await user.click(screen.getByText('Menu'));

  expect(rightMenu).toHaveClass('opacity-100');
  expect(screen.getByText('Menu')).toHaveClass('opacity-0');

  await user.click(screen.getAllByRole('button')[3]);

  expect(rightMenu).toHaveClass('opacity-0');
  expect(screen.getByText('Menu')).toHaveClass('opacity-100');
});

it('RightMenu section interactions', async () => {
  const user = userEvent.setup();

  render(<ContextWrapper isMobileLayout={true} startOpen={true} />);

  expect(screen.getByAltText('Nedělní kroj')).toBeVisible();
  expect(screen.getByAltText('Na lúkách')).toBeVisible();

  await user.click(screen.getByText('Části'));

  expect(screen.getByText('Čižmy')).toBeVisible();
  expect(screen.getByText('Šátek')).toBeVisible();

  await user.click(screen.getByText('Kroje'));

  expect(screen.getByText('Kněždubský mužský nedělní kroj')).toBeVisible();
  expect(screen.getByText('Kněždubský ženský nedělní kroj')).toBeVisible();

  await user.click(screen.getByText('Kněždubský ženský nedělní kroj'));
  await user.click(screen.getByText('Části'));

  expect(screen.getByText('Kroj')).toBeVisible();

  await user.click(screen.getByText('Fotky'));

  expect(screen.getByAltText('Nedělní kroj')).toBeVisible();
  expect(screen.getByAltText('Šátek')).toBeVisible();

  await user.click(screen.getByText('Resetovat kameru'));
  await user.click(screen.getByText('Nahrát kroj'));
  await user.click(screen.getByText('O aplikaci'));

  expect(rightMenuButtonsOnClicks.resetCamera).toHaveBeenCalledTimes(1);
  expect(rightMenuButtonsOnClicks.upload).toHaveBeenCalledTimes(1);
  expect(rightMenuButtonsOnClicks.about).toHaveBeenCalledTimes(1);
});
