import * as React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import Issue from '../../types/issue.interface';
import IssueList from '../../components/issues/IssueList';
import OrdersList from '../../components/OrdersList';
import OrderDetails from '../../components/order-details';
import ContentContainer from '../../components/layout/ContentContainer';
import useIssues from '../../lib/useIssues';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AyudaPage: NextPage = () => {
  const { state, setIssue, fetchOrder } = useIssues();

  // ¿Mostrar lista de issues?
  const bShowIssuesList = state.workflowType == null || state.workflowType === 'SHOW_CHILDREN';

  // ¿Mostrar lista de orders?
  const bShowOrdersList = !state.order && state.workflowType === 'SHOW_PRODUCT_SELECTION';

  // ¿Mostrar detalle de order?
  const bShowOrderDetails = state.order != null;

  // ¿Mostrar información extra?
  const bShowExtraInformation = state.workflowType === 'SHOW_EXTRA_INFORMATION';

  // Al hacer click en una issue
  const handleIssueClick = (clicked: Issue) => setIssue(clicked);

  // Al hacer click en una order
  const handleOrderClick = (orderId: string) => fetchOrder(orderId);

  if (state.isLoading) return <b>Cargando...</b>;

  return (
    <ContentContainer>
      {state.currentIssue && (
        <TitleContainer>
          <h2>{state.currentIssue.title}</h2>
        </TitleContainer>
      )}
      {bShowIssuesList && state.issues && <IssueList issues={state.issues} onIssueClick={handleIssueClick} />}
      {bShowOrdersList && <OrdersList onOrderClick={handleOrderClick} />}
      {bShowExtraInformation && state.currentIssue && <span>{JSON.stringify(state.currentIssue.extraInformation)}</span>}
      {state.order && <OrderDetails order={state.order} />}
      Current workflow type: {state.workflowType || 'None'} | Current workflow order: {state.workflowOrder}
    </ContentContainer>
  );
};

export default AyudaPage;
