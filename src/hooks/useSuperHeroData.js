import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

// const fetchSuperHero = ( heroId ) => {
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };
const fetchSuperHero = ({ queryKey }) => {
  // query key mimics the array passed in the useQuery hook
  const heroId = queryKey[1];

  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
export const useSuperHeroData = (heroId) => {
  // return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId));

  //Use this when you fetch the Id from query key
  // return useQuery(['super-hero', heroId], fetchSuperHero);

  // For initial Query data - query client has access to the initial cache
  const queryClient = useQueryClient();
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
};
