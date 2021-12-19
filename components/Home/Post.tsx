import Image from 'next/image';
import MoreIcon from '../UI/Icons/ProfileIcons/MoreIcon';
import FilledHeartIcon from '../UI/Icons/Post/FilledHeart';
import EmptyHeartIcon from '../UI/Icons/Post/EmptyHeart';
import CommentsIcon from '../UI/Icons/Post/Comments';
import ShareIcon from '../UI/Icons/Others/ShareIcon';

const Post = ({ post }: any) => {
  const { text, image } = post;
  return (
    <div className="w-11/12 md:w-1/2 flex flex-col mx-auto bg-gray-900 rounded-md mb-1 px-4 py-1">
      <div className="flex items-center	justify-between">
        <div className="gap-3.5	flex items-center my-1">
          <div className="relative h-8 w-8 md:h-12 md:w-12 cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1617077644557-64be144aa306?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
              className="rounded-full"
              alt="Picture of a friend"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col">
            <b className="mb-2 capitalize font-sans text-gray-50">
              Sofia Müller
            </b>
            <time className="text-gray-400 text-xs">06 August at 09.15 PM</time>
          </div>
        </div>
        <div className="rounded-full h-3.5 flex	items-center justify-center">
          <MoreIcon size={24} />
        </div>
      </div>
      <span className="text-lg text-gray-50 font-sans my-4 mx-8">{text}</span>
      {image && (
        <div className="relative h-40 w-40 cursor-pointer">
          <Image
            src={
              'https://images.unsplash.com/photo-1564049489314-60d154ff107d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80'
            }
            className="object-cover w-10 h-10"
            alt="Picture of a friend"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      <div className=" h-16  flex items-center justify-around	">
        <div className="flex items-center	gap-3	">
          <CommentsIcon size={24} />
          <div className="text-sm text-gray-50">10</div>
        </div>
        <div className="flex items-center	gap-3">
          <FilledHeartIcon size={24} />
          <div className="text-sm text-gray-50">5</div>
        </div>
        <div className="flex items-center	gap-3">
          <ShareIcon size={24} />
          <div className="text-sm text-gray-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
