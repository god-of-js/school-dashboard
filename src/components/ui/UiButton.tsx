interface Props {
  children: React.ReactNode;
  variant?: 'primary';
  block?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
export default function UiButton({
  children,
  variant,
  disabled,
  block,
  onClick,
}: Props) {
  return (
    <button
      className={`bg-primary text-white outline-none rounded-md h-12 flex gap-2 items-center justify-center  ${
        block && 'w-full'
      }`}
      disabled={disabled}
      data-testid="ui-button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
