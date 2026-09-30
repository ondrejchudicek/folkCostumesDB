import type { FullScreenImageInfo } from '../types';
import CloseButton from './CloseButton';

export default function FullScreenImage({
  isOpen,
  fullScreenImageInfo,
  closeFullScreenImage,
  next,
  prev,
}: {
  isOpen: boolean;
  fullScreenImageInfo: FullScreenImageInfo;
  closeFullScreenImage: () => void;
  next: () => void;
  prev: () => void;
}) {
  const visibility = isOpen
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none';

  return (
    <div
      className={`z-21 h-full w-full fixed left-0 top-0 bg-green-700 flex justify-center align-center ${visibility}`}
    >
      <div className="z-22 absolute left-(--global-padding) top-(--global-padding) font-(family-name:--title-font) text-3xl text-(--font-col)">
        {fullScreenImageInfo.title}
      </div>
      <CloseButton
        tailwind={
          'z-22 absolute right-(--global-padding) top-(--global-padding)'
        }
        handleClick={closeFullScreenImage}
      />
      <button
        className="z-22 h-20 w-10 absolute left-(--global-padding) top-[50%] -translate-y-1/2 bg-red-600"
        onClick={prev}
      />
      <button
        className="z-22 h-20 w-10 absolute right-(--global-padding) top-[50%] -translate-y-1/2 bg-red-600"
        onClick={next}
      />
      {fullScreenImageInfo.src && (
        <img
          className="h-auto w-auto object-contain block"
          src={fullScreenImageInfo.src}
          alt={fullScreenImageInfo.title}
        />
      )}
    </div>
  );
}
