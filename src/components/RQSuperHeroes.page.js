import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, refetch, isFetching } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      // cacheTime: 5000,
      // staleTime: 30000,
      // refetchOnMount: true, //possible values - always, true
      // refetchOnWindowFocus: true, //possible values - always, true
      // refetchInterval: 2000, // possible values - false, millisecond value
      // refetchIntervalInBackground : true,
      // enabled: false, // does not fetch data on mount, used to fetch data on user events
    }
  );

  if (isLoading || isFetching) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.messsage}</h2>;

  return (
    <>
      <h2>RQ Super Heroes</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;
