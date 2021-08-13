import * as React from 'react';
import styled from 'styled-components';
import Order from '../../types/order.interface';
import ClientCard from './ClientCard';
import DeliveryCard from './DeliveryCard';
import OrderDetails from './OrderDetails';
import AlertMessage from '../AlertMessage';

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
  const { clientProfileData, itemsByDelivery } = order;
  
  return (
    <Container>
      <Summary>
        <ClientCard client={clientProfileData} />
        <OrderDetails order={order} />
      </Summary>

      {itemsByDelivery.length === 0 && <AlertMessage warning message="No se puede trackear el envío ya que la orden es de retiro en sucursal." />}

      {itemsByDelivery.length > 0 && itemsByDelivery.map((d) => (
        <DeliveryCard key={d.id} delivery={d} />
      ))}
    </Container>
  );
}
