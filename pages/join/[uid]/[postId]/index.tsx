import Head from 'next/head';
import TeamUpItem from '../../../../components/Join/TeamUpItem';

export default function Home() {
  return (
    <div className="flex flex-col sm:static w-full sm:px-10 px-0">
      <Head>
        <title>My posts</title>
        <meta name="description" content="Join teams and Clans!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div>
        <div>
          <TeamUpItem />
        </div>
      </div>
    </div>
  );
}
