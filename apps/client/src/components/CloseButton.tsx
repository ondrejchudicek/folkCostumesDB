export default function CloseButton({
  handleClick,
  tailwind = "",
}: {
  handleClick: () => void;
  tailwind?: string | null;
}) {
  return (
    <div
      className={`h-10 w-10 bg-red-500 ${tailwind}`}
      onClick={handleClick}
    ></div>
  );
}
