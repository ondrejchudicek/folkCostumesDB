export default function CloseButton({
  handleClick,
  tailwind = '',
}: {
  handleClick: () => void;
  tailwind?: string | null;
}) {
  return (
    <button
      className={`h-10 w-10 bg-red-500 ${tailwind}`}
      onClick={handleClick}
    ></button>
  );
}
