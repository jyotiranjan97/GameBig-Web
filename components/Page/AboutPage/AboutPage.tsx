import { PageFormData } from '../../../utilities/page/types';
import TwitchIcon from '../../UI/Icons/SocialIcons/TwitchIcon';
import YouTubeIcon from '../../UI/Icons/SocialIcons/YouTubeIcon';
import InstagramIcon from '../../UI/Icons/SocialIcons/InstagramIcon';
import FacebookIcon from '../../UI/Icons/SocialIcons/FacebookIcon';
import RedditIcon from '../../UI/Icons/SocialIcons/RedditIcon';
import DiscordIcon from '../../UI/Icons/SocialIcons/DiscordIcon';
import EmailIcon from '@/components/UI/Icons/ProfileIcons/EmailIcon';
import WebIcon from '@/components/UI/Icons/ProfileIcons/WebIcon';
import { useUI } from '@/context/uiContext';

interface Props {
  data: PageFormData;
}

export default function AboutPage({ data }: Props) {
  const { openSnackBar } = useUI();
  return (
    <div className={'w-full mx-auto font-sans px-5 py-2'}>
      <div className="flex flex-row items-center space-x-4 ml-1 mt-3">
        {data.email ? (
          <p
            className="text-gray-500 text-xs font-semibold leading-tight mb-2 flex flex-row space-x-1"
            onMouseDown={() => {
              navigator.clipboard.writeText(data.email);
              openSnackBar({
                label: 'Copied!',
                message: 'Email ID copied to clipboard',
                type: 'info',
              });
            }}
          >
            <EmailIcon size={18} className={'fill-current text-slate-500'} />
            <span>{data.email}</span>
          </p>
        ) : null}
        {data.website ? (
          <p
            className="text-gray-500 text-xs font-semibold leading-tight mb-2 flex flex-row space-x-1"
            onClick={() => window.open(data.website, '_blank')}
          >
            <WebIcon size={18} className={'fill-current text-slate-500'} />
            <span>{data.website.replace(/(^\w+:|^)\/\//, '')}</span>
          </p>
        ) : null}
      </div>
      <div className="flex flex-row items-center space-x-4 ml-1 mt-1">
        {data.youtube ? (
          <YouTubeIcon
            size={20}
            onClick={() => window.open(data.youtube, '_blank')}
          />
        ) : null}
        {data.discord ? (
          <DiscordIcon
            size={25}
            onClick={() => window.open(data.discord, '_blank')}
          />
        ) : null}
        {data.instagram ? (
          <InstagramIcon
            size={28}
            onClick={() => window.open(data.instagram, '_blank')}
          />
        ) : null}
        {data.facebook ? (
          <FacebookIcon
            size={35}
            onClick={() => window.open(data.facebook, '_blank')}
          />
        ) : null}
        {data.twitch ? (
          <TwitchIcon
            size={23}
            onClick={() => window.open(data.twitch, '_blank')}
          />
        ) : null}
        {data.reddit ? (
          <RedditIcon
            size={35}
            onClick={() => window.open(data.reddit, '_blank')}
          />
        ) : null}
      </div>
    </div>
  );
}
