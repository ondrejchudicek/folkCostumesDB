import { render, screen } from '@testing-library/react';
import LeftMenu from '../../components/LeftMenu';
import userEvent from '@testing-library/user-event';
import { ActiveCostumeContext } from '../../Contexts';
import { useState } from 'react';
import type { ActiveCostume, Costume } from '../../types';
import { closeLeftMenu, openLeftMenu } from '../../utils/manageOpenComponents';

function ContextWrapper({
  isMobileLayout,
  startOpen = false,
}: {
  isMobileLayout: boolean;
  startOpen?: boolean;
}) {
  const costume: Costume = {
    costumeID: 1,
    name: 'Kněždubský mužský nedělní kroj',
    description:
      'I když dokumentovaná historie kněždubského kroje sahá do 18. století, v průběhu let se výrazně vyvíjel. Ať už díky lepší dostupnosti materiálů, vývoji průmyslu, bohatnutí obyvatelstva i změně preferencí vesničanů na jeho vzhled a snaze odlišit se od ostatních vesnic. Dnešní podoba kroje je poměrně mladá, asi z 60. let 20. století a charakterizuje ji bohatá výzdoba. Tato verze kroje byla převážně používána na nedělní mše svaté. O svátcích, pouti, hodech či svatbách však byla používána mírně zdobnější verze doplněna o mašli a košili s širokými šringlovanými rukávy. Kroj se skládá z košile, modré vesty kordule, soukenných kalhot zvaných nohavice, vysokých kožených bot zvaných čižmy, šátku na boku a klobouku s kohoutím peřím kosárkem. Peří a šátek označují svobodného muže.',
    thumbnailImageID: null,
  };

  const initialActiveCostume: ActiveCostume = {
    costume: costume,
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
  });

  return (
    <ActiveCostumeContext.Provider value={{ activeCostume, setActiveCostume }}>
      <LeftMenu
        isMobileLayout={isMobileLayout}
        areOpenElements={areOpenElements}
        openLeftMenu={() =>
          openLeftMenu(areOpenElements, setAreOpenElements, isMobileLayout)
        }
        closeLeftMenu={() => closeLeftMenu(areOpenElements, setAreOpenElements)}
      />
    </ActiveCostumeContext.Provider>
  );
}

it('renders LeftMenu', () => {
  render(<ContextWrapper isMobileLayout={false} startOpen={true} />);

  expect(screen.getByText('Kněždubský mužský nedělní kroj')).toBeVisible();
  expect(
    screen.getByText(/^I když dokumentovaná historie/u).parentElement,
  ).toHaveClass('opacity-100');
});

it('LeftMenu interacts on hover', async () => {
  const user = userEvent.setup();

  render(<ContextWrapper isMobileLayout={false} />);

  expect(screen.getByText('Kněždubský mužský nedělní kroj')).toBeVisible();
  expect(
    screen.getByText(/^I když dokumentovaná historie/u).parentElement,
  ).toHaveClass('opacity-0');
  expect(screen.getByText('Popis')).toHaveClass('opacity-100');

  await user.hover(screen.getByText(/^I když dokumentovaná historie/u));

  expect(
    screen.getByText(/^I když dokumentovaná historie/u).parentElement,
  ).toHaveClass('opacity-100');
  expect(screen.getByText('Popis')).toHaveClass('opacity-0');

  await user.unhover(screen.getByText(/^I když dokumentovaná historie/u));

  expect(
    screen.getByText(/^I když dokumentovaná historie/u).parentElement,
  ).toHaveClass('opacity-0');
  expect(screen.getByText('Popis')).toHaveClass('opacity-100');
});

it('LeftMenu interacts on mobile', async () => {
  const user = userEvent.setup();

  render(<ContextWrapper isMobileLayout={true} />);

  expect(
    screen.getByText('Kněždubský mužský nedělní kroj').parentElement,
  ).toHaveClass('opacity-0');
  expect(screen.getByText('Popis')).toHaveClass('opacity-100');

  await user.click(screen.getByText('Popis'));

  expect(
    screen.getByText('Kněždubský mužský nedělní kroj').parentElement,
  ).toHaveClass('opacity-100');
  expect(
    screen.getByText(/^I když dokumentovaná historie/u).parentElement,
  ).toHaveClass('opacity-100');
  expect(screen.getByText('Popis')).toHaveClass('opacity-0');

  await user.click(screen.getByAltText('Close'));

  expect(
    screen.getByText('Kněždubský mužský nedělní kroj').parentElement,
  ).toHaveClass('opacity-0');
  expect(screen.getByText('Popis')).toHaveClass('opacity-100');
});
