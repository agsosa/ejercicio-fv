import * as React from 'react';
import styled from 'styled-components';
import Issue from '../types/issue.interface';

const Container = styled.div`
  background-color: ${(props) => props.theme.main};
  margin-bottom: 1rem;
  padding: 14px;
  font-size: 1.5rem;
  border: 1px solid black;
`;

interface PropTypes {
  issue: Issue;
}

export default function IssueCard({ issue }: PropTypes) {
  return <Container>{issue.title}</Container>;
}
