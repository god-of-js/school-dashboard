import UiLoader from './UiLoader';

interface Props {
  children: React.ReactNode;
  variant?: 'primary' | 'icon';
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
}
export default function UiButton({
  children,
  variant = 'primary',
  disabled,
  loading,
  type = 'submit',
  block,
  onClick,
}: Props) {
  const variantClasses = {
    primary: 'bg-primary text-white ',
    icon: 'bg-gray-10 hover:bg-gray-25 text-gray-900',
  };
  return (
    <button
      className={`outline-none rounded-md h-12 px-4 flex gap-2 items-center justify-center  ${
        block && 'w-full'
      } ${variantClasses[variant]}`}
      disabled={disabled}
      type={type}
      data-testid="ui-button"
      onClick={onClick}
    >
      {loading ? <UiLoader /> : children}
    </button>
  );
}
