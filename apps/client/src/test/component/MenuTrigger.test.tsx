import { render, screen } from '@testing-library/react';
import MenuTrigger from '../../components/MenuTrigger';
import userEvent from '@testing-library/user-event';

it('renders MenuTrigger', () => {
  render(
    <MenuTrigger
      text="Popis"
      position="bottom-(--global-padding) left-(--global-padding)"
      isTriggerOpen={true}
      handleClick={vi.fn()}
    />,
  );

  expect(screen.getByText('Popis')).toBeVisible();
});

it('calls handleClick when clicked', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(
    <MenuTrigger
      text="Popis"
      position="bottom-(--global-padding) left-(--global-padding)"
      isTriggerOpen={true}
      handleClick={handleClick}
    />,
  );

  await user.click(screen.getByText('Popis'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
