import { Plus } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import TheTopNav from '../../components/layout/TheTopNav';
import Tasks from '../../components/tasks/Tasks';
import UiButton from '../../components/ui/UiButton';
import TaskGroup from '../../types/TaskGroup';
import { uuidv4 } from '@firebase/util';
import {
  useCreateTaskGroupQuery,
  useGetTaskGroupOfUserQuery,
} from '../../api/queries';
import UiModal from '../../components/ui/UiModal';
import CreateTask from '../../components/tasks/CreateTask';

export default function TasksPage() {
  const uid = localStorage.getItem('uid')!;
  const { request } = useCreateTaskGroupQuery();
  const { data: remoteTaskGroups } = useGetTaskGroupOfUserQuery(uid);
  // TODO: fix issue with overflow
  const [localTaskGroups, setLocalTaskGroups] = useState<TaskGroup[]>([]);
  const [createTaskIsVisible, setCreateTaskIsVisible] = useState(true);

  const taskGroups = useMemo<TaskGroup[]>(
    () => [
      ...(remoteTaskGroups?.length ? remoteTaskGroups : []),
      ...localTaskGroups,
    ],
    [localTaskGroups, remoteTaskGroups],
  );

  function addTaskGroup() {
    const newTaskGroup: TaskGroup = {
      name: '',
      _id: uuidv4(),
      userId: uid!,
    };

    setLocalTaskGroups((curr) => [...curr, newTaskGroup]);
  }

  function removeUnsavedTaskGroup(id: string) {
    setLocalTaskGroups((curr) =>
      curr.filter((taskGroup) => taskGroup._id !== id),
    );
  }
  function saveTaskGroup(newTaskGroup: TaskGroup) {
    request(newTaskGroup).then(() => {
      setLocalTaskGroups((curr) =>
        curr.map((taskGroup) =>
          taskGroup._id === newTaskGroup._id
            ? { ...taskGroup, ...newTaskGroup }
            : taskGroup,
        ),
      );
    });
  }

  function createTask() {}

  function closeCreateTask() {}

  return (
    <div className="overflow-hidden">
      <TheTopNav />
      <div className="p-4 flex gap-4 overflow-auto">
        {taskGroups.map((taskGroup, index) => (
          <Tasks
            key={index}
            taskGroup={taskGroup}
            createTask={createTask}
            removeUnsavedTaskGroup={removeUnsavedTaskGroup}
            saveTaskGroup={saveTaskGroup}
          ></Tasks>
        ))}
        <UiButton variant="neutral" onClick={addTaskGroup}>
          <Plus size={24} />
        </UiButton>
      </div>
      <UiModal
        onClose={() => setCreateTaskIsVisible(false)}
        isOpen={createTaskIsVisible}
        title="Create Task"
      >
        <CreateTask />
      </UiModal>
    </div>
  );
}
