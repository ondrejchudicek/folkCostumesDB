import { useActiveCostume } from "../CostumeContext.tsx";
import { type ReactNode } from "react";

function RightMenuMain() {
  return (
    <div className="h-full w-full bg-(--bg) rounded-(--corner-radius)"></div>
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
    <div className="h-full w-full flex flex-row justify-between gap-x-(--global-padding)">
      <Button>Reset Camera</Button>
      <Button>Upload Costume</Button>
      <Button>About</Button>
    </div>
  );
}

export default function RightMenu({
  isMobileLayout,
}: {
  isMobileLayout: boolean;
}) {
  const { activeCostume } = useActiveCostume();

  return (
    <div
      className={`h-full min-h-0 w-full grid grid-rows-[1fr_5rem] gap-y-(--global-padding) opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-auto ${isMobileLayout ? "col-start-1" : "col-start-3"}`}
    >
      <RightMenuMain />
      <RightMenuButtons />
    </div>
  );
}
