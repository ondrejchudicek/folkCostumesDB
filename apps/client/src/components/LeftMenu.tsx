import { useActiveCostume } from '../CostumeContext.tsx';
import MenuTrigger from './MenuTrigger.tsx';
import type { OpenElements } from '../types.ts';
import CloseButton from './CloseButton.tsx';

function Title({
  text,
  isMobileLayout,
  closeLeftMenu,
}: {
  text: string;
  isMobileLayout: boolean;
  closeLeftMenu: () => void;
}) {
  return (
    <div
      className={`h-full w-full bg-(--bg) flex items-center justify-around text-(--font-col) text-3xl text-center font-(family-name:--title-font) rounded-(--corner-radius) p-(--global-padding)`}
    >
      {text}
      {isMobileLayout && <CloseButton handleClick={closeLeftMenu} />}
    </div>
  );
}

function Description({
  text,
  isLeftMenuOpen,
  isMobileLayout,
}: {
  text: string;
  isLeftMenuOpen: boolean;
  isMobileLayout: boolean;
}) {
  const visibility =
    isLeftMenuOpen || isMobileLayout ? 'opacity-100' : 'opacity-0';

  return (
    <div
      className={`h-full min-h-0 w-full bg-(--bg) rounded-(--corner-radius) p-(--global-padding) transition-opacity duration-300 ${visibility}`}
    >
      <div className="h-full w-full overflow-y-auto scrollbar-none text-(--font-col) text-xl font-(family-name:--default-font)">
        {text}
      </div>
    </div>
  );
}

export default function LeftMenu({
  isMobileLayout,
  areOpenElements,
  openLeftMenu,
  closeLeftMenu,
}: {
  isMobileLayout: boolean;
  areOpenElements: OpenElements;
  openLeftMenu: () => void;
  closeLeftMenu: () => void;
}) {
  const { activeCostume } = useActiveCostume();
  const layout = isMobileLayout
    ? 'col-start-1 row-start-1'
    : 'col-start-1 pointer-events-auto';
  const visibility =
    isMobileLayout && !areOpenElements.leftMenuOpen
      ? 'opacity-0'
      : 'opacity-100';
  const pointer =
    isMobileLayout && !areOpenElements.leftMenuOpen
      ? 'pointer-events-none'
      : 'pointer-events-auto';

  return (
    <>
      <div
        className={`h-full min-h-0 w-full relative grid grid-rows-[10rem_1fr] gap-y-(--global-padding) transition-opacity duration-300 ${layout} ${visibility} ${pointer}`}
        onMouseEnter={() => !isMobileLayout && openLeftMenu()}
        onMouseLeave={() => !isMobileLayout && closeLeftMenu()}
      >
        <Title
          text={activeCostume.costume.name}
          isMobileLayout={isMobileLayout}
          closeLeftMenu={closeLeftMenu}
        />
        <Description
          text={activeCostume.costume.description}
          isLeftMenuOpen={areOpenElements.leftMenuOpen}
          isMobileLayout={isMobileLayout}
        />
      </div>
      <MenuTrigger
        text="Left Menu"
        position="bottom-(--global-padding) left-(--global-padding)"
        isTriggerOpen={areOpenElements.leftTriggerOpen}
        handleClick={() => isMobileLayout && openLeftMenu()}
      />
    </>
  );
}
