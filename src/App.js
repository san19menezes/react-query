import { Routes, Route, Link } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import HomePage from './components/Home.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import SuperHeroesPage from './components/SuperHeroes.page';

import './App.css';
import RQSuperHeroPage from './components/RQSuperHero.page';
import ParallelQueriesPage from './components/ParallelQueries.page';
import DynamicParallelPage from './components/DynamicParallelQueries.page';
import DependentQueriesPage from './components/DependentQueries.page';
import { PaginatedQueriesPage } from './components/PaginatedQueries.page';
import { InfiniteQueriesPage } from './components/InfiniteQueries.page';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/rq-infinite' element={<InfiniteQueriesPage />} />
          <Route path='/rq-paginated' element={<PaginatedQueriesPage />} />
          <Route
            path='/rq-dependent'
            element={<DependentQueriesPage email='abc@gmail.com' />}
          />
          <Route
            path='/rq-dynamic-parallel'
            element={<DynamicParallelPage heroIds={[1, 3]} />}
          />
          <Route path='/rq-parallel' element={<ParallelQueriesPage />} />
          <Route path='/rq-super-heroes/:id' element={<RQSuperHeroPage />} />
          <Route path='/super-heroes' element={<SuperHeroesPage />} />
          <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
