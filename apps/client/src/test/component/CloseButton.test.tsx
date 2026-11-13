import { render, screen } from '@testing-library/react';
import CloseButton from '../../components/CloseButton';
import userEvent from '@testing-library/user-event';

it('renders CloseButton', () => {
  render(<CloseButton handleClick={vi.fn()} />);

  expect(screen.getByAltText('Close')).toBeVisible();
});

it('calls handleClick when clicked', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<CloseButton handleClick={handleClick} />);

  await user.click(screen.getByAltText('Close'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
