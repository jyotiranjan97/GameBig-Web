import { useRouter } from 'next/router';
import Link from 'next/link';

const EventTabs = () => {
  const router = useRouter();

  const Tab = ({ href, label }: { href: string; label: string }) => (
    <Link href={href} passHref>
      <span
        className={
          router.pathname === href
            ? ' bg-cyan-900 py-1.5 px-10 sm:px-12 md:px-20 rounded cursor-pointer'
            : 'cursor-pointer'
        }
      >
        {label}
      </span>
    </Link>
  );
  return (
    <div
      className="md:w-2/3 xl:w-1/2 mt-1.5 mx-2 md:mx-auto 
    text-gray-300 font-bold font-sans text-sm sm:text-lg md:text-xl flex items-center justify-evenly"
    >
      <Tab label="Upcoming" href="/events" />
      <Tab label="Live" href="/live" />
      <Tab label="Past" href="/past" />
    </div>
  );
};

export default EventTabs;
