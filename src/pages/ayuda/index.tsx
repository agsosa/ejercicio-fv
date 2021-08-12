import * as React from 'react';
import type { NextPage } from 'next';
import issuesService from '../../services/issue.service';
import styled from 'styled-components';
import Issue from '../../types/issue.interface';
import IssueCard from '../../components/IssueCard';
import AlertMessage from '../../components/AlertMessage';
import { BiHelpCircle } from 'react-icons/bi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PageContainer = styled.div`
  display: flex;
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

const AyudaPage: NextPage = () => {
  const [issues, setIssues] = React.useState<Issue[]>([]);

  const [currentIssue, setCurrentIssue] = React.useState<Issue | null>(null); // Issue seleccionado

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await issuesService.findAll();
        setIssues(data);
      } catch (err) {
        // TODO: handle error
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // Cuando clickee un issue de la lista
  const handleIssueClick = (clicked: Issue) => {
    if (clicked.childs.length > 0) setIssues(clicked.childs);
    setCurrentIssue(clicked);
  };

  return (
    <PageContainer>
      <Link href='/ayuda'>
        <a>
          <h1>Centro de Ayuda</h1>
        </a>
      </Link>
      <IssuesContainer>
        {currentIssue && (
          <div>
            <BiHelpCircle />
            <h2>{currentIssue.title}</h2>
          </div>
        )}
        {issues.map((d) => (
          <IssueCard key={d.issueId} issue={d} onClick={handleIssueClick} />
        ))}
        <AlertMessage warning message='test' />
      </IssuesContainer>
    </PageContainer>
  );
};

export default AyudaPage;
