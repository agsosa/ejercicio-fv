import styled from 'styled-components';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Container = styled.div`
  border-radius: 0.75rem;
  padding: 1.5rem;
  font-size: 1.5rem;
  background-color: ${(props) => (props.warning ? '#FFF3CD' : '#CCE5FF')};
`;

interface PropTypes {
  message: string;
  warning?: boolean;
}

export default function AlertMessage({ message, warning }: PropTypes) {
  return <Container warning={warning}>{message}</Container>;
}
