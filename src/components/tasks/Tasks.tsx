import { Plus } from '@phosphor-icons/react';
import Task from '../../types/Task';
import TaskGroup from '../../types/TaskGroup';
import UiButton from '../ui/UiButton';
import TaskDetails from './TaskDetails';
import TasksHeader from './TasksHeader';

interface Props {
  taskGroup: TaskGroup;
  tasks: Task[];
  removeUnsavedTaskGroup: (taskId: string) => void;
  saveTaskGroup: (taskGrup: TaskGroup) => void;
  createTask: (taskGroupId: string) => void;
}
export default function Tasks({
  taskGroup,
  tasks,
  removeUnsavedTaskGroup,
  createTask,
  saveTaskGroup,
}: Props) {
  console.log(tasks, `tasks for ${taskGroup.name}`);
  return (
    <div className="bg-gray-10 p-2 rounded-lg min-h-screen w-80">
      <TasksHeader
        taskGroupDetails={taskGroup}
        removeUnsavedTaskGroup={removeUnsavedTaskGroup}
        saveTaskGroup={saveTaskGroup}
      />
      <div className="grid gap-2 mt-4">
        {tasks.map((task) => (
          <TaskDetails name={task.name} />
        ))}
      </div>
      <div className="my-12">
        <UiButton
          block
          variant="neutral"
          size="sm"
          onClick={() => createTask(taskGroup._id)}
        >
          <Plus size={20} /> Create new task
        </UiButton>
      </div>
    </div>
  );
}
