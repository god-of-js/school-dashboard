import { useState } from 'react';
import OnChangeParams from '../../types/OnChangeParams';
import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiInput from '../ui/UiInput';

export default function CreateTask() {
  const [formData, setFormData] = useState({
    name: '',
  });
  function createTask() {}

  function onChange({ name, value }: OnChangeParams) {
    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }
  return (
    <UiForm formData={formData} onSubmit={createTask}>
      {({ errors }) => (
        <div className="grid gap-4">
          <UiInput
            name="name"
            value={formData.name}
            label="Task Name"
            placeholder="Enter the task name"
            onChange={onChange}
            error={errors.name}
          />
          <UiButton>Create Task</UiButton>
        </div>
      )}
    </UiForm>
  );
}
