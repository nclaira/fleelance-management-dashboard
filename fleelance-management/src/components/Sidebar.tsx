import { useState } from 'react';

interface SidebarProps {
  activeSection: string;        
  onSectionChange: (section: string) => void;  // Function to change sections
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);


  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'payments', label: 'Payments', icon: '💰' },
    { id: 'reports', label: 'Reports', icon: '📈' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md"
      >
        ☰ 
      </button>

     
     {/* sidebar */}
      <div className={`
        /* Fixed positioning for mobile, static for desktop */
        fixed lg:static inset-y-0 left-0 z-40
        /* Styling */
        bg-sky-800 text-white w-64 transform
        /* Animation - slides in/out on mobile */
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300
      `}>
        
       
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">Freelance Dashboard</h1>
          <p className="text-gray-400 text-sm">Manage your business</p>
        </div>

       
        <nav className="p-4">
          <ul className="space-y-2">  
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onSectionChange(item.id); 
                    if (window.innerWidth < 1024) { 
                      setIsOpen(false);
                    }
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-colors
                    flex items-center space-x-3   
                    ${activeSection === item.id
                      ? 'bg-blue-600 text-white'      
                      : 'text-gray-300 hover:bg-sky-700'  
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

       
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm">👤</span>  {/* User avatar */}
            </div>
            <div>
              <p className="text-sm font-medium">Freelancer</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>

    
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}