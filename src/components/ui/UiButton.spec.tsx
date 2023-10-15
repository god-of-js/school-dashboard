import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import UiButton from './UiButton';

describe('src/components/ui/UiButton.tsx', () => {
    let buttonHasBeenClicked: boolean;

    function receiveData() {
      buttonHasBeenClicked = true;
    }

    beforeEach(() => {
      buttonHasBeenClicked = false;
    });

  it('UiButton handles click on parent', async () => {
    const buttonComponent = render(
      <UiButton onClick={receiveData}>Test Button</UiButton>,
    );

    const button = await buttonComponent.getByTestId('ui-button');

    fireEvent.click(button);
    expect(buttonHasBeenClicked).toBeTruthy();
    buttonComponent.unmount();
  });
  it('UiButton does not click when disabled', async () => {
    let buttonHasBeenClicked = false;
    function receiveData() {
      buttonHasBeenClicked = true;
    }

    const buttonComponent = render(
      <UiButton onClick={receiveData} disabled>Test Button</UiButton>,
    );

    const button = await buttonComponent.getByTestId('ui-button');

    fireEvent.click(button);
    expect(buttonHasBeenClicked).not.toBeTruthy();
    buttonComponent.unmount();
  });
});
