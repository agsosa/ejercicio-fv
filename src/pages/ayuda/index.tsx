import * as React from 'react';
import type { NextPage } from 'next';
import issuesService from '../../services/issue.service';
import composerService from '../../services/composer.service';
import styled from 'styled-components';
import Issue, { Workflow } from '../../types/issue.interface';
import Order from '../../types/order.interface';
import IssueList from '../../components/issues/IssueList';
import OrdersList from '../../components/OrdersList';
import OrderDetails from '../../components/order-details';
import AlertMessage from '../../components/AlertMessage';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

enum ActionsEnum {
  SET_CURRENT_ISSUE = 'SET_CURRENT_ISSUE',
  SET_ISSUES = 'SET_ISSUES',
  ADVANCE_WORKFLOW_STEP = 'ADVANCE_WORKFLOW_STEP',
  SET_LOADING = 'SET_LOADING',
  SET_ORDER = 'SET_ORDER',
}

interface Action {
  type: ActionsEnum;
  payload: any;
}

interface State {
  issues?: Issue[];
  currentIssue?: Issue;
  order?: Order;
  workflowOrder: number;
  workflowType?: string;
  isLoading: boolean;
  error?: string;
}

const initialState: State = { isLoading: true, workflowOrder: 1 };

function reducer(state: State, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case ActionsEnum.SET_ISSUES:
      return { ...state, issues: payload, workflowOrder: 1, workflowType: null };
    case ActionsEnum.SET_CURRENT_ISSUE:
      return {
        ...state,
        issues: payload.childs?.length > 0 ? payload.childs : state.issues,
        currentIssue: payload,
        workflowOrder: 1,
        workflowType: payload?.workflow?.find((w: Workflow) => w.order === 1)?.type,
      };
    case ActionsEnum.ADVANCE_WORKFLOW_STEP:
      const newOrder = state.workflowOrder + 1;

      if (state.currentIssue?.workflow && newOrder > state.currentIssue.workflow.length) return state; // No aumentar workflow step si ya está en el último

      return {
        ...state,
        workflowOrder: newOrder,
        workflowType: state.currentIssue?.workflow?.find((w: Workflow) => w.order === newOrder)?.type,
      };
    case ActionsEnum.SET_ORDER:
      return { ...state, order: payload };
    case ActionsEnum.SET_LOADING:
      return { ...state, isLoading: payload };
    default:
      return state;
  }
}

const AyudaPage: NextPage = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const bShowIssuesList =
    Array.isArray(state.issues) && (state.workflowType == null || state.workflowType === 'SHOW_CHILDREN'); // ¿Mostrar lista de issues?
  const bShowOrdersList = !state.order && state.workflowType === 'SHOW_PRODUCT_SELECTION'; // ¿Mostrar lista de orders?
  const bShowOrderDetails = state.order && state.workflowType === 'SHOW_PRODUCT_SELECTION'; // ¿Mostrar detalle de order?

  // Obtener lista de issues (client side)
  const fetchIssues = async () => {
    dispatch({ type: ActionsEnum.SET_LOADING, payload: true });

    try {
      const { data } = await issuesService.findAll();

      dispatch({ type: ActionsEnum.SET_ISSUES, payload: data });
    } catch (err) {
      // TODO: handle error
      console.log(err);
    } finally {
      dispatch({ type: ActionsEnum.SET_LOADING, payload: false });
    }
  };

  // Obtener detalles de la order
  const fetchOrder = async (orderId: string) => {
    dispatch({ type: ActionsEnum.SET_LOADING, payload: true });

    try {
      const { data } = await composerService.findOne('test', 'test', 'test');

      dispatch({ type: ActionsEnum.SET_ORDER, payload: data });
    } catch (err) {
      // TODO: handle error
      console.log(err);
    } finally {
      dispatch({ type: ActionsEnum.SET_LOADING, payload: false });
    }
  };

  // Cambiar estado currentIssue cuando clickee una issue de la lista
  const handleIssueClick = (clicked: Issue) => dispatch({ type: ActionsEnum.SET_CURRENT_ISSUE, payload: clicked });

  // Seleccionar order
  const handleOrderClick = (orderId: string) => {
    fetchOrder(orderId);
  };

  // Obtener lista de issues al montar componente (client-side)
  React.useEffect(() => {
    fetchIssues();
  }, []);

  if (state.isLoading) return <b>Cargando...</b>;

  return (
    <>
      {state.currentIssue && (
        <TitleContainer>
          <h2>{state.currentIssue.title}</h2>
          <h3>{state.currentIssue.subReason_salesforce}</h3>
        </TitleContainer>
      )}
      {bShowIssuesList && <IssueList issues={state.issues} onIssueClick={handleIssueClick} />}
      {bShowOrdersList && <OrdersList onOrderClick={handleOrderClick} />}
      {bShowOrderDetails && <OrderDetails order={state.order} />}
      <AlertMessage warning message='test' />
      Current workflow type: {state.workflowType || 'None'} | Current workflow order: {state.workflowOrder}
    </>
  );
};

export default AyudaPage;
