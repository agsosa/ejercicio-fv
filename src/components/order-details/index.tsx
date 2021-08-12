import * as React from 'react';
import styled from 'styled-components';
import Order from '../../types/order.interface';
import ClientCard from './ClientCard';
import ProductsCard from './ProductsCard';
import OrderDetails from './OrderDetails';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Summary = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;

  > * + * {
    /* GAP */
    margin-left: 3rem;
  }
`;

interface PropTypes {
  order: Order;
}

export default function OrderCard({ order }: PropTypes) {
  const { clientProfileData, orderId, creationDate, items } = order;

  return (
    <Container>
      <Summary>
        <ClientCard client={clientProfileData} />
        <OrderDetails order={order} />
      </Summary>

      <ProductsCard products={items} />
    </Container>
  );
}
