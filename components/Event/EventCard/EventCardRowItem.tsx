import { FC, ReactNode } from 'react';
import Image from 'next/image';

type Props = {
  label: string;
  content: string;
  children: ReactNode;
  image: string;
  highlight?: boolean;
};

const EventCardRowItem: FC<Partial<Props>> = ({
  label,
  content,
  children,
  image,
  highlight,
}) => {
  return (
    <div
      className={
        'flex flex-col sm:w-2/3 w-4/5 font-sans pl-2 rounded-md ' +
        (highlight ? ' bg-red-500/20' : '')
      }
    >
      <section className="flex flex-row items-center">
        {children}
        <span className="text-gray-500 text-base font-medium px-2.5 tracking-wide">
          {label}
        </span>
      </section>
      <section className="flex flex-row gap-x-3 items-center ml-[2.15rem]">
        {image ? (
          <span className="h-8 w-8 relative">
            <Image
              src={image}
              alt=""
              objectFit="contain"
              layout="fill"
              className="rounded-md"
            />
          </span>
        ) : null}
        <span className="text-gray-300 text-lg font-semibold">{content}</span>
      </section>
    </div>
  );
};

export default EventCardRowItem;
