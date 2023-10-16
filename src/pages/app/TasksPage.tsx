import TheTopNav from '../../components/layout/TheTopNav';
import TaskGroup from '../../components/tasks/TaskGroup';

export default function TasksPage() {
  const arr = ['', '', '', '', '', '', '', ''];
  return (
    <>
      <TheTopNav />
      <div className="p-4 flex gap-4 w-full overflow-scroll">
        {arr.map((_, index) => (
          <TaskGroup key={index}></TaskGroup>
        ))}
      </div>
    </>
  );
}
