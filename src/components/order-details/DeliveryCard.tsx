import * as React from 'react';
import { ItemsByDelivery } from '../../types/order.interface';
import ProductCard from './Product';
import CardContainer from './CardContainer';
import { AiFillCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';

const TrackIcon = styled(AiFillCheckCircle)`
  color: ${(props: { enabled: boolean }) => (props.enabled ? 'green' : 'red')};
`;

interface PropTypes {
  delivery: ItemsByDelivery;
}

export default function DeliveryCard({ delivery }: PropTypes) {
  const RightComponent = <TrackIcon enabled={delivery.enabled} />;

  return (
    <CardContainer title={`Envío #${delivery.deliveryId}`} RightComponent={RightComponent}>
      {delivery.items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </CardContainer>
  );
}
