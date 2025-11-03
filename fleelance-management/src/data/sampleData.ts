import type { Client, Project, Payment } from '../types';

//create arrays to initialize the app state

export const initialClients: Client[] = [
  {
    id: "1",
    name: "Peter",
    country: "Rwanda",
    email: "contact@peter.com"
  },
  {
    id: "2", 
    name: "John",
    country: "Rwanda",
  }
];

export const initialProjects: Project[] = [
  {
    id: "1",
    clientId: "1",
    title: "E-commerce Website",
    budget: 700000,
    status: "in-progress",
    paymentStatus: "unpaid"
  },
  {
    id: "2",
    clientId: "2", 
    title: "Mobile App Development",
    budget: 800000,
    status: "completed",
    paymentStatus: "paid"
  }
];

export const initialPayments: Payment[] = [
  {
    projectId: "2",
    amount: 80000,
    date: "2024-01-15T00:00:00.000Z"
  }
];