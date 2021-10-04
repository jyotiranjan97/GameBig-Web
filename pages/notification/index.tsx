import { useState } from 'react';
import Head from 'next/head';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useAuth } from '../../context/authContext';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export default function Home() {
  const classes = useStyles();
  return (
    <Aux>
      <Head>
        <title>Notification</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className={classes.container}>Notification</div>
    </Aux>
  );
}
