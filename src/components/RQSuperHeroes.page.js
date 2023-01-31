import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from '../hooks/useSuperHeroesData';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

const RQSuperHeroesPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');
  //on query success
  const onSuccessQ = (data) => {
    console.log('Side effects after successfully fetching data', data);
  };
  //on query failure
  const onErrorQ = (error) => {
    console.log(
      'Side effects after encountering error while fetching data',
      error
    );
  };

  // const { isLoading, data, isError, error, refetch, isFetching } = useQuery(
  //   'super-heroes',
  //   fetchSuperHeroes,
  //   {
  //     // cacheTime: 5000,
  //     // staleTime: 30000,
  //     // refetchOnMount: true, //possible values - always, true
  //     // refetchOnWindowFocus: true, //possible values - always, true
  //     // refetchInterval: 2000, // possible values - false, millisecond value
  //     // refetchIntervalInBackground : true,
  //     // enabled: false, // does not fetch data on mount, used to fetch data on user events
  //     onSuccess: onSuccessQ,
  //     onError: onErrorQ,
  //     select: (data) => {
  //       const superHeroNames = data.data.map((hero) => hero.name);
  //       return superHeroNames;
  //     },
  //   }
  // );

  const {
    mutate: addHero,
    isLoading: loadingMutation,
    isError: isErrorMutation,
    error: errorMutation,
  } = useAddSuperHeroData();
  
  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };
  // With custom hook
  const { isLoading, data, isError, error, refetch, isFetching } =
    useSuperHeroesData(onSuccessQ, onErrorQ);

  if (isLoading || isFetching) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.messsage}</h2>;

  return (
    <>
      <h2>RQ Super Heroes</h2>
      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroname) => {
        return <div key={heroname}>{heroname}</div>;
      })} */}
    </>
  );
};

export default RQSuperHeroesPage;
