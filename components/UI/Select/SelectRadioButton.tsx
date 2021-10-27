import CheckCircle from '../Icons/EventIcons/CheckCircle';
interface Props {
  name: string;
  label: string;
  value: string;
  items: { id: string; name: string }[];
  handleChange: (item: { id: string; name: string }) => void;
}

export default function SelectRadioButton({
  name,
  label,
  value,
  handleChange,
  items,
}: Props) {
  const listItems = items.map((item) => (
    <li
      key={item.id}
      className={
        'flex justify-between w-full md:w-1/2 p-3.5 my-2 ml-0 rounded-md cursor-pointer ' +
        'text-base text-gray-300 font-sans font-semibold ' +
        (item.name === value ? 'bg-green-500' : 'bg-gray-700')
      }
      onMouseDown={() => handleChange(item)}
    >
      {item.name}
      {item.name === value ? <CheckCircle /> : null}
    </li>
  ));

  return (
    <div>
      <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide mb-2">
        {label}
      </label>
      <ul>{listItems}</ul>
    </div>
  );
}
