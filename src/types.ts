export type DeliveryStage = 
  | 'customer'
  | 'first_mile'
  | 'origin_hub'
  | 'linehaul'
  | 'destination_hub'
  | 'last_mile'
  | 'recipient';

export type PackageStatus = 
  | 'registered'
  | 'picked_up'
  | 'in_transit'
  | 'sorting_completed'
  | 'out_for_delivery'
  | 'delivery_attempted'
  | 'delivered';

export interface Package {
  id: string;
  origin: string;
  destination: string;
  status: PackageStatus;
  currentStage: DeliveryStage;
  createdAt: Date;
}

export interface StageEvent {
  packageId: string;
  stage: DeliveryStage;
  action: string;
  timestamp: Date;
  details: Record<string, any>;
}

export interface StageConfig {
  id: DeliveryStage;
  label: string;
  icon: string;
  description: string;
  actions: {
    id: string;
    label: string;
    description: string;
    fields?: {
      id: string;
      label: string;
      type: string;
      required: boolean;
      options?: {
        value: string;
        label: string;
      }[];
    }[];
  }[];
}