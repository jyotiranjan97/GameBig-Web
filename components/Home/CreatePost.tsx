import { ChangeEvent, useState } from 'react';
import TextArea from '../UI/Inputs/TextArea';
import EditorJS from '@editorjs/editorjs';

const CreatePost = () => {
  const [post, setPost] = useState('');

  return (
    <div className="w-11/12 md:w-1/2 flex flex-col mx-auto">
      <TextArea
        labelName="Create Post"
        name="post"
        onChangeHandler={(e: ChangeEvent) => {
          const target = e.target as HTMLInputElement;
          setPost(target.value);
        }}
        value={post}
        placeHolder="What's on your mind?"
      />
      <div className="flex justify-end mr-2">
        <div
          className="rounded-md bg-indigo-600 px-4 py-1"
          onClick={async () => {
            let response = await fetch('/api/posts', {
              method: 'POST',
              body: JSON.stringify({ text: post }),
            });
            console.log(response);
          }}
        >
          <span className="text-xl text-white font-sans cursor-pointer">
            Post
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
