import { expect, describe, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import UiField from './UiField';

describe('src/components/ui/UiField.tsx', () => {
  it('UiField renders error when error is passed', async () => {
    const fieldComponent = render(
      <UiField label="test" error="error-text should be displayed">Test Field</UiField>,
    );

    const errorText = await fieldComponent.getByTestId('error-text');

    fireEvent.click(errorText);
    expect(errorText.innerHTML).toContain('error-text should be displayed');
    fieldComponent.unmount();
  });
});
