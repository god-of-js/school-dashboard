import { uuidv4 } from '@firebase/util';
import { useState } from 'react';
import { useCreateTaskQuery } from '../../api/queries';
import OnChangeParams from '../../types/OnChangeParams';
import Task from '../../types/Task';
import CreateTaskSchema from '../../utils/schemas/CreateTaskSchema';
import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiInput from '../ui/UiInput';

interface Props {
  taskGroupId: string;
  finishCreatingTask: (newlyAddedTask: Task) => void;
}
export default function CreateTask({ taskGroupId, finishCreatingTask }: Props) {
  const userId = localStorage.getItem('uid') || 'F1xLKP4EBAMmhuEiuu4gvntSkOi1';
  const { request, isLoading } = useCreateTaskQuery();
  const [formData, setFormData] = useState<Task>({
    name: '',
    taskGroupId,
    _id: '',
    userId,
  });
  function createTask() {
    const data = { ...formData, _id: uuidv4() };
    request(data).then(() => {
      finishCreatingTask(data);
    });
  }

  function onChange({ name, value }: OnChangeParams) {
    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  return (
    <UiForm formData={formData} schema={CreateTaskSchema} onSubmit={createTask}>
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
          <UiButton loading={isLoading}>Create Task</UiButton>
        </div>
      )}
    </UiForm>
  );
}
