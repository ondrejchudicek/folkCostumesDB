import { useActiveCostume } from "../CostumeContext.tsx";
import {
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import MenuTrigger from "./MenuTrigger.tsx";

function RightMenuMain() {
  return (
    <div className={`h-full w-full bg-(--bg) rounded-(--corner-radius)`}></div>
  );
}

function Button({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full flex justify-center items-center text-center p-(--global-padding) bg-(--bg) rounded-(--corner-radius) text-(--font-col) text-base font-(family-name:--default-font)">
      {children}
    </div>
  );
}

function RightMenuButtons() {
  return (
    <div
      className={`h-full w-full flex flex-row justify-between gap-x-(--global-padding)`}
    >
      <Button>Reset Camera</Button>
      <Button>Upload Costume</Button>
      <Button>About</Button>
    </div>
  );
}

export default function RightMenu({
  isMobileLayout,
  isAnyMenuOpen,
  setIsAnyMenuOpen,
}: {
  isMobileLayout: boolean;
  isAnyMenuOpen: boolean;
  setIsAnyMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeCostume } = useActiveCostume();
  const manageMenuOpen = (b: boolean) => {
    setIsMenuOpen(b);
    setIsAnyMenuOpen(b);
  };

  const visibility = isMenuOpen ? "opacity-100" : "opacity-0";

  return (
    <>
      <div
        className={`h-full min-h-0 w-full relative grid grid-rows-[1fr_5rem] gap-y-(--global-padding) ${isMobileLayout ? "col-start-1 row-start-1 pointer-events-none" : "col-start-3 pointer-events-auto"} transition-opacity duration-300 ${visibility}`}
        onMouseEnter={() => !isMobileLayout && manageMenuOpen(true)}
        onMouseLeave={() => !isMobileLayout && manageMenuOpen(false)}
      >
        <RightMenuMain />
        <RightMenuButtons />
      </div>
      <MenuTrigger
        text="Left Menu"
        position="bottom-(--global-padding) right-(--global-padding)"
        isMobileLayout={isMobileLayout}
        isMenuOpen={isMenuOpen}
        isAnyMenuOpen={isAnyMenuOpen}
        handleClick={() => isMobileLayout && manageMenuOpen(true)}
      />
    </>
  );
}
