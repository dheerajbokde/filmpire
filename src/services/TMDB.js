import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({
        //* Get Movies by Type
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                // console.log(genreIdOrCategoryName);

                //* Get Movies by Search
                if (searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }

                //* Get Movies by Category - popular. top_rated, upcoming
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }

                //* Get Movies by Genre - popular. top_rated, upcoming
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }

                //* Get Popular Movies
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),

        //* Get Genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
        }),

        //* Get Movie
        getMovie: builder.query({
            query: (id) => `/movie/${id}?api_key=${tmdbApiKey}&append_to_response=videos,credits`,
        }),

        //* Get user specific movie lists
        getRecommendations: builder.query({
            query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
        }),

        //* Get Actor's Detail
        getActorDetail: builder.query({
            query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
        }),

        //* Get Actor's Movies
        getMoviesByActorId: builder.query({
            query: (id, page) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
        }),

        //* Get favorite/watchlist movies
        getList: builder.query({
            query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorDetailQuery,
    useGetMoviesByActorIdQuery,
    useGetListQuery,
} = tmdbApi;