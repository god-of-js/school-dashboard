import { expect, describe, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import UiInput from './UiInput';
import OnChangeParams from '../../types/OnChangeParams';

describe('src/components/ui/UiInput.tsx', () => {
  it('UiInput sends data to parent component.', async () => {
    let parentData: OnChangeParams | null = null;
    function receiveData(data: OnChangeParams) {
      parentData = data;
    }

    const inputComponent = render(
      <UiInput name="test" value="" onChange={receiveData} />,
    );

    const input = await inputComponent.getByTestId('ui-input');

    fireEvent.change(input, { target: { value: 'TestValue' } });
    expect(parentData).toEqual({ name: 'test', value: 'TestValue' });
    inputComponent.unmount();
  });
});
