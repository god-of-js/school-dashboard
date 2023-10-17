import TaskGroup from '../../types/TaskGroup';
import TasksHeader from './TasksHeader';

interface Props {
  taskGroup: TaskGroup;
  removeUnsavedTaskGroup: (taskId: string) => void;
  saveTaskGroup: (taskGrup: TaskGroup) => void;
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
    </div>
  );
}
