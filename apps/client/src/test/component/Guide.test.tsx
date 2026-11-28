import { render, screen } from '@testing-library/react';
import Guide from '../../components/Guide';
import { guideText } from '../../resources/guideText';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';

it('render Guide', () => {
  render(<Guide isMobileLayout={false} isOpen={true} closeGuide={() => {}} />);

  expect(screen.getByText(guideText[0].title)).toBeVisible();
  expect(
    screen.getByText(new RegExp(`^${guideText[0].text.slice(0, 10)}.*$`, 'u')),
  ).toBeVisible();
  expect(screen.getByAltText(guideText[0].imageName)).toBeVisible();
});

it('render Guide on mobile', () => {
  render(<Guide isMobileLayout={true} isOpen={true} closeGuide={() => {}} />);

  expect(screen.getByText(guideText[0].title)).toBeVisible();
  expect(
    screen.getByText(new RegExp(`^${guideText[0].text.slice(0, 10)}.*$`, 'u')),
  ).toBeVisible();
  expect(screen.getByAltText(guideText[0].imageName)).toBeVisible();
});

it('Guide buttons work', async () => {
  const user = userEvent.setup();

  function GuideWrapper() {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <Guide
        isMobileLayout={false}
        isOpen={isOpen}
        closeGuide={() => setIsOpen(false)}
      />
    );
  }

  render(<GuideWrapper />);

  expect(screen.getByText(guideText[0].title)).toBeVisible();
  expect(
    screen.getByText(new RegExp(`^${guideText[0].text.slice(0, 10)}.*$`, 'u')),
  ).toBeVisible();
  expect(screen.getByAltText(guideText[0].imageName)).toBeVisible();

  await user.click(screen.getByAltText('Next Page'));

  expect(screen.getByText(guideText[1].title)).toBeVisible();
  expect(
    screen.getByText(new RegExp(`^${guideText[1].text.slice(0, 10)}.*$`, 'u')),
  ).toBeVisible();
  expect(screen.getByAltText(guideText[1].imageName)).toBeVisible();

  await user.click(screen.getByAltText('Close'));

  expect(
    screen.getByText(new RegExp(`^${guideText[1].text.slice(0, 10)}.*$`, 'u'))
      .parentElement?.parentElement?.parentElement?.parentElement,
  ).toHaveClass('opacity-0');
});
