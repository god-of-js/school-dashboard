interface Props {
  name: string;
}
export default function TaskDetails({ name }: Props) {
  return (
    <div className="bg-white p-2 rounded text-gray-900 text-sm capitalize">
      {name}
    </div>
  );
}
