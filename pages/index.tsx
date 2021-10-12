import Head from 'next/head';
import Aux from '../hoc/Auxiliary/Auxiliary';
import classes from '../styles/Home.module.scss';
import TournamentCard from '../components/Tournament/TournamentCard/TournamentCard';
import { GetStaticProps } from 'next';
import { fetchAllTournamentData } from '../lib/getAllTournaments';
import { TournamentData } from '../utilities/tournament/types';

interface Props {
  tournaments: TournamentData[];
}

export default function Home({ tournaments }: Props) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <main className={classes.Main}>
          <h1>Welcome to Gamebig</h1>
          <div>
            {tournaments.map((tournament: TournamentData) => (
              <TournamentCard
                key={tournament.id}
                data={tournament}
                isOrganizer={false}
              />
            ))}
          </div>
        </main>
      </Aux>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const tournaments = await fetchAllTournamentData();
  return {
    props: {
      tournaments,
    },
  };
};
