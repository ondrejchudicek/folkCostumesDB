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

  const [activeCostume, setActiveCostume] = useState(initialActiveCostume);
  const [areOpenElements, setAreOpenElements] = useState({
    leftMenuOpen: startOpen,
    rightMenuOpen: false,
    leftTriggerOpen: !startOpen,
    rightTriggerOpen: true,
    aboutOpen: false,
    uploadFormOpen: false,
    fullScreenImageOpen: false,
    guideOpen: false,
    statusOpen: false,
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
  //expect(screen.getByAltText('Nedělní kroj')).toBeVisible();
  //expect(screen.getByAltText('Na lúkách')).toBeVisible();
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

  await user.click(screen.getByAltText('Close'));

  expect(rightMenu).toHaveClass('opacity-0');
  expect(screen.getByText('Menu')).toHaveClass('opacity-100');
});

it('RightMenu section interactions', async () => {
  const user = userEvent.setup();

  render(<ContextWrapper isMobileLayout={true} startOpen={true} />);

  // can't sim because DB requred to get images
  //expect(screen.getByAltText('Nedělní kroj')).toBeVisible();
  //expect(screen.getByAltText('Na lúkách')).toBeVisible();

  await user.click(screen.getByText('Části'));

  expect(screen.getByText('Čižmy')).toBeVisible();
  expect(screen.getByText('Šátek')).toBeVisible();

  await user.click(screen.getByText('Kroje'));

  expect(screen.getByText('Kněždubský mužský nedělní kroj')).toBeVisible();
  expect(screen.getByText('Kněždubský ženský nedělní kroj')).toBeVisible();

  // can't test because DB required for switching active costume
  /*await user.click(screen.getByText('Kněždubský ženský nedělní kroj'));
  await user.click(screen.getByText('Části'));

  expect(screen.getByText('Kroj')).toBeVisible();

  await user.click(screen.getByText('Fotky'));

  expect(screen.getByAltText('Nedělní kroj')).toBeVisible();
  expect(screen.getByAltText('Šátek')).toBeVisible();*/

  await user.click(screen.getByText('Resetovat kameru'));
  await user.click(screen.getByText('Nahrát kroj'));
  await user.click(screen.getByText('O aplikaci'));

  expect(rightMenuButtonsOnClicks.resetCamera).toHaveBeenCalledTimes(1);
  expect(rightMenuButtonsOnClicks.upload).toHaveBeenCalledTimes(1);
  expect(rightMenuButtonsOnClicks.about).toHaveBeenCalledTimes(1);
});
