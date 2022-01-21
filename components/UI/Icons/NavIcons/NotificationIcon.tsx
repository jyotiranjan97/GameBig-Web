type Props = {
  size: number;
  isActive: boolean;
};

export default function Icon({ size, isActive }: Props) {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      width={size}
      className={
        'fill-current ' + (isActive ? 'text-indigo-600' : 'text-gray-400')
      }
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z" />
    </svg>
  );
}
