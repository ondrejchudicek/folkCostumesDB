import { render, screen } from '@testing-library/react';
import CloseButton from '../../components/CloseButton';

it('Should render CloseButton', () => {
  render(
    <CloseButton
      handleClick={() => {
        return;
      }}
    ></CloseButton>,
  );

  expect(screen.getByRole('button')).toBeInTheDocument();
});
