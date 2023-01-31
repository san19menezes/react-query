import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentQueriesPage = ({ email }) => {
  // Step 1 - fetch channel Id
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;

  // Step 2 - fetch courses based on fetched channel id
  const { data: courses } = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );
  return <div>Dependent Queries Page</div>;
};

export default DependentQueriesPage;
