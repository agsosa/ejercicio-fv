import * as React from 'react';
import styled from 'styled-components';
import Order from '../../types/order.interface';

const Container = styled.div`
  background-color: ${(props) => props.theme.main};
  margin-bottom: 1rem;
  padding: 14px;
  font-size: 1.5rem;
  border: 1px solid black;
`;

interface PropTypes {
  order: Order;
}

export default function OrderCard({ order }: PropTypes) {
  return <Container>detalles order {order.orderId}</Container>;
}
