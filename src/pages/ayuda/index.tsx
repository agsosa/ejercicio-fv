import * as React from 'react';
import type { NextPage } from 'next';
import issuesService from '../../services/issue.service';
import styled from 'styled-components';
import Issue, { Workflow } from '../../types/issue.interface';
import IssueList from '../../components/issues/IssueList';
import AlertMessage from '../../components/AlertMessage';

const PageContainer = styled.main`
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
  const [issues, setIssues] = React.useState<Issue[]>([]); // Lista de issues, ya sea cargada desde la API o mediante la propiedad childs de una issue clickeada

  const [currentIssue, setCurrentIssue] = React.useState<Issue | null>(null); // Issue seleccionado
  const [currentStep, setCurrentStep] = React.useState<Workflow | null>(null);

  const getCurrentStep = () => currentIssue?.workflow?.find((w) => w.order === 1)?.type;

  // Cuando clickee un issue de la lista
  const handleIssueClick = (clicked: Issue) => {
    // Si el issue clickeado tiene childs o el paso actual es SHOW_CHILDREN, reemplazar la lista de issues actual con childs
    if (getCurrentStep() === 'SHOW_CHILDREN') {
      setIssues(clicked.childs);
    }

    setCurrentIssue(clicked);
  };

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

  return (
    <PageContainer>
      <a href='/ayuda'>
        <h1>Centro de Ayuda</h1>
      </a>

      {currentIssue && <h2>{currentIssue.title}</h2>}

      {Array.isArray(issues) && <IssueList issues={issues} onIssueClick={handleIssueClick} />}

      <AlertMessage warning message='test' />
    </PageContainer>
  );
};

export default AyudaPage;
