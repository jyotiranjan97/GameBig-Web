import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Post from './Post';
import TextArea from '../UI/Inputs/TextArea';

let { BASE_URL } = process.env;

const PostDetails = ({ post, closeModal }: any) => {
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch(`api/commentOnPost/?postId=${post._id}`, {
          method: 'GET',
        });
        const data = await response.json();
        setComments(data.message);
      } catch (err) {
        console.log(err);
      }
    }
    getComments();
  }, [post._id]);

  async function saveComment() {
    try {
      let response = await fetch(`${BASE_URL}/api/commentOnPost`, {
        method: 'POST',
        body: JSON.stringify({ postId: post._id, text: text }),
      });
      setText('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-11/12 md:w-2/3 mx-auto mb-8">
      <Post post={post} />
      <div>
        <TextArea
          labelName="Comment"
          name="comment"
          onChangeHandler={(e: ChangeEvent) => {
            const target = e.target as HTMLInputElement;
            setText(target.value);
          }}
          value={text}
        />
        <div className="flex justify-end mr-2">
          <div
            className="rounded-md bg-indigo-600 py-1 px-4"
            onClick={saveComment}
          >
            <span className="text-lg text-white font-sans cursor-pointer">
              Comment
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        {comments.map((item: any, index: any) => (
          <div className="bg-slate-900 rounded-md mb-1 px-2 py-1" key={index}>
            <span className="text-lg text-white font-sans cursor-pointer">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
