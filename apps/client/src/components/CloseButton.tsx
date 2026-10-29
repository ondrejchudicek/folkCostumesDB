export default function CloseButton({
  handleClick,
  tailwind = '',
}: {
  handleClick: () => void;
  tailwind?: string | null;
}) {
  return (
    <img
      src="cross.svg"
      alt="Close"
      className={`h-6 w-6 ${tailwind}`}
      onClick={handleClick}
    ></img>
  );
}
