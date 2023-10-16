interface Props {
  name?: string;
}
export default function TaskGroup({ name }: Props) {
  return (
    <div className="bg-gray-10 rounded-lg min-h-screen w-80">
      <header className="uppercase sticky flex">
        <h2>{name}</h2>
      </header>
    </div>
  );
}
