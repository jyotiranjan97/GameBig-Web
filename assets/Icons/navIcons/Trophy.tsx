type Props = {
  size: number;
};

export default function Icon({ size }: Props) {
  return (
    <div>
      <svg
        enableBackground="new 0 0 20 20"
        height={size}
        viewBox="0 0 20 20"
        width={size}
        fill="#666"
      >
        <g>
          <rect fill="none" height="20" width="20" />
        </g>
        <g>
          <g />
          <path d="M15,6h-2c0-0.55-0.45-1-1-1H8C7.45,5,7,5.45,7,6H5C4.45,6,4,6.45,4,7v1c0,1.66,1.34,3,3,3h0.18 c0.36,1.01,1.24,1.77,2.32,1.95V15h-2C7.22,15,7,15.22,7,15.5C7,15.78,7.22,16,7.5,16h2h1h2c0.28,0,0.5-0.22,0.5-0.5 c0-0.28-0.22-0.5-0.5-0.5h-2v-2.05c1.08-0.18,1.96-0.94,2.32-1.95H13c1.66,0,3-1.34,3-3V7C16,6.45,15.55,6,15,6z M7,10 c-1.1,0-2-0.9-2-2V7h2V10z M15,8c0,1.1-0.9,2-2,2V7h2V8z" />
        </g>
      </svg>
    </div>
  );
}
