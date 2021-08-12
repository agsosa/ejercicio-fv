import * as React from 'react';
import styled from 'styled-components';
import Issue from '../../types/issue.interface';
import IssueCard from '../../components/issues/IssueCard';

const IssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 64rem;
  background-color: ${(props) => props.theme.silver};
`;

interface PropTypes {
  issues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

const IssueList = ({ issues, onIssueClick }: PropTypes) => {
  return (
    <IssuesContainer>
      {issues.map((d) => (
        <IssueCard key={d.issueId} issue={d} onClick={onIssueClick} />
      ))}
    </IssuesContainer>
  );
};

export default IssueList;
