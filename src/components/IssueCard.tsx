import * as React from 'react';
import styled from 'styled-components';
import Issue from '../types/issue.interface';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 1rem;
  padding: 1rem 2rem;
  font-size: 1.5rem;
`;

interface PropTypes {
  issue: Issue;
  onClick: (issue: Issue) => void;
}

export default function IssueCard({ issue, onClick }: PropTypes) {
  const handleClick = () => {
    if (onClick) onClick(issue);
  };

  return (
    <Container onClick={handleClick}>
      <span>{issue.title}</span> <AiOutlineArrowRight />
    </Container>
  );
}
