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
  useGetTasksOfUserQuery,
} from '../../api/queries';
import UiModal from '../../components/ui/UiModal';
import CreateTask from '../../components/tasks/CreateTask';
import Task from '../../types/Task';
import UiInput from '../../components/ui/UiInput';

export default function TasksPage() {
  // TODO: fix issue with overflow
  const uid = localStorage.getItem('uid')!;
  const { request } = useCreateTaskGroupQuery();
  const { data: remoteTaskGroups } = useGetTaskGroupOfUserQuery(uid);
  const [localTaskGroups, setLocalTaskGroups] = useState<TaskGroup[]>([]);
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const { data: remoteTasks } = useGetTasksOfUserQuery(uid);
  const [createTaskIsVisible, setCreateTaskIsVisible] = useState(false);
  const [activeTaskGroupId, setActiveTaskGroupId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const taskGroups = useMemo<TaskGroup[]>(
    () => [
      ...(remoteTaskGroups?.length ? remoteTaskGroups : []),
      ...localTaskGroups,
    ],
    [localTaskGroups, remoteTaskGroups],
  );

  const tasks = useMemo<Task[]>(() => {
    const unfilteredTasks = [...localTasks, ...(remoteTasks?.length ? remoteTasks : [])]

    if (searchQuery) return searchTasks(unfilteredTasks);

    return unfilteredTasks;
  }, [localTasks, remoteTasks, searchQuery]);

  function searchTasks(unfilteredTasks: Task[]): Task[]  {
    if (!searchQuery) {
      return unfilteredTasks; 
    }
  
    return unfilteredTasks.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  function filterTasksByGroupId(groupId: string) {
    return tasks.filter(({ taskGroupId }) => taskGroupId === groupId);
  }
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

  function initCreateTask(taskGroupId: string) {
    setActiveTaskGroupId(taskGroupId);
    setCreateTaskIsVisible(true);
  }

  function closeCreateTask() {
    setCreateTaskIsVisible(false);
  }

  function setNewTaskAndCloseCreateTask(newlyAddedTask: Task) {
    setLocalTasks((curr) => [...curr, newlyAddedTask]);
    closeCreateTask();
  }

  return (
    <div className="overflow-hidden">
      <TheTopNav>
        <div className="w-60">

        <UiInput value={searchQuery} name="searchQuery" placeholder='Search for tasks' onChange={({ value }) => setSearchQuery(value!)} />
        </div>
      </TheTopNav>
      <div className="p-4 flex gap-4 overflow-auto">
        {taskGroups.map((taskGroup, index) => (
          <Tasks
            key={index}
            tasks={filterTasksByGroupId(taskGroup._id)}
            taskGroup={taskGroup}
            createTask={initCreateTask}
            removeUnsavedTaskGroup={removeUnsavedTaskGroup}
            saveTaskGroup={saveTaskGroup}
          />
        ))}
        <UiButton variant="neutral" onClick={addTaskGroup}>
          <Plus size={24} />
        </UiButton>
      </div>
      <UiModal
        onClose={closeCreateTask}
        isOpen={createTaskIsVisible}
        title="Create Task"
      >
        <CreateTask
          taskGroupId={activeTaskGroupId}
          finishCreatingTask={setNewTaskAndCloseCreateTask}
        />
      </UiModal>
    </div>
  );
}
