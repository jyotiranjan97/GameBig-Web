import React, { FC } from 'react';

type Props = {
  size: number;
  onClick: () => void;
};

const Twitter: FC<Props> = ({ size, onClick }: Props) => {
  return (
    <div onClick={onClick}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 99 81"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M98.488 9.47296C94.7832 11.0889 90.865 12.1629 86.854 12.662C91.0811 10.1539 94.2414 6.18238 95.736 1.49996C91.7791 3.84674 87.4501 5.49957 82.936 6.38697C80.1676 3.42908 76.5732 1.37251 72.6204 0.484667C68.6675 -0.403179 64.539 -0.0812356 60.7715 1.40864C57.0041 2.89851 53.772 5.48739 51.4956 8.83868C49.2191 12.19 48.0036 16.1486 48.007 20.2C47.9915 21.7459 48.1484 23.2888 48.475 24.8C40.4425 24.4062 32.5836 22.3215 25.412 18.6823C18.2404 15.0431 11.9176 9.93123 6.857 3.68096C4.25884 8.12258 3.45369 13.3883 4.6059 18.4034C5.7581 23.4184 8.78079 27.8047 13.057 30.667C9.86228 30.5806 6.73511 29.7277 3.939 28.18V28.4C3.94426 33.0626 5.55571 37.5811 8.5021 41.1948C11.4485 44.8086 15.5499 47.2969 20.116 48.241C18.3886 48.6963 16.6083 48.9199 14.822 48.906C13.5393 48.9286 12.2579 48.813 11 48.561C12.305 52.5682 14.8199 56.0724 18.1987 58.5912C21.5775 61.1101 25.654 62.5196 29.867 62.626C22.7201 68.2151 13.9059 71.2473 4.833 71.238C3.21772 71.2486 1.60341 71.1557 0 70.96C9.23245 76.9093 19.9908 80.0565 30.974 80.021C68.128 80.021 88.442 49.244 88.442 22.566C88.442 21.673 88.411 20.812 88.368 19.956C92.3506 17.1059 95.78 13.5534 98.488 9.47296V9.47296Z"
            fill="#03A9F4"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="98.488" height="80.021" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Twitter;
