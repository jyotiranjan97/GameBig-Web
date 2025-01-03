type Props = {
  size: number;
  isActive: boolean;
};

export default function Icon({ size, isActive }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      fill="#000000"
      className={
        'fill-current ' + (isActive ? 'text-indigo-600' : 'text-gray-400')
      }
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" />
    </svg>
  );
}
