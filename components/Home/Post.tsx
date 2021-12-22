import { useState } from 'react';
import Image from 'next/image';
import MoreIcon from '../UI/Icons/ProfileIcons/MoreIcon';
import FilledHeartIcon from '../UI/Icons/Post/FilledHeart';
import EmptyHeartIcon from '../UI/Icons/Post/EmptyHeart';
import CommentsIcon from '../UI/Icons/Post/Comments';
import ShareIcon from '../UI/Icons/Others/ShareIcon';
import HorizontalProfile from '../Profile/HorizontalProfile';
import { useAuth } from '@/context/authContext';

const axios = require('axios').default;

const Post = ({ post, setSelectedPost, openModal, isModalOpen }: any) => {
  const { userData } = useAuth();
  const { text, image, user, noOfLikes, noOfComments, likedBy } = post;

  const isLikedByUser = likedBy.includes(user.uid);
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likes, setlikes] = useState(noOfLikes);

  async function likehandler(event: MouseEvent) {
    event.stopPropagation();
    try {
      axios.get(`/api/likePost`, {
        params: { postId: post._id, likedBy: userData.uid },
      });
      setIsLiked(true);
      setlikes(likes + 1);
    } catch (err) {
      console.log(err);
    }
  }

  async function unLikehandler(event: MouseEvent) {
    event.stopPropagation();
    try {
      axios.get(`/api/likePost`, {
        params: { postId: post._id, unLikedBy: userData.uid },
      });
      setIsLiked(false);
      setlikes(likes - 1);
    } catch (err) {
      console.log(err);
    }
  }

  function showModal() {
    if (!isModalOpen) {
      setSelectedPost(post);
      openModal();
    }
  }

  return (
    <div
      className="w-full flex flex-col mx-auto bg-gray-900 rounded-md m-1 px-4 py-1 "
      onClick={showModal}
    >
      <div className="flex items-center	justify-between">
        <HorizontalProfile user={user} isTransparent />
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
        <div className="flex items-center	gap-3	" onClick={showModal}>
          <CommentsIcon size={24} />
          <div className="text-sm text-gray-50">{noOfComments}</div>
        </div>
        <div className="flex items-center	gap-3">
          {isLiked ? (
            <FilledHeartIcon size={24} onClick={unLikehandler} />
          ) : (
            <EmptyHeartIcon size={24} onClick={likehandler} />
          )}
          <div className="text-sm text-gray-50">{likes}</div>
        </div>
        {/* <div className="flex items-center	gap-3">
          <ShareIcon size={24} />
          <div className="text-sm text-gray-50">10</div>
        </div> */}
      </div>
    </div>
  );
};

export default Post;
