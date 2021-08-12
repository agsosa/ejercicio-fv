import * as React from 'react';
import type { NextPage } from 'next';
import issuesService from '../services/issue.service';
import styled from 'styled-components';
import Issue from '../types/issue.interface';
import IssueCard from '../components/IssueCard';
import AlertMessage from '../components/AlertMessage';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.silver};
`;

const IssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 64rem;
  background-color: ${(props) => props.theme.silver};
`;

const Home: NextPage = () => {
  const [data, setData] = React.useState<Issue[]>([]);
  const [currentIssue, setCurrentIssue] = React.useState<Issue | null>(null);

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

  const handleIssueClick = (issue: Issue) => {
    setCurrentIssue(issue);
  };

  return (
    <PageContainer>
      <h1>Centro de Ayuda</h1>
      <IssuesContainer>
        {currentIssue && currentIssue.title}
        {data.map((d) => (
          <IssueCard key={d.issueId} issue={d} onClick={handleIssueClick} />
        ))}
        <AlertMessage warning message='test' />
      </IssuesContainer>
    </PageContainer>
  );
};

export default Home;
