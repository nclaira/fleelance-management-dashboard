import { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { DashboardStats } from './components/DashboardStats';
import { ClientCard } from './components/ClientCard';
import { ProjectList } from './components/ProjectList';
import { Sidebar } from './components/Sidebar';

function DashboardContent() {
  
  const { state } = useAppContext();
  

  const [activeSection, setActiveSection] = useState('dashboard');

  
  const renderContent = () => {
  
    switch (activeSection) {
      
      case 'clients':
        return (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Clients</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {state.clients.length} clients
              </span>
            </div>
            <div className="grid gap-4">
          
              {state.clients.map(client => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </section>
        );

      case 'projects':
        return (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {state.projects.length} projects
              </span>
            </div>
           
            <ProjectList projects={state.projects} />
          </section>
        );

     
      case 'payments':
        return (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payments</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              {state.payments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No payments recorded yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state.payments.map((payment, index) => (
                        // <tr key={index} className="hover:bg-gray-50">
                        //   <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.projectId}</td>
                        //   <td className="px-6 py-4 text-sm text-gray-900">RWF{payment.amount.toLocaleString()}</td>
                        //   <td className="px-6 py-4 text-sm text-gray-500">
                        //     {new Date(payment.date).toLocaleDateString()}
                        //   </td>
                        // </tr>
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.projectId}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">RWF{payment.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        );

      
      case 'reports':
        return (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reports & Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                <div className="space-y-2">
                  <p>Total Revenue: RFW{state.payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                  <p>Pending Payments: RWF{state.projects
                    .filter(p => p.paymentStatus === 'unpaid')
                    .reduce((sum, p) => sum + p.budget, 0)
                    .toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Project Status</h3>
                <div className="space-y-2">
                  <p>Completed: {state.projects.filter(p => p.status === 'completed').length}</p>
                  <p>In Progress: {state.projects.filter(p => p.status === 'in-progress').length}</p>
                  <p>Pending: {state.projects.filter(p => p.status === 'pending').length}</p>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return (
          <>


<div className="bg-sky-900 rounded-2xl p-8 text-white shadow-xl">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
    <div className="flex-1">
      <h1 className="text-3xl lg:text-4xl font-bold mb-3">
        Welcome back!
      </h1>
      <p className="text-blue-100 text-lg mb-4 lg:mb-0">
        Track your projects, manage clients, and grow your freelance business.
      </p>
    </div>
    
    <div className="flex space-x-4 lg:space-x-6">
      <div className="text-center">
        <div className="text-2xl font-bold">RWF {state.payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</div>
        <div className="text-blue-200 text-sm">Total Revenue</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{state.clients.length}</div>
        <div className="text-blue-200 text-sm">Active Clients</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{state.projects.length}</div>
        <div className="text-blue-200 text-sm">Projects</div>
      </div>
    </div>
  </div>
</div>





            {/* Show dashboard statistics */}
            <DashboardStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Clients</h2>
                <div className="space-y-4">
                  {/* Show only first 3 clients */}
                  {state.clients.slice(0, 3).map(client => (
                    <ClientCard key={client.id} client={client} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Projects</h2>
                <ProjectList projects={state.projects.filter(p => p.status !== 'completed')} />
              </section>
            </div>
          </>
        );
    }
  };

  return (
   
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
    
      <div className="flex-1 lg:ml-0"> 
        <main className="p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}


function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}

export default App;