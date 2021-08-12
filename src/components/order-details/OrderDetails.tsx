import * as React from 'react';
import styled, { css } from 'styled-components';
import Order from '../../types/order.interface';
import CardContainer from './CardContainer';

const Description = styled.span`
  color: gray;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Upper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Value = styled.span`
  font-size: 1.2rem;
  ${props => props.important && css`font-weight: 500;`}
`;

interface PropTypes {
  order: Order;
}

export default function OrderDetails({ order }: PropTypes) {
  return (
    <CardContainer title='Detalles de la orden'>
      <Upper>
        <VStack>
          <Description>Fecha</Description> <Value>{order.creationDate}</Value>
        </VStack>
        <VStack>
          <Description>Identificador</Description> <Value>#{order.orderId}</Value>
        </VStack>
        <VStack>
        <Description>Total</Description> <Value important>${order.amount}</Value>
      </VStack>
      </Upper>
    </CardContainer>
  );
}
