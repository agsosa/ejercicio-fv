import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 1.5rem 0 1.5rem;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  margin-bottom: 0.8rem;
`;

const CardTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 300;
`;

interface PropTypes {
  children: React.ReactNode;
  RightComponent?: React.ReactNode;
  title: string;
}

export default function ClientCard({ children, title, RightComponent }: PropTypes) {
  return (
    <Container>
      <Header>
        <CardTitle>{title}</CardTitle> {RightComponent}
      </Header>
      {children}
    </Container>
  );
}
