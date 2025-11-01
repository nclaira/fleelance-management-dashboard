
// Create Client interface
export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string; 
}

// Project interface 
export interface Project {
  id: string;
  clientId: string;
  title: string;
  budget: number;
  status: "pending" | "in-progress" | "completed";
  paymentStatus: "paid" | "unpaid";
}

// Payment interface
export interface Payment {
  projectId: string;
  amount: number;
  date: string; // ISO format
}

// main application state
export interface AppState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}