import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Aux from 'hoc/Auxiliary/Auxiliary';
import CreatePost from '@/components/Home/CreatePost';
import Post from '@/components/Home/Post';

const Home = ({ posts }: any) => {
  return (
    <div className="flex flex-col sm:static w-full sm:px-10 px-0">
      <Head>
        <title>GameBig</title>
        <meta name="description" content="Join teams and Clans!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <CreatePost />
        <div className="flex flex-col mt-1">
          {posts &&
            posts.message.map((item: any, index: any) => (
              <div key={index}>
                <Post post={item} />
              </div>
            ))}
        </div>
      </Aux>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let { DEV_URL } = process.env;
  let response = await fetch(`${DEV_URL}/api/posts`, {
    method: 'GET',
  });
  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      posts: data,
    },
  };
};
