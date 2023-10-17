import { X } from '@phosphor-icons/react';
import UiButton from './UiButton';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  isOpen: boolean;
}
export default function UiModal({ children, isOpen, onClose, title }: Props) {
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50"
            data-testid="overlay"
            onClick={onClose}
          />
          <div className="fixed z-50 top-0 left-0 right-0 bottom-0 h-fit mt-24 mx-auto bg-white p-8 w-2/5 rounded">
            <header className="flex mb-4 justify-between items-center">
              <h2
                className="text-gray-900 text-md font-bold"
                data-testid="modal-title"
              >
                {title}
              </h2>
              <UiButton variant="neutral" size="sm" onClick={onClose}>
                <X size="16" />
              </UiButton>
            </header>
            {children}
          </div>
        </>
      )}
    </>
  );
}
