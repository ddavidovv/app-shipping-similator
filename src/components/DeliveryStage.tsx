import React from 'react';
import * as Icons from 'lucide-react';
import { DeliveryStage } from '../types';

type StageStatus = 'inactive' | 'pending' | 'active' | 'completed';

interface DeliveryStageProps {
  id: DeliveryStage;
  label: string;
  iconName?: string;
  imageSrc?: string;
  description: string;
  status: StageStatus;
  onClick: () => void;
  compact?: boolean;
}

const DeliveryStageComponent: React.FC<DeliveryStageProps> = ({
  id,
  label,
  iconName,
  imageSrc,
  description,
  status,
  onClick,
  compact = false
}) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'inactive':
        return 'opacity-50 cursor-pointer border-gray-200';
      case 'pending':
        return 'cursor-pointer border-gray-300 hover:border-gray-400';
      case 'active':
        return 'stage-highlight cursor-pointer border-red-500 bg-red-50';
      case 'completed':
        return 'cursor-pointer border-green-500 bg-green-50';
      default:
        return 'cursor-pointer border-gray-200';
    }
  };

  // Dynamically get the icon component
  const IconComponent = iconName ? Icons[iconName as keyof typeof Icons] : null;
  
  return (
    <div 
      className={`stage-container flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-300 ${getStatusClasses()} ${status === 'completed' ? 'stage-complete' : ''}`}
      onClick={onClick}
    >
      <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-2 shadow-sm">
        {IconComponent && <IconComponent className={`w-8 h-8 ${status === 'active' ? 'text-red-600' : status === 'completed' ? 'text-green-600' : 'text-gray-600'}`} />}
        {!IconComponent && imageSrc && (
          <img src={imageSrc} alt={label} className="w-full h-full rounded-full object-cover" />
        )}
        {!IconComponent && !imageSrc && (
          <Icons.Box className={`w-8 h-8 ${status === 'active' ? 'text-red-600' : status === 'completed' ? 'text-green-600' : 'text-gray-600'}`} />
        )}
      </div>
      <h3 className="font-semibold text-center text-sm">{label}</h3>
      <p className="text-xs text-gray-500 text-center mt-1">{description}</p>
    </div>
  );
};

export default DeliveryStageComponent;