import * as React from 'react';
import issuesService from '../services/issue.service';
import composerService from '../services/composer.service';
import Issue, { Workflow } from '../types/issue.interface';
import Order from '../types/order.interface';

enum ActionsEnum {
  SET_CURRENT_ISSUE = 'SET_CURRENT_ISSUE',
  SET_ISSUES = 'SET_ISSUES',
  SET_LOADING = 'SET_LOADING',
  SET_ORDER = 'SET_ORDER',
  INCREMENT_WORKFLOW_STEP = 'INCREMENT_WORKFLOW_STEP',
  SET_ERROR = 'SET_ERROR',
}

interface Action {
  type: ActionsEnum;
  payload?: any;
}

interface State {
  issues?: Issue[]; // Lista de issues cargada
  currentIssue?: Issue; // Issue seleccionado
  order?: Order; // Order seleccionado
  workflowOrder: number; // Orden actual de workflow
  workflowType?: string; // Tipo workflow actual
  isLoading: boolean; // Si está cargando
  error?: string; // Si hay un error
}

const initialState: State = { isLoading: true, workflowOrder: 1 };

function reducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    // Set issues list & reset workflow
    case ActionsEnum.SET_ISSUES:
      return { ...state, issues: payload, workflowOrder: 1, workflowType: undefined };
    // Set current issue, replace issues list with children issues if possible & reset workflow
    case ActionsEnum.SET_CURRENT_ISSUE:
      return {
        ...state,
        issues: payload.childs?.length > 0 ? payload.childs : state.issues, // if we have children, replace the issues list with them
        currentIssue: payload,
        workflowOrder: 1,
        workflowType: payload?.workflow?.find((w: Workflow) => w.order === 1)?.type,
      };
    // Get next workflow type
    case ActionsEnum.INCREMENT_WORKFLOW_STEP:
      const newOrder = state.workflowOrder + 1;

      if (state.currentIssue && newOrder <= state.currentIssue.workflow.length) {
        // Only increment workflow order if we have a valid currentIssue and newOrder is in range of currentIssue.workflow.length
        return {
          ...state,
          workflowOrder: newOrder,
          workflowType: state.currentIssue.workflow.find((w: Workflow) => w.order === newOrder)?.type,
        };
      } else return state;
    // Set current order
    case ActionsEnum.SET_ORDER:
      return { ...state, order: payload };
    // Set loading state
    case ActionsEnum.SET_LOADING:
      return { ...state, isLoading: payload };
    // Set error state
    case ActionsEnum.SET_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
}

const useIssues = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setIssue = (issue: Issue) => dispatch({ type: ActionsEnum.SET_CURRENT_ISSUE, payload: issue });
  const setLoading = (bLoading: boolean) => dispatch({ type: ActionsEnum.SET_LOADING, payload: bLoading });
  const setError = (errorMessage: string) => dispatch({ type: ActionsEnum.SET_ERROR, payload: errorMessage });
  const setIssues = (issues: Issue[]) => dispatch({ type: ActionsEnum.SET_ISSUES, payload: issues });
  const setOrder = (order: Order) => dispatch({ type: ActionsEnum.SET_ORDER, payload: order });
  const incrementWorkflowStep = () => dispatch({ type: ActionsEnum.INCREMENT_WORKFLOW_STEP });

  // Obtener lista de issues (client side)
  const fetchIssues = async () => {
    setLoading(true);

    try {
      const { data } = await issuesService.findAll();

      setIssues(data);
    } catch (err) {
      // TODO: handle error
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener detalles de la orderId (client side)
  const fetchOrder = async (orderId: string) => {
    setLoading(true);

    try {
      const { data } = await composerService.findOne('test', 'test', 'test');

      setOrder(data);
    } catch (err) {
      // TODO: handle error
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener lista de issues al montar componente (client-side)
  React.useEffect(() => {
    fetchIssues();
  }, []);

  return {
    state,
    fetchOrder,
    setIssue,
    setLoading,
    setOrder,
    setError,
    incrementWorkflowStep,
    setIssues,
  };
};

export default useIssues;
