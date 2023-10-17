import { Plus } from '@phosphor-icons/react';
import TaskGroup from '../../types/TaskGroup';
import UiButton from '../ui/UiButton';
import TasksHeader from './TasksHeader';

interface Props {
  taskGroup: TaskGroup;
  removeUnsavedTaskGroup: (taskId: string) => void;
  saveTaskGroup: (taskGrup: TaskGroup) => void;
  createTask: (taskGroupId: string) => void;
}
export default function Tasks({
  taskGroup,
  removeUnsavedTaskGroup,
  saveTaskGroup,
}: Props) {
  return (
    <div className="bg-gray-10 p-2 rounded-lg min-h-screen w-80">
      <TasksHeader
        taskGroupDetails={taskGroup}
        removeUnsavedTaskGroup={removeUnsavedTaskGroup}
        saveTaskGroup={saveTaskGroup}
      />
      <div className="my-12">
        <UiButton block variant="neutral" size="sm">
          <Plus size={20} /> Create new task
        </UiButton>
      </div>
    </div>
  );
}
