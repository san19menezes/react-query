import React from 'react';
import { useParams } from 'react-router-dom';
import { useSuperHeroData } from '../hooks/useSuperHeroData';

const RQSuperHeroPage = () => {
  // Use Params returns key value pair of id. Destructure that to extract the value only
  const { id } = useParams();

  const { isLoading, data, isError, error } = useSuperHeroData(id);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.messsage}</h2>;

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};

export default RQSuperHeroPage;
