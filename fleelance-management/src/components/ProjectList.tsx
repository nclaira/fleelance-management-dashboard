import type { Project } from '../types';
import { useAppContext } from '../context/AppContext'
import { getClientName } from '../utils/helpers';

// Define props interface for ProjectList
interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const { state, dispatch } = useAppContext();

  // Function to handle marking project as paid
  const handleMarkAsPaid = (projectId: string, amount: number) => {
    dispatch({
      type: 'MARK_PROJECT_PAID',
      payload: { projectId, amount }
    });
  };

  // Helper function for status styling
  const getStatusStyles = (status: Project['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for payment status styling
  const getPaymentStatusStyles = (paymentStatus: Project['paymentStatus']) => {
    return paymentStatus === 'paid' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-4">
      {projects.map(project => {
        const clientName = getClientName(state.clients, project.clientId);
        
        return (
          <div key={project.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(project.status)}`}>
                  {project.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusStyles(project.paymentStatus)}`}>
                  {project.paymentStatus}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <div>
                <p><span className="font-medium">Client:</span> {clientName}</p>
                <p><span className="font-medium">Budget:</span> RWF {project.budget.toLocaleString()}</p>
              </div>
              
              {/* Action button - only show for unpaid projects */}
              {project.paymentStatus === 'unpaid' && (
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => handleMarkAsPaid(project.id, project.budget)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Mark as Paid
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}