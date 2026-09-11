export default function MenuTrigger({
  text,
  position,
  isMobileLayout,
  isMenuOpen,
  isAnyMenuOpen,
  handleClick,
}: {
  text: string;
  position: string;
  isMobileLayout: boolean;
  isMenuOpen: boolean;
  isAnyMenuOpen: boolean;
  handleClick?: () => void;
}) {
  const visibility =
    isMenuOpen || (isMobileLayout && isAnyMenuOpen)
      ? "opacity-0 pointer-events-none"
      : "opacity-100 pointer-events-auto";

  return (
    <div
      className={`z-19 h-12 w-35 absolute ${position} flex justify-center items-center text-center bg-(--bg) rounded-(--corner-radius) text-(--font-col) text-xl text-center font-(family-name:--main-font) transition-opacity duration-300 ${visibility}`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
}
