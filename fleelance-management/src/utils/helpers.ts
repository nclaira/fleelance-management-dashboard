import type  { AppState, Client, Project, Payment } from '../types';

//Count paid and unpaid projects
export function countPaymentStatus(projects: Project[]): { paid: number; unpaid: number } {
  return projects.reduce(
    (counts, project) => {
      if (project.paymentStatus === 'paid') {
        counts.paid += 1;
      } else {
        counts.unpaid += 1;
      }
      return counts;
    },
    { paid: 0, unpaid: 0 }
  );
}

export function findClientById(clients: Client[], clientId: string): Client | undefined {
  return clients.find(client => client.id === clientId);
}

export function recordPayment(
  projectId: string, 
  amount: number, 
  existingPayments: Payment[]
): Payment {
 
  if (amount <= 0) {
    throw new Error('Payment amount must be positive');
  }

  const newPayment: Payment = {
    projectId,
    amount,
    date: new Date().toISOString(),
  };


  const existingPayment = existingPayments.find(p => p.projectId === projectId);
  if (existingPayment) {
    console.warn('Payment already exists for this project');
  }

  return newPayment;
}

export function getClientName(clients: Client[], clientId: string): string {
  const client = findClientById(clients, clientId);
  
  if (client) {
    return client.name;
  } else {
    return 'Client not found';
  }
}

export function filterProjects(
  projects: Project[], 
  filters: { status?: Project['status']; paymentStatus?: Project['paymentStatus'] }
): Project[] {
  return projects.filter(project => {
    if (filters.status && project.status !== filters.status) return false;
    if (filters.paymentStatus && project.paymentStatus !== filters.paymentStatus) return false;
    return true;
  });
}


export function searchItems<T extends Client | Project>(
  items: T[], 
  searchTerm: string
): T[] {
  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    'name' in item ? item.name.toLowerCase().includes(term) : 
    'title' in item ? item.title.toLowerCase().includes(term) : 
    false
  );
}


export function getDashboardStats(state: AppState) {
  const paymentCounts = countPaymentStatus(state.projects);
  
  return {
    totalClients: state.clients.length,
    totalProjects: state.projects.length,
    totalPayments: state.payments.length,
    paidProjects: paymentCounts.paid,
    unpaidProjects: paymentCounts.unpaid,
    totalRevenue: state.payments.reduce((sum, payment) => sum + payment.amount, 0),
  };
}