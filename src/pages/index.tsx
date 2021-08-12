import * as React from 'react';
import type { NextPage } from 'next';
import issuesService from '../services/issue.service';
import styled from 'styled-components';
import Issue from '../types/issue.interface';
import IssueCard from '../components/IssueCard';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.silver};
`;

const IssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  background-color: ${(props) => props.theme.silver};
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
    <PageContainer>
      <IssuesContainer>
        {data.map((d) => (
          <IssueCard key={d.issueId} issue={d} />
        ))}
      </IssuesContainer>
    </PageContainer>
  );
};

export default Home;
