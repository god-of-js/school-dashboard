import UiLoader from './UiLoader';

interface Props {
  children: React.ReactNode;
  variant?: 'primary' | 'neutral' | 'transparent';
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: 'lg' | 'sm';
  type?: 'button' | 'submit';
  onClick?: () => void;
}
export default function UiButton({
  children,
  variant = 'primary',
  disabled,
  loading,
  size = 'lg',
  type = 'submit',
  block,
  onClick,
}: Props) {
  const variantClasses = {
    primary: 'bg-primary text-white ',
    neutral: 'bg-gray-10 hover:bg-gray-50 text-gray-900',
    transparent: 'bg-transparent hover:bg-gray-10 text-gray-900',

  };
  return (
    <button
      className={`outline-none rounded-md px-4 ${
        size === 'lg' ? 'h-12 text-md' : 'h-8 text-sm'
      } flex gap-2 items-center justify-center  ${block && 'w-full'} ${
        variantClasses[variant]
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
