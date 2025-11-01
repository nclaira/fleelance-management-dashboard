import type { Client } from '../types/index';

// Define props interface for ClientCard
interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{client.name}</h3>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Country:</span> {client.country}
      </p>
      {/* Safely handle optional email with conditional rendering */}
      {client.email ? (
        <p className="text-gray-600">
          <span className="font-medium">Email:</span> {client.email}
        </p>
      ) : (
        <p className="text-gray-500 italic">No email provided</p>
      )}
    </div>
  );
}