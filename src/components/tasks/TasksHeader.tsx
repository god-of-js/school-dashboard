import { Check, X } from '@phosphor-icons/react';
import { useState } from 'react';
import TaskGroup from '../../types/TaskGroup';
import UiButton from '../ui/UiButton';
import UiInput from '../ui/UiInput';

interface Props {
  taskGroupDetails: TaskGroup;
  removeUnsavedTaskGroup: (taskId: string) => void;
  saveTaskGroup: (taskGroup: TaskGroup) => void;
}
export default function TasksHeader({
  taskGroupDetails,
  saveTaskGroup,
  removeUnsavedTaskGroup,
}: Props) {
  // TODO: implement focus on input when user expected to write name.
  const [taskGroupName, setTaskGroupName] = useState('');

  function stopOperation() {
    removeUnsavedTaskGroup(taskGroupDetails._id);
  }
  function initSaveTaskGroup() {
    if (!taskGroupName) {
      alert('Task group name must be provided');
      return;
    }
    saveTaskGroup({ ...taskGroupDetails, name: taskGroupName });
  }

  return (
    <div className="flex">
      {!taskGroupDetails.name ? (
        <div className="w-full">
          <UiInput
            name="taskGroupName"
            variant="light"
            value={taskGroupName}
            onChange={({ value }) => {
              setTaskGroupName(value!);
            }}
          />
          <div className="flex justify-end gap-2">
            <UiButton variant="icon" onClick={initSaveTaskGroup}>
              <Check size={16} />
            </UiButton>
            <UiButton variant="icon" onClick={stopOperation}>
              <X size={16} />
            </UiButton>
          </div>
        </div>
      ) : (
        <span>{taskGroupDetails.name}</span>
      )}
    </div>
  );
}
