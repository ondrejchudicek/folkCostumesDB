import { render, screen } from '@testing-library/react';
import About from '../../components/About.tsx';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import type { OpenElements } from '../../types.ts';

it('renders About panel', () => {
  const areOpenElements = {
    leftMenuOpen: false,
    rightMenuOpen: false,
    leftTriggerOpen: true,
    rightTriggerOpen: true,
    aboutOpen: true,
    uploadFormOpen: false,
    fullScreenImageOpen: false,
  };

  render(
    <About
      areOpenElements={areOpenElements}
      isMobileLayout={false}
      closeAbout={vi.fn()}
    />,
  );

  expect(screen.getByText('O aplikaci')).toBeVisible();
});

it('close About panel', async () => {
  function AboutWrapper() {
    const [areOpenElements, setAreOpenElements] = useState<OpenElements>({
      leftMenuOpen: false,
      rightMenuOpen: false,
      leftTriggerOpen: true,
      rightTriggerOpen: true,
      aboutOpen: true,
      uploadFormOpen: false,
      fullScreenImageOpen: false,
    });

    function closeAbout() {
      const o = { ...areOpenElements };
      o.aboutOpen = false;
      setAreOpenElements(o);
    }

    return (
      <About
        areOpenElements={areOpenElements}
        isMobileLayout={false}
        closeAbout={closeAbout}
      ></About>
    );
  }

  const user = userEvent.setup();

  render(<AboutWrapper />);

  expect(screen.getByText('O aplikaci').parentElement).toHaveClass(
    'opacity-100',
  );
  await user.click(screen.getByRole('button'));
  expect(screen.getByText('O aplikaci').parentElement).toHaveClass('opacity-0');
});
