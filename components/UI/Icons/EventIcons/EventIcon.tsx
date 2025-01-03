import { FC } from 'react';

type Props = {
  styles: string;
};

const EventIcon: FC<Props> = ({ styles }: Props) => {
  return (
    <svg
      className={styles}
      xmlns="http://www.w3.org/2000/svg"
      height="30px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d={
          'M16 13h-3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 ' +
          '1-.45 1-1v-3c0-.55-.45-1-1-1zm0-10v1H8V3c0-.55-.45-1-1-1s-1 .45-1 ' +
          '1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 ' +
          '2-2V6c0-1.1-.9-2-2-2h-1V3c0-.55-.45-1-1-1s-1 .45-1 1zm2 ' +
          '17H6c-.55 0-1-.45-1-1V9h14v10c0 .55-.45 1-1 1z'
        }
      />
    </svg>
  );
};

export default EventIcon;
