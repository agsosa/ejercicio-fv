import * as React from 'react';
import styled from 'styled-components';
import { ClientProfileData } from '../../types/order.interface';
import CardContainer from './CardContainer';

const ClientName = styled.span`
  font-weight: 500;
  font-size: 1.2rem;
`;

const ClientDataContainer = styled.div`
  display: flex;
  text-transform: uppercase;
  font-size: 1rem;

  > * + * { /* GAP */
    margin-left: 1.5rem;
  }
`;

interface PropTypes {
  client: ClientProfileData;
}

export default function ClientCard({ client }: PropTypes) {
  return (
    <CardContainer title='Detalles del cliente'>
      <ClientName>
        {client.firstName} {client.lastName}
      </ClientName>
      <ClientDataContainer>
        <span>
          {client.documentType} {client.document}
        </span>
        <span>TLF {client.phone}</span>
      </ClientDataContainer>
    </CardContainer>
  );
}
