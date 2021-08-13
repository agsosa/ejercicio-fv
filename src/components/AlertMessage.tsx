import styled from 'styled-components';

const Container = styled.div`
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  background-color: ${(props: { warning?: boolean }) => {
    if (props.warning) return '#FFF4CF';
    else return '#CCE5FF';
  }};
`;

interface PropTypes {
  message: string;
  warning?: boolean;
}

export default function AlertMessage({ message, warning }: PropTypes) {
  return <Container warning={warning}>{message}</Container>;
}
