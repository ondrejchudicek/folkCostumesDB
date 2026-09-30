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
        className={`h-40 w-full bg-(--bg) flex justify-center items-center text-center overflow-hidden ${tailWind}`}
        key={key}
        onClick={handleClick}
      >
        {image}
        {children}
      </div>
    );
  return (
    <div
      className={`h-20 w-full bg-(--bg) flex justify-center items-center text-center ${tailWind}`}
      key={key}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
