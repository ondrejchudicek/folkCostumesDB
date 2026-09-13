export default function MenuTrigger({
  text,
  position,
  isTriggerOpen,
  handleClick,
}: {
  text: string;
  position: string;
  isTriggerOpen: boolean;
  handleClick?: () => void;
}) {
  const visibility = isTriggerOpen
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  return (
    <div
      className={`z-19 h-12 w-35 absolute ${position} flex justify-center items-center bg-(--bg) rounded-(--corner-radius) text-(--font-col) text-xl text-center font-(family-name:--main-font) transition-opacity duration-300 ${visibility}`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
}
