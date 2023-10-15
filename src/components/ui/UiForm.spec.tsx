import { expect, describe, it, beforeEach, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';

import UiForm from './UiForm';
import { FormikErrors } from 'formik';
import RegistrationSchema from '../../utils/schemas/RegistrationSchema';

const defaultData = {
  name: '',
  email: '',
  password: '',
  handleSubmit: () => {}
}
const filledData = {
  name: 'Henry Eze',
  email: 'henryeze019@gmail.com',
  password: 'it don\'t matter to me,'
}

describe('src/components/ui/UiButton.tsx', () => {
    let formData = defaultData;
    let formErrors: FormikErrors<Record<string, string>> = {}

    function setFormErrors(errors: FormikErrors<Record<string, string>>) {
      formErrors = errors;
    }

    const spy = vi.spyOn(formData, 'handleSubmit');
    beforeEach(() => {
      formErrors = {}
    });

  it('Form sends errors when needed.', async () => {
    const formComponent = render(
      <UiForm formData={formData} schema={RegistrationSchema} onSubmit={formData.handleSubmit}>{({ errors }) => {
        setFormErrors(errors);
        return <></>
      }}</UiForm>,
    );

    const form = await formComponent.getByTestId('ui-form');

    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(formErrors).toEqual({
        name: 'This field is required',
        email: 'This field is required',
        password: 'password must be at least 8 characters',
      });
      expect(spy).not.toHaveBeenCalled();
    });
    formComponent.unmount();
  });

  it('Form sends errors when needed.', async () => {
    const formComponent = render(
      <UiForm formData={filledData} schema={RegistrationSchema} onSubmit={formData.handleSubmit}>{({ errors }) => {
        setFormErrors(errors);
        return <></>
      }}</UiForm>,
    );

    const form = await formComponent.getByTestId('ui-form');

    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(formErrors).not.toEqual({
        name: 'This field is required',
        email: 'This field is required',
        password: 'password must be at least 8 characters',
      });
      expect(spy).toHaveBeenCalled();
    });
    formComponent.unmount();
  });
});
