import { useState } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'next/image';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebase/config';
import SnackbarAlert from '../Snackbar';
import { GameData } from '../../utilities/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        marginTop: 10,
        marginLeft: 20,
      },
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 800,
      marginBottom: 10,
    },
    header: {
      marginLeft: 20,
      fontWeight: 'bold',
      letterSpacing: 0.5,
      color: '#555',
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
      width: '70%',
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    imageCard: {
      position: 'relative',
      width: '168px',
      height: '168px',
      margin: 10,
    },
    image: {
      borderRadius: '6%',
      border: '5px solid #555',
    },
    button: {
      marginTop: 10,
      marginLeft: 20,
    },
  })
);

const validationSchema = yup.object({
  ingamename: yup.string().required('In Game Name is required'),
  ingameid: yup.string().required('In Game Id is required'),
});

const emptyValues = {
  ingamename: '',
  ingameid: '',
};

function GameForm({
  game,
  oldValues,
  addToCurrentGames,
}: {
  game: {
    gameCode: string;
    name: string;
    imageSource: string;
  };
  oldValues?: GameData;
  addToCurrentGames: (games: GameData) => void;
}) {
  const styles = useStyles();
  const { user } = useAuth();
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    severity: 'success' as const,
  });

  const handleSnackbarClose = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  const saveGame = async (gameData: {
    ingamename: string;
    ingameid: string;
  }) => {
    try {
      await db
        .collection('users')
        .doc(user.username)
        .collection('games')
        .doc(game.gameCode)
        .set({ gameCode: game.gameCode, ...gameData });
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: `${game.name} added!`,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const formik = useFormik({
    initialValues: {
      ...emptyValues,
      ...oldValues,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const { ingameid, ingamename } = values;
      setSubmitting(true);
      saveGame({ ingameid, ingamename });
      addToCurrentGames(values);
      resetForm();
      setSubmitting(false);
    },
  });

  return (
    <div className={styles.root}>
      <Typography variant="body1" className={styles.header}>
        {game.name}
      </Typography>
      <div className={styles.flexRow}>
        <div className={styles.imageCard}>
          <Image
            className={styles.image}
            src={game.imageSource}
            alt="Picture of the author"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <form className={styles.flexColumn} onSubmit={formik.handleSubmit}>
          <TextField
            type="text"
            name="ingamename"
            label="In Game Name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ingamename}
            error={
              formik.touched.ingamename && Boolean(formik.errors.ingamename)
            }
            helperText={formik.touched.ingamename && formik.errors.ingamename}
          />
          <TextField
            type="text"
            name="ingameid"
            label="In Game Id"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ingameid}
            error={formik.touched.ingameid && Boolean(formik.errors.ingameid)}
            helperText={formik.touched.ingameid && formik.errors.ingameid}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
            className={styles.button}
            color="secondary"
          >
            Save Game
          </Button>
        </form>
      </div>
      <SnackbarAlert
        vertical="bottom"
        horizontal="right"
        open={snackbarData.open}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        message={snackbarData.message}
        severity={snackbarData.severity}
      />
    </div>
  );
}

export default GameForm;
