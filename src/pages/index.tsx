import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import issuesService from '../services/issue.service';
import styled from 'styled-components';
import Issue from '../types/issue.interface';
import IssueCard from '../components/IssueCard';

const IssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem;
`;

const Home: NextPage = () => {
  const [data, setData] = React.useState<Issue[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await issuesService.findAll();
        setData(data);
      } catch (err) {
        // TODO: handle error
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <IssuesContainer>
        {data.map((d) => (
          <IssueCard key={d.issueId} issue={d} />
        ))}
      </IssuesContainer>
    </div>
  );
};

export default Home;
