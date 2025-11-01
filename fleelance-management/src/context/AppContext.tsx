import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppState, Client, Project, Payment } from '../types';
import { initialClients, initialProjects, initialPayments } from '../data/sampleData';

// Define our action types using discriminated unions
type AppAction =
  | { type: 'MARK_PROJECT_PAID'; payload: { projectId: string; amount: number } }
  | { type: 'ADD_PAYMENT'; payload: Payment }
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'ADD_PROJECT'; payload: Project };


const initialState: AppState = {
  clients: initialClients,
  projects: initialProjects,
  payments: initialPayments,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'MARK_PROJECT_PAID':
      const { projectId, amount } = action.payload;
      
      // Update project payment status
      const updatedProjects = state.projects.map(project =>
        project.id === projectId 
          ? { ...project, paymentStatus: 'paid' as const }
          : project
      );

      // Add new payment record
      const newPayment: Payment = {
        projectId,
        amount,
        date: new Date().toISOString(),
      };

      return {
        ...state,
        projects: updatedProjects,
        payments: [...state.payments, newPayment],
      };

    case 'ADD_PAYMENT':
      return {
        ...state,
        payments: [...state.payments, action.payload],
      };

    case 'ADD_CLIENT':
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    default:
      return state;
  }
}

// Create Context with initial undefined value but proper typing
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}