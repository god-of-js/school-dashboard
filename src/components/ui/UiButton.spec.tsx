import { expect, describe, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import UiButton from './UiButton';

describe('src/components/ui/UiButton.tsx', () => {
  it('UiButton handles click on parent', async () => {
    let handleClick = vi.fn();
    const buttonComponent = render(
      <UiButton onClick={handleClick}>Test Button</UiButton>,
    );

    const button = await buttonComponent.getByTestId('ui-button');

    fireEvent.click(button);
    expect(handleClick).toBeCalled();
    buttonComponent.unmount();
  });
  it('UiButton does not click when disabled', async () => {
    let handleClick = vi.fn();
    const buttonComponent = render(
      <UiButton onClick={handleClick} disabled>
        Test Button
      </UiButton>,
    );

    const button = await buttonComponent.getByTestId('ui-button');

    fireEvent.click(button);
    expect(handleClick).not.toBeCalled();
    buttonComponent.unmount();
  });
});
