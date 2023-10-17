import { Clipboard } from '@phosphor-icons/react';
import UiButton from '../ui/UiButton';

interface Props {
  name: string;
}
export default function TaskDetails({ name }: Props) {
  function copyToClipboard() {
    navigator.clipboard.writeText(name).then(() => {
      alert('copied to clipboard');
    });
  }
  return (
    <div className="bg-white flex justify-between items-center p-2 rounded text-gray-900 text-sm capitalize">
      {name}

      <UiButton onClick={copyToClipboard} variant="transparent">
        <Clipboard />
      </UiButton>
    </div>
  );
}
