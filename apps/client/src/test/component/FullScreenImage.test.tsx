import { render, screen } from '@testing-library/react';
import FullScreenImage from '../../components/FullScreenImage';
import type { FullScreenImageInfo } from '../../types';
import userEvent from '@testing-library/user-event';

const next = vi.fn();
const prev = vi.fn();
const close = vi.fn();

const images: FullScreenImageInfo[] = [
  {
    src: '../../public/images/1dfe973c-8273-4bfe-b8a0-c89424e10aaf-7.jpg',
    title: 'image1',
    prev: null,
    next: null,
  },
  {
    src: '../../public/images/5d60a609-178e-4e6a-b3fb-bb67d1cef811-1.jpg',
    title: 'image2',
    prev: null,
    next: null,
  },
];

it('renders Fullscreen Image panel', async () => {
  const user = userEvent.setup();

  render(
    <FullScreenImage
      isOpen={true}
      fullScreenImageInfo={images[0]}
      closeFullScreenImage={close}
      prev={prev}
      next={next}
    />,
  );

  expect(screen.getByText('image1')).toBeVisible();

  await user.click(screen.getByAltText('Close'));
  await user.click(screen.getByAltText('Left Arrow'));
  await user.click(screen.getByAltText('Right Arrow'));

  expect(next).toHaveBeenCalledOnce();
  expect(prev).toHaveBeenCalledOnce();
  expect(close).toHaveBeenCalledOnce();
});
