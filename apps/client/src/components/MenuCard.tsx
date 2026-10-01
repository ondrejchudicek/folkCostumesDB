import type { ReactNode } from 'react';

export default function MenuCard({
  handleClick,
  tailWind,
  key,
  children,
  image,
}: {
  handleClick: () => void;
  tailWind?: string;
  key: string;
  image?: ReactNode;
  children?: ReactNode;
}) {
  if (image)
    return (
      <div
        className={`h-40 w-full bg-(--bg) flex justify-center items-center gap-x-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) text-center font-(family-name:--default-font) text-xl overflow-hidden ${tailWind}`}
        key={key}
        onClick={handleClick}
      >
        {image}
        {children}
      </div>
    );
  return (
    <div
      className={`h-15 w-full bg-(--bg) flex justify-center items-center p-(--global-padding) rounded-(--corner-radius) text-center font-(family-name:--default-font) text-xl ${tailWind}`}
      key={key}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
