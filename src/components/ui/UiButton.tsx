import UiLoader from './UiLoader';

interface Props {
  children: React.ReactNode;
  variant?: 'primary';
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
}
export default function UiButton({
  children,
  variant,
  disabled,
  loading,
  type = 'submit',
  block,
  onClick,
}: Props) {
  return (
    <button
      className={`bg-primary text-white outline-none rounded-md h-12 flex gap-2 items-center justify-center  ${
        block && 'w-full'
      }`}
      disabled={disabled}
      type={type}
      data-testid="ui-button"
      onClick={onClick}
    >
      {loading ? <UiLoader /> : children}
    </button>
  );
}
