import React, { useState } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

import useStyles from './styles';
import { useGetActorDetailQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import { MovieList, Pagination } from '..';

const Actors = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorDetailQuery(id);
  const { data: actorMovies, isFetching: isActorsMovieFetching } = useGetMoviesByActorIdQuery({ id, page });
  const history = useHistory();

  if (isFetching || isActorsMovieFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">Go Back</Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>{data?.name}</Typography>
          <Typography variant="h5" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
          <Typography variant="body1" align="justify" paragraph>{data?.biography || 'Sorry, no biography yet...'}</Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">Back</Button>
          </Box>
        </Grid>

      </Grid>
      <Box margin="2rem" width="100%">
        <Typography variant="h2" align="center" gutterBottom>Movies</Typography>
        {actorMovies
          ? <MovieList movies={actorMovies} numberOfMovies={12} />
          : <Box>Sorry, nothing is found.</Box>
        }
        <Pagination currentPage={page} setPage={setPage} totalPages={actorMovies?.total_pages} />
      </Box>
    </>
  );
};

export default Actors;
