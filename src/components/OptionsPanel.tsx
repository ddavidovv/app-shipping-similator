import React, { useState } from 'react';
import { DeliveryStage, Package, StageConfig } from '../types';
import { X, Clock, ArrowLeft, Plus, Trash, Wand2 } from 'lucide-react';
import stageConfigs from '../stageConfigs';

interface OptionsPanelProps {
  stage: DeliveryStage;
  onClose: () => void;
  onCreatePackage: (origin: string, destination: string) => void;
  onRegisterEvent: (stage: DeliveryStage, action: string, details: Record<string, any>) => void;
  currentPackage: Package | null;
  latestEventTime: Date;
  inline?: boolean;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  stage,
  onClose,
  onCreatePackage,
  onRegisterEvent,
  currentPackage,
  latestEventTime,
  inline = false
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [packages, setPackages] = useState([{ id: 1 }]);
  
  const config = stageConfigs.find(s => s.id === stage) as StageConfig;
  
  if (!config) return null;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };
  
  const handleTimePreset = (hoursToAdd: number) => {
    const newTime = new Date(latestEventTime);
    newTime.setHours(newTime.getHours() + hoursToAdd);
    
    const hours = newTime.getHours().toString().padStart(2, '0');
    const minutes = newTime.getMinutes().toString().padStart(2, '0');
    
    setFormValues({
      ...formValues,
      timestamp: newTime.toISOString(),
      time_display: `${hours}:${minutes}`
    });
  };

  const addPackage = () => {
    setPackages([...packages, { id: packages.length + 1 }]);
  };

  const removePackage = (index: number) => {
    if (packages.length > 1) {
      const updatedPackages = [...packages];
      updatedPackages.splice(index, 1);
      setPackages(updatedPackages);
    }
  };
  
  const fillWithFakeData = () => {
    // Spanish provinces with corresponding postal code prefixes and localities
    const provinceData = [
      { 
        province: 'Madrid', 
        postalPrefix: '28', 
        localities: ['Alcorcón', 'Leganés', 'Getafe', 'Móstoles', 'Fuenlabrada'] 
      },
      { 
        province: 'Barcelona', 
        postalPrefix: '08', 
        localities: ['Sabadell', 'Terrassa', 'Badalona', 'L\'Hospitalet', 'Mataró'] 
      },
      { 
        province: 'Valencia', 
        postalPrefix: '46', 
        localities: ['Torrent', 'Paterna', 'Gandia', 'Sagunto', 'Mislata'] 
      },
      { 
        province: 'Sevilla', 
        postalPrefix: '41', 
        localities: ['Dos Hermanas', 'Alcalá de Guadaíra', 'Utrera', 'Écija', 'Mairena del Aljarafe'] 
      },
      { 
        province: 'Zaragoza', 
        postalPrefix: '50', 
        localities: ['Calatayud', 'Ejea de los Caballeros', 'Utebo', 'Tarazona', 'Caspe'] 
      },
      { 
        province: 'Málaga', 
        postalPrefix: '29', 
        localities: ['Marbella', 'Vélez-Málaga', 'Mijas', 'Fuengirola', 'Torremolinos'] 
      },
      { 
        province: 'Murcia', 
        postalPrefix: '30', 
        localities: ['Cartagena', 'Lorca', 'Molina de Segura', 'Alcantarilla', 'Cieza'] 
      },
      { 
        province: 'Palma', 
        postalPrefix: '07', 
        localities: ['Manacor', 'Inca', 'Llucmajor', 'Marratxí', 'Calviá'] 
      },
      { 
        province: 'Las Palmas', 
        postalPrefix: '35', 
        localities: ['Telde', 'Arucas', 'Santa Lucía', 'San Bartolomé', 'Agüimes'] 
      },
      { 
        province: 'Bilbao', 
        postalPrefix: '48', 
        localities: ['Barakaldo', 'Getxo', 'Portugalete', 'Santurtzi', 'Basauri'] 
      }
    ];
    
    // Spanish streets
    const streets = [
      'Calle Mayor', 'Avenida de la Constitución', 'Plaza España', 
      'Calle Gran Vía', 'Paseo de la Castellana', 'Calle Serrano',
      'Rambla Catalunya', 'Passeig de Gràcia', 'Calle Alcalá'
    ];
    
    // Spanish names
    const names = [
      'Carlos Rodríguez', 'María López', 'Antonio García', 
      'Carmen Martínez', 'José González', 'Ana Fernández'
    ];
    
    // Random numbers for addresses
    const randomNum = () => Math.floor(Math.random() * 100) + 1;
    
    // Random postal code within a province prefix
    const randomPostalCode = (prefix: string) => {
      return `${prefix}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    };
    
    // Random weight
    const randomWeight = () => (Math.random() * 20 + 0.1).toFixed(1);
    
    // Random dimensions
    const randomDimension = () => Math.floor(Math.random() * 100) + 5;
    
    // Generate random origin and destination that are different
    const originProvinceIndex = Math.floor(Math.random() * provinceData.length);
    let destProvinceIndex;
    do {
      destProvinceIndex = Math.floor(Math.random() * provinceData.length);
    } while (destProvinceIndex === originProvinceIndex);
    
    const originProvince = provinceData[originProvinceIndex];
    const destProvince = provinceData[destProvinceIndex];
    
    // Get random localities for the selected provinces
    const originLocalityIndex = Math.floor(Math.random() * originProvince.localities.length);
    const destLocalityIndex = Math.floor(Math.random() * destProvince.localities.length);
    
    const originLocality = originProvince.localities[originLocalityIndex];
    const destLocality = destProvince.localities[destLocalityIndex];
    
    // Get postal codes based on province prefixes
    const originPostalCode = randomPostalCode(originProvince.postalPrefix);
    const destPostalCode = randomPostalCode(destProvince.postalPrefix);
    
    // Generate random client code
    const randomClientCode = `CL${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    // Random service type
    const serviceTypes = ['ctt_e24h', 'ctt_10h', 'ctt_14h'];
    const randomServiceType = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
    
    // Fill form with fake data
    const fakeData: Record<string, any> = {
      client_code: randomClientCode,
      origin_country: 'ESPAÑA',
      origin_postal_code: originPostalCode,
      origin_address: `${streets[Math.floor(Math.random() * streets.length)]}, ${randomNum()}`,
      origin_province: originProvince.province,
      origin_locality: originLocality,
      recipient_name: names[Math.floor(Math.random() * names.length)],
      destination_country: 'ESPAÑA',
      destination_postal_code: destPostalCode,
      destination_address: `${streets[Math.floor(Math.random() * streets.length)]}, ${randomNum()}`,
      destination_province: destProvince.province,
      destination_locality: destLocality,
      service_type: randomServiceType
    };
    
    // Add package data for each package
    packages.forEach(pkg => {
      fakeData[`package_weight_${pkg.id}`] = randomWeight();
      fakeData[`package_height_${pkg.id}`] = randomDimension();
      fakeData[`package_width_${pkg.id}`] = randomDimension();
      fakeData[`package_length_${pkg.id}`] = randomDimension();
    });
    
    setFormValues({...formValues, ...fakeData});
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAction) return;
    
    if (stage === 'customer' && selectedAction === 'service_request') {
      // Combine address fields for origin and destination
      const origin = [
        formValues.origin_address,
        formValues.origin_locality,
        formValues.origin_province,
        formValues.origin_postal_code,
        formValues.origin_country
      ].filter(Boolean).join(', ');
      
      const destination = [
        formValues.destination_address,
        formValues.destination_locality,
        formValues.destination_province,
        formValues.destination_postal_code,
        formValues.destination_country
      ].filter(Boolean).join(', ');
      
      onCreatePackage(origin, destination);
    } else {
      onRegisterEvent(stage, selectedAction, formValues);
    }
    
    setFormValues({});
    setSelectedAction(null);
    onClose();
  };
  
  const renderContent = () => (
    <>
      <div className={`flex justify-between items-center ${inline ? 'px-3 py-2 bg-red-600 text-white rounded-t-lg' : 'px-4 py-2 bg-red-600 text-white'}`}>
        <h2 className="text-lg font-semibold">{config.label}</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-red-700 transition-colors focus:outline-none"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-3">
        <p className="mb-3 text-sm text-gray-600">{config.description}</p>
        
        {!selectedAction ? (
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700 text-sm">Seleccione una acción:</h3>
            <div className={inline ? "grid grid-cols-1 md:grid-cols-2 gap-2" : "space-y-2"}>
              {config.actions.map(action => (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action.id)}
                  disabled={!currentPackage && action.id !== 'service_request'}
                  className={`w-full p-2 text-left rounded-lg border transition-colors text-sm
                    ${!currentPackage && action.id !== 'service_request' 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200'}`}
                >
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs text-gray-500">{action.description}</div>
                </button>
              ))}
            </div>
            
            {!currentPackage && stage !== 'customer' && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-xs">
                Debe crear un paquete primero haciendo clic en "Cliente".
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-700 text-sm flex items-center">
                <button 
                  type="button" 
                  onClick={() => setSelectedAction(null)}
                  className="mr-2 p-1 rounded-full hover:bg-gray-100"
                >
                  <ArrowLeft size={16} />
                </button>
                {config.actions.find(a => a.id === selectedAction)?.label}
              </h3>
              
              {selectedAction === 'service_request' && (
                <button
                  type="button"
                  onClick={fillWithFakeData}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs hover:bg-indigo-200 flex items-center"
                >
                  <Wand2 size={14} className="mr-1" /> Datos de prueba
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {selectedAction === 'service_request' && (
                <>
                  {/* Client Code */}
                  <div className="p-3 border rounded-lg bg-gray-50">
                    <h4 className="text-sm font-semibold mb-2 flex items-center text-red-600">
                      <span className="mr-2">Código centro de cliente</span>
                    </h4>
                    <div className="mb-2">
                      {config.actions.find(a => a.id === selectedAction)?.fields?.filter(f => f.id === 'client_code').map(field => (
                        <div key={field.id} className="mb-3">
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={formValues[field.id] || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
                            placeholder={field.label}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Origin Address */}
                  <div className="p-3 border rounded-lg bg-gray-50">
                    <h4 className="text-sm font-semibold mb-2 flex items-center text-red-600">
                      <span className="mr-2">Dirección de Origen</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {config.actions.find(a => a.id === selectedAction)?.fields?.filter(f => 
                        f.id.startsWith('origin_')).map(field => (
                        <div key={field.id} className="mb-3">
                          <label 
                            htmlFor={field.id} 
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            {field.label}{field.required && <span className="text-red-500">*</span>}
                          </label>
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={formValues[field.id] || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destination Address */}
                  <div className="p-3 border rounded-lg bg-gray-50">
                    <h4 className="text-sm font-semibold mb-2 flex items-center text-red-600">
                      <span className="mr-2">Dirección de Destino</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {config.actions.find(a => a.id === selectedAction)?.fields?.filter(f => 
                        f.id === 'recipient_name' || f.id.startsWith('destination_')).map(field => (
                        <div key={field.id} className="mb-3">
                          <label 
                            htmlFor={field.id} 
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            {field.label}{field.required && <span className="text-red-500">*</span>}
                          </label>
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={formValues[field.id] || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Packages */}
                  <div className="p-3 border rounded-lg bg-gray-50">
                    <h4 className="text-sm font-semibold mb-2 flex items-center justify-between text-red-600">
                      <span>Bultos</span>
                      <button 
                        type="button"
                        onClick={addPackage}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-xs hover:bg-gray-300 focus:outline-none"
                      >
                        <Plus size={14} className="inline mr-1" /> Añadir bulto
                      </button>
                    </h4>
                    
                    {packages.map((pkg, index) => (
                      <div key={pkg.id} className="mb-4 p-3 border border-gray-200 rounded-lg relative">
                        <h5 className="text-xs font-medium mb-2">Bulto #{pkg.id}</h5>
                        
                        {packages.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => removePackage(index)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash size={16} />
                          </button>
                        )}
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {config.actions.find(a => a.id === selectedAction)?.fields?.filter(f => 
                            f.id.startsWith('package_')).map(field => (
                            <div key={`${field.id}_${pkg.id}`}>
                              <label 
                                htmlFor={`${field.id}_${pkg.id}`}
                                className="block text-xs font-medium text-gray-700 mb-1"
                              >
                                {field.label}{field.required && <span className="text-red-500">*</span>}
                              </label>
                              <input
                                type={field.type}
                                id={`${field.id}_${pkg.id}`}
                                name={`${field.id}_${pkg.id}`}
                                value={formValues[`${field.id}_${pkg.id}`] || ''}
                                onChange={handleInputChange}
                                required={field.required}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Service Type */}
                  <div className="p-3 border rounded-lg bg-gray-50">
                    <h4 className="text-sm font-semibold mb-2 flex items-center text-red-600">
                      <span className="mr-2">Seleccionar Producto</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {config.actions.find(a => a.id === selectedAction)?.fields?.filter(f => 
                        f.id === 'service_type' && f.options).map(field => (
                        <div key={field.id} className="mb-3">
                          {field.options?.map((option) => (
                            <div 
                              key={option.value}
                              className={`border p-3 rounded-lg cursor-pointer mb-2 ${
                                formValues[field.id] === option.value 
                                  ? 'border-red-500 bg-red-50' 
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                              onClick={() => setFormValues({...formValues, [field.id]: option.value})}
                            >
                              <div className="font-medium text-sm">{option.label.split(' - ')[0]}</div>
                              <div className="text-xs text-gray-500">{option.label.split(' - ')[1]}</div>
                            </div>
                          ))}
                          <input 
                            type="hidden" 
                            name={field.id}
                            value={formValues[field.id] || ''}
                            required={field.required}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedAction !== 'service_request' && (
                <div className={inline ? "grid grid-cols-1 md:grid-cols-2 gap-3" : "space-y-3"}>
                  {config.actions.find(a => a.id === selectedAction)?.fields?.map(field => (
                    <div key={field.id} className="mb-3">
                      <label 
                        htmlFor={field.id} 
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        {field.label}{field.required && <span className="text-red-500">*</span>}
                      </label>
                      
                      {field.type === 'time' ? (
                        <div>
                          <div className="flex mb-2">
                            <input
                              type="time"
                              id={field.id}
                              name={field.id}
                              value={formValues.time_display || ''}
                              onChange={handleInputChange}
                              required={field.required}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
                            />
                            <input 
                              type="hidden" 
                              name="timestamp" 
                              value={formValues.timestamp || new Date().toISOString()} 
                            />
                          </div>
                          <div className="flex space-x-1 mb-2">
                            <button 
                              type="button" 
                              onClick={() => handleTimePreset(1)}
                              className="flex-1 py-1 px-2 bg-gray-100 text-xs rounded hover:bg-gray-200 flex items-center justify-center"
                            >
                              <Clock size={12} className="mr-1" /> +1h
                            </button>
                            <button 
                              type="button" 
                              onClick={() => handleTimePreset(2)}
                              className="flex-1 py-1 px-2 bg-gray-100 text-xs rounded hover:bg-gray-200 flex items-center justify-center"
                            >
                              <Clock size={12} className="mr-1" /> +2h
                            </button>
                            <button 
                              type="button" 
                              onClick={() => handleTimePreset(4)}
                              className="flex-1 py-1 px-2 bg-gray-100 text-xs rounded hover:bg-gray-200 flex items-center justify-center"
                            >
                              <Clock size={12} className="mr-1" /> +4h
                            </button>
                            <button 
                              type="button" 
                              onClick={() => handleTimePreset(8)}
                              className="flex-1 py-1 px-2 bg-gray-100 text-xs rounded hover:bg-gray-200 flex items-center justify-center"
                            >
                              <Clock size={12} className="mr-1" /> +8h
                            </button>
                          </div>
                        </div>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          id={field.id}
                          name={field.id}
                          value={formValues[field.id] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
                          rows={2}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          id={field.id}
                          name={field.id}
                          value={formValues[field.id] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
                        >
                          <option value="">Seleccione...</option>
                          {field.options?.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={formValues[field.id] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-4">
              <button
                type="submit"
                className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={() => setSelectedAction(null)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 focus:outline-none"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );

  if (inline) {
    return renderContent();
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
        {renderContent()}
      </div>
    </div>
  );
};

export default OptionsPanel;