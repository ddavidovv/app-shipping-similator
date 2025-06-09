import React from 'react';
import { Package, DeliveryStage, StageEvent } from '../types';
import DeliveryStageComponent from './DeliveryStage';

interface DeliveryChainProps {
  onStageClick: (stage: DeliveryStage) => void;
  currentPackage: Package | null;
  events: StageEvent[];
}

const DeliveryChain: React.FC<DeliveryChainProps> = ({ 
  onStageClick, 
  currentPackage,
  events 
}) => {
  // Define the sequence of stages
  const stageSequence: DeliveryStage[] = [
    'customer',
    'first_mile',
    'origin_hub',
    'linehaul',
    'destination_hub',
    'last_mile',
    'recipient'
  ];

  // Determine completed stages based on events
  const getStageStatus = (stage: DeliveryStage) => {
    if (!currentPackage) return 'inactive';
    
    const stageEvents = events.filter(e => e.packageId === currentPackage.id && e.stage === stage);
    
    if (stageEvents.length > 0) {
      // Stage has events, mark it as completed
      return 'completed';
    }
    
    // If this is the next stage after the last completed stage, mark it as active
    const currentStageIndex = stageSequence.findIndex(s => s === stage);
    
    // Find the index of the last completed stage
    let lastCompletedIndex = -1;
    for (let i = 0; i < currentStageIndex; i++) {
      const prevStage = stageSequence[i];
      const prevStageEvents = events.filter(e => e.packageId === currentPackage.id && e.stage === prevStage);
      if (prevStageEvents.length > 0) {
        lastCompletedIndex = i;
      }
    }
    
    // If this stage is right after the last completed stage, mark it as active
    if (currentStageIndex === lastCompletedIndex + 1) {
      return 'active';
    }
    
    // If this stage is the current stage and no stages have been completed yet
    if (currentPackage.currentStage === stage && lastCompletedIndex === -1) {
      return 'active';
    }
    
    return 'pending';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 overflow-x-auto">
      <div className="flex items-center space-x-2 min-w-max">
        <DeliveryStageComponent
          id="customer"
          label="Cliente"
          iconName="user"
          description="Solicitar recogida"
          status={getStageStatus('customer')}
          onClick={() => onStageClick('customer')}
        />
        
        <div className="w-8 h-1 bg-gray-300 relative">
          <div className={`absolute inset-0 ${getStageStatus('first_mile') !== 'inactive' ? 'bg-red-600' : 'bg-gray-300'} transition-all duration-500`} 
               style={{ width: getStageStatus('first_mile') === 'completed' ? '100%' : getStageStatus('first_mile') === 'active' ? '50%' : '0%' }}></div>
        </div>
        
        <DeliveryStageComponent
          id="first_mile"
          label="First Mile"
          iconName="truck"
          description="Recogida"
          status={getStageStatus('first_mile')}
          onClick={() => onStageClick('first_mile')}
        />
        
        <div className="w-8 h-1 bg-gray-300 relative">
          <div className={`absolute inset-0 ${getStageStatus('origin_hub') !== 'inactive' ? 'bg-red-600' : 'bg-gray-300'} transition-all duration-500`} 
               style={{ width: getStageStatus('origin_hub') === 'completed' ? '100%' : getStageStatus('origin_hub') === 'active' ? '50%' : '0%' }}></div>
        </div>
        
        <DeliveryStageComponent
          id="origin_hub"
          label="Hub Origen"
          iconName="building-2"
          description="Clasificación"
          status={getStageStatus('origin_hub')}
          onClick={() => onStageClick('origin_hub')}
        />
        
        <div className="w-8 h-1 bg-gray-300 relative">
          <div className={`absolute inset-0 ${getStageStatus('linehaul') !== 'inactive' ? 'bg-red-600' : 'bg-gray-300'} transition-all duration-500`} 
               style={{ width: getStageStatus('linehaul') === 'completed' ? '100%' : getStageStatus('linehaul') === 'active' ? '50%' : '0%' }}></div>
        </div>
        
        <DeliveryStageComponent
          id="linehaul"
          label="LineHaul"
          iconName="truck"
          description="Transporte"
          status={getStageStatus('linehaul')}
          onClick={() => onStageClick('linehaul')}
        />
        
        <div className="w-8 h-1 bg-gray-300 relative">
          <div className={`absolute inset-0 ${getStageStatus('destination_hub') !== 'inactive' ? 'bg-red-600' : 'bg-gray-300'} transition-all duration-500`} 
               style={{ width: getStageStatus('destination_hub') === 'completed' ? '100%' : getStageStatus('destination_hub') === 'active' ? '50%' : '0%' }}></div>
        </div>
        
        <DeliveryStageComponent
          id="destination_hub"
          label="Hub Destino"
          iconName="building"
          description="Clasificación"
          status={getStageStatus('destination_hub')}
          onClick={() => onStageClick('destination_hub')}
        />
        
        <div className="w-8 h-1 bg-gray-300 relative">
          <div className={`absolute inset-0 ${getStageStatus('last_mile') !== 'inactive' ? 'bg-red-600' : 'bg-gray-300'} transition-all duration-500`} 
               style={{ width: getStageStatus('last_mile') === 'completed' ? '100%' : getStageStatus('last_mile') === 'active' ? '50%' : '0%' }}></div>
        </div>
        
        <DeliveryStageComponent
          id="last_mile"
          label="Last Mile"
          iconName="package"
          description="Entrega"
          status={getStageStatus('last_mile')}
          onClick={() => onStageClick('last_mile')}
        />
        
        <div className="w-8 h-1 bg-gray-300 relative">
          <div className={`absolute inset-0 ${getStageStatus('recipient') !== 'inactive' ? 'bg-red-600' : 'bg-gray-300'} transition-all duration-500`} 
               style={{ width: getStageStatus('recipient') === 'completed' ? '100%' : getStageStatus('recipient') === 'active' ? '50%' : '0%' }}></div>
        </div>
        
        <DeliveryStageComponent
          id="recipient"
          label="Destinatario"
          iconName="home"
          description="Entregado"
          status={getStageStatus('recipient')}
          onClick={() => onStageClick('recipient')}
        />
      </div>
    </div>
  );
};

export default DeliveryChain;