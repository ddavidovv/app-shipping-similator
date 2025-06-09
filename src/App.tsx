import React, { useState } from 'react';
import DeliveryChain from './components/DeliveryChain';
import OptionsPanel from './components/OptionsPanel';
import { Package, DeliveryStage, StageEvent } from './types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import './App.css';

function App() {
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);
  const [selectedStage, setSelectedStage] = useState<DeliveryStage | null>(null);
  const [events, setEvents] = useState<StageEvent[]>([]);
  const [eventLogExpanded, setEventLogExpanded] = useState(false);

  const handleStageClick = (stage: DeliveryStage) => {
    setSelectedStage(stage);
  };

  const handleCreatePackage = (origin: string, destination: string) => {
    const newPackage: Package = {
      id: `PKG-${Math.floor(Math.random() * 10000)}`,
      origin,
      destination,
      status: 'registered',
      currentStage: 'customer',
      createdAt: new Date(),
    };
    setCurrentPackage(newPackage);
    
    const newEvent: StageEvent = {
      packageId: newPackage.id,
      stage: 'customer',
      action: 'service_request',
      timestamp: new Date(),
      details: { origin, destination }
    };
    
    setEvents([...events, newEvent]);
  };

  const handleRegisterEvent = (stage: DeliveryStage, action: string, details: Record<string, any> = {}) => {
    if (!currentPackage) return;
    
    const newEvent: StageEvent = {
      packageId: currentPackage.id,
      stage,
      action,
      timestamp: new Date(details.timestamp || new Date()),
      details
    };
    
    setEvents([...events, newEvent]);
    
    // Update package status based on the event
    let newStatus = currentPackage.status;
    let newStage = stage;
    
    switch (action) {
      case 'pickup':
        newStatus = 'picked_up';
        break;
      case 'origin_hub_sort':
        newStatus = 'in_transit';
        break;
      case 'destination_hub_sort':
        newStatus = 'sorting_completed';
        break;
      case 'assign_for_delivery':
        newStatus = 'out_for_delivery';
        break;
      case 'delivery_issue':
        newStatus = 'delivery_attempted';
        break;
      case 'delivered':
        newStatus = 'delivered';
        break;
      default:
        break;
    }
    
    setCurrentPackage({
      ...currentPackage,
      status: newStatus,
      currentStage: newStage
    });
  };

  const handleClosePanel = () => {
    setSelectedStage(null);
  };

  // Get the latest event timestamp for calculating time options
  const getLatestEventTime = () => {
    if (events.length === 0) return new Date();
    return events[events.length - 1].timestamp;
  };

  const toggleEventLog = () => {
    setEventLogExpanded(!eventLogExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-red-600 to-red-800 text-white p-2 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-xl md:text-2xl font-bold flex items-center">
            <span className="mr-2">Express Package Delivery</span>
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto p-2 flex flex-col">
        {currentPackage ? (
          <div className="bg-white rounded-lg shadow-sm mb-3 p-2 border-l-4 border-red-600">
            <h2 className="text-md font-semibold">Active Package: {currentPackage.id}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
              <div>
                <span className="text-xs text-gray-500">Origin</span>
                <p className="font-medium text-sm">{currentPackage.origin}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Destination</span>
                <p className="font-medium text-sm">{currentPackage.destination}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Status</span>
                <p className="font-medium text-sm capitalize">{currentPackage.status.replace('_', ' ')}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Created</span>
                <p className="font-medium text-sm">{currentPackage.createdAt.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm mb-3 p-2 border-l-4 border-yellow-400">
            <p className="text-sm">Click on "Cliente" to start a new delivery request.</p>
          </div>
        )}
        
        <DeliveryChain 
          onStageClick={handleStageClick} 
          currentPackage={currentPackage}
          events={events}
        />
        
        {/* Main content area with two columns */}
        <div className="mt-3 flex flex-col md:flex-row gap-3">
          {/* Event Log - Left Column */}
          <div className={`event-log-container ${eventLogExpanded ? 'expanded' : 'collapsed'}`}>
            <div 
              className="event-log-header bg-white rounded-lg shadow-md flex justify-between items-center p-2 cursor-pointer hover:bg-gray-50"
              onClick={toggleEventLog}
            >
              <h2 className="text-md font-semibold">Event Log</h2>
              <button className="text-gray-500 focus:outline-none">
                {eventLogExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>
            
            <div className="event-log-content bg-white rounded-lg shadow-md mt-1 overflow-hidden">
              {events.length > 0 ? (
                <div className="p-2 max-h-[400px] overflow-y-auto">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                          <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                          <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {events.slice().reverse().map((event, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                              {event.timestamp.toLocaleString()}
                            </td>
                            <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500 capitalize">
                              {event.stage.replace('_', ' ')}
                            </td>
                            <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500 capitalize">
                              {event.action.replace('_', ' ')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-3 text-center text-gray-500 text-sm">
                  No events recorded yet
                </div>
              )}
            </div>
          </div>
          
          {/* Stage Options - Right Column */}
          <div className="md:flex-1">
            {selectedStage ? (
              <div className="bg-white rounded-lg shadow-lg h-full">
                <OptionsPanel 
                  stage={selectedStage}
                  onClose={handleClosePanel}
                  onCreatePackage={handleCreatePackage}
                  onRegisterEvent={handleRegisterEvent}
                  currentPackage={currentPackage}
                  latestEventTime={getLatestEventTime()}
                  inline={true}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-4 text-center text-gray-500 h-full flex items-center justify-center">
                <p>Select a stage in the delivery flow to perform actions</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;