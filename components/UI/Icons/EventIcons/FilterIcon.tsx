import { FC } from 'react';

type Props = {
  size: number;
  onClick?: () => void;
};

const FilterIcon: FC<Props> = ({ size, onClick }: Props) => {
  return (
    <svg
      enableBackground="new 0 0 24 24"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      className="fill-current text-gray-500"
      onClick={onClick}
    >
      <g>
        <path d="M0,0h24 M24,24H0" fill="none" />
        <path d="M4.25,5.61C6.57,8.59,10,13,10,13v5c0,1.1,0.9,2,2,2h0c1.1,0,2-0.9,2-2v-5c0,0,3.43-4.41,5.75-7.39 C20.26,4.95,19.79,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" />
        <path d="M0,0h24v24H0V0z" fill="none" />
      </g>
    </svg>
  );
};

export default FilterIcon;
