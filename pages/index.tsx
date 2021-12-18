import Head from 'next/head';
import Aux from 'hoc/Auxiliary/Auxiliary';

const Home = () => {
  return (
    <div className="flex flex-col sm:static w-full sm:px-10 px-0">
      <Head>
        <title>GameBig</title>
        <meta name="description" content="Join teams and Clans!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <div className={'flex mt-3 md:w-2/3 xl:w-1/2 sm:mx-auto mx-2'}>
          <span className="text-xl text-gray-50">Home</span>
        </div>
      </Aux>
    </div>
  );
};

export default Home;
