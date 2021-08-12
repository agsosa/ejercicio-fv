// NOTA: Lista de ordenes de ejemplo
import styled from 'styled-components';

const ORDERS = ['v687590vlq-01', 'v687592vlq-01', 'v687595vlq', 'v687599vlq', 'v687604vlq', 'v687606vlq'];

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const OrderCard = styled.div`
  background-color: white;
  border: 1px solid silver;
  padding: 1.5rem;
  margin: 1rem;
  text-align: center;
  border-radius: 1.5rem;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    transform: scale(1.05);
  }
`;

export default function OrdersList() {
  return (
    <Container>
      {ORDERS.map((o) => (
        <OrderCard key={o}>
          Pedido <b>#{o}</b>
        </OrderCard>
      ))}
    </Container>
  );
}
