import * as React from 'react';
import styled from 'styled-components';
import { Item } from '../../types/order.interface';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0.5rem;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  border-radius: 0.5rem;
`;

const Left = styled.div`
  display: flex;
`;

const ProductImage = styled.img`
  border-radius: 100%;
  height: 65px;
`;

const NameContainer = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductName = styled.span`
  font-size: 1.2rem;
`;

const SellerName = styled.span`
  font-size: 1rem;
  color: gray;
  margin-right: 1.1rem;
`;

interface PropTypes {
  product: Item;
}

export default function Product({ product }: PropTypes) {
  return (
    <Container>
      <Left>
        <ProductImage src={product.imageUrl} />
        <NameContainer>
          <ProductName>{product.name}</ProductName>
          <div>
            <SellerName>Vendedor: {product.seller.name}</SellerName>
            <SellerName>Cantidad: {product.quantity}</SellerName>
          </div>
        </NameContainer>
      </Left>
      <span>${product.price}</span>
    </Container>
  );
}
