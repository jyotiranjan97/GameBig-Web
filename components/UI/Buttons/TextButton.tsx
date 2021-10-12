import React from 'react';

type Props = {
  name: string;
  type: 'normal' | 'success' | 'fail';
};

const TextButton = ({ name, type }: Props) => {
  return (
    <div className="flex my-4 justify-center">
      <span
        className={
          'text-lg font-semibold cursor-pointer ' +
          'my-auto shadow-sm px-4 py-2 rounded-lg bg-transparent ' +
          (type === 'normal'
            ? 'text-indigo-500 hover:bg-gray-700'
            : type === 'success'
            ? 'text-green-400 hover:bg-green-800'
            : 'text-red-400 hover:bg-red-900')
        }
      >
        {name}
      </span>
    </div>
  );
};

export default TextButton;
