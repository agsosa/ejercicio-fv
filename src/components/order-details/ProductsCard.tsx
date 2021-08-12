import * as React from 'react';
import { Item } from '../../types/order.interface';
import ProductCard from './Product';
import CardContainer from './CardContainer';

interface PropTypes {
  products: Item[];
}

export default function ProductsCard({ products }: PropTypes) {
  return (
    <CardContainer title='Lista de productos'>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </CardContainer>
  );
}
