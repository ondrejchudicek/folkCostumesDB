import { render, screen } from '@testing-library/react';
import LeftMenu from '../../components/LeftMenu';
import userEvent from '@testing-library/user-event';
import { ActiveCostumeContext } from '../../Contexts';
import { useState } from 'react';
import type { ActiveCostume, Costume } from '../../types';
import { closeLeftMenu, openLeftMenu } from '../../utils/manageOpenComponents';

const costume: Costume = {
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
};

const initialActiveCostume: ActiveCostume = {
  costume,
  partToggles: costume.parts.map((part) => ({
    isActive: true,
    partID: part.partID,
  })),
};

it('renders LeftMenu', () => {
  const areOpenElements = {
    leftMenuOpen: true,
    rightMenuOpen: false,
    leftTriggerOpen: false,
    rightTriggerOpen: true,
    aboutOpen: false,
    uploadFormOpen: false,
    fullScreenImageOpen: false,
  };

  function ContextWrapper() {
    const [activeCostume, setActiveCostume] = useState(initialActiveCostume);

    return (
      <ActiveCostumeContext.Provider
        value={{ activeCostume, setActiveCostume }}
      >
        <LeftMenu
          isMobileLayout={false}
          areOpenElements={areOpenElements}
          openLeftMenu={vi.fn()}
          closeLeftMenu={vi.fn()}
        />
      </ActiveCostumeContext.Provider>
    );
  }

  render(<ContextWrapper />);

  expect(screen.getByText('Kněždubský mužský nedělní kroj')).toBeVisible();
  expect(
    screen.getByText(/^I když dokumentovaná historie/u).parentElement,
  ).toHaveClass('opacity-100');
});

it('LeftMenu interacts on hover', async () => {
  const user = userEvent.setup();
  const openElements = {
    leftMenuOpen: false,
    rightMenuOpen: false,
    leftTriggerOpen: true,
    rightTriggerOpen: true,
    aboutOpen: false,
    uploadFormOpen: false,
    fullScreenImageOpen: false,
  };

  function ContextWrapper() {
    const [activeCostume, setActiveCostume] = useState(initialActiveCostume);
    const [areOpenElements, setAreOpenElements] = useState(openElements);

    return (
      <ActiveCostumeContext.Provider
        value={{ activeCostume, setActiveCostume }}
      >
        <LeftMenu
          isMobileLayout={false}
          areOpenElements={areOpenElements}
          openLeftMenu={() =>
            openLeftMenu(areOpenElements, setAreOpenElements, false)
          }
          closeLeftMenu={() =>
            closeLeftMenu(areOpenElements, setAreOpenElements)
          }
        />
      </ActiveCostumeContext.Provider>
    );
  }

  render(<ContextWrapper />);

  expect(screen.getByText('Kněždubský mužský nedělní kroj')).toBeVisible();
  expect(
    screen.getByText(/^I když dokumentovaná historie/u).parentElement,
  ).toHaveClass('opacity-0');
  expect(screen.getByText('Left Menu')).toHaveClass('opacity-100');

  await user.hover(screen.getByText(/^I když dokumentovaná historie/u));

  expect(
    screen.getByText(/^I když dokumentovaná historie/u).parentElement,
  ).toHaveClass('opacity-100');
  expect(screen.getByText('Left Menu')).toHaveClass('opacity-0');

  await user.unhover(screen.getByText(/^I když dokumentovaná historie/u));

  expect(
    screen.getByText(/^I když dokumentovaná historie/u).parentElement,
  ).toHaveClass('opacity-0');
  expect(screen.getByText('Left Menu')).toHaveClass('opacity-100');
});
