import { Formik, FormikErrors } from 'formik';
import React from 'react';

interface Props {
  formData: Record<string, any>;
  schema?: any;
  children: (props: {
    errors: FormikErrors<Record<string, string>>;
    hasErrors?: boolean;
    isSubmitting?: boolean;
  }) => React.ReactNode;
  onSubmit: () => void;
}

export default function UiForm({
  schema,
  formData,
  children,
  onSubmit,
}: Props) {
  function validateForm() {
    if (!schema) return {};
    let errors = {};
    try {
      schema.validateSync(formData, { abortEarly: false });
    } catch (error: any) {
      errors = error.inner.reduce(
        (
          acc: Record<string, string>,
          { path, message }: { path: string; message: string },
        ) => {
          acc[path] = message;
          return acc;
        },
        {},
      );
    }
    return errors;
  }

  return (
    <Formik
      initialValues={formData}
      validate={validateForm}
      onSubmit={onSubmit}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} data-testid="ui-form">
          {children({
            errors,
            hasErrors: !!errors.length,
            isSubmitting,
          })}
        </form>
      )}
    </Formik>
  );
}
