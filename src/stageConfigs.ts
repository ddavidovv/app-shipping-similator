import { StageConfig } from './types';

const stageConfigs: StageConfig[] = [
  {
    id: 'customer',
    label: 'Cliente',
    icon: 'home',
    description: 'Gestión de solicitudes de servicios de paquetería',
    actions: [
      {
        id: 'service_request',
        label: 'Solicitar servicio',
        description: 'Registrar una nueva solicitud de recogida de paquete',
        fields: [
          {
            id: 'client_code',
            label: 'Código centro de cliente',
            type: 'text',
            required: true
          },
          // Origin Address
          {
            id: 'origin_country',
            label: 'País de origen',
            type: 'text',
            required: true
          },
          {
            id: 'origin_postal_code',
            label: 'Código Postal de origen',
            type: 'text',
            required: true
          },
          {
            id: 'origin_address',
            label: 'Dirección de origen',
            type: 'text',
            required: true
          },
          {
            id: 'origin_province',
            label: 'Provincia de origen',
            type: 'text',
            required: true
          },
          {
            id: 'origin_locality',
            label: 'Localidad de origen',
            type: 'text',
            required: true
          },
          // Destination Address
          {
            id: 'recipient_name',
            label: 'Nombre del destinatario',
            type: 'text',
            required: true
          },
          {
            id: 'destination_country',
            label: 'País de destino',
            type: 'text',
            required: true
          },
          {
            id: 'destination_postal_code',
            label: 'Código Postal de destino',
            type: 'text',
            required: true
          },
          {
            id: 'destination_address',
            label: 'Dirección de destino',
            type: 'text',
            required: true
          },
          {
            id: 'destination_province',
            label: 'Provincia de destino',
            type: 'text',
            required: true
          },
          {
            id: 'destination_locality',
            label: 'Localidad de destino',
            type: 'text',
            required: true
          },
          // Package Information
          {
            id: 'package_weight',
            label: 'Peso (kg)',
            type: 'number',
            required: true
          },
          {
            id: 'package_height',
            label: 'Altura (cm)',
            type: 'number',
            required: false
          },
          {
            id: 'package_width',
            label: 'Anchura (cm)',
            type: 'number',
            required: false
          },
          {
            id: 'package_length',
            label: 'Longitud (cm)',
            type: 'number',
            required: false
          },
          // Service Type
          {
            id: 'service_type',
            label: 'Tipo de servicio',
            type: 'select',
            required: true,
            options: [
              { value: 'ctt_e24h', label: 'CTT e24h - Entrega en 24h' },
              { value: 'ctt_10h', label: 'CTT 10h - Entrega antes de las 10h' },
              { value: 'ctt_14h', label: 'CTT 14h - Entrega antes de las 14h' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'first_mile',
    label: 'First Mile',
    icon: 'truck',
    description: 'Gestión de recogida de paquetes',
    actions: [
      {
        id: 'pickup',
        label: 'Registrar recogida',
        description: 'Confirmar que el paquete ha sido recogido',
        fields: [
          {
            id: 'pickup_time',
            label: 'Hora de recogida',
            type: 'time',
            required: true
          },
          {
            id: 'pickup_notes',
            label: 'Observaciones',
            type: 'textarea',
            required: false
          }
        ]
      }
    ]
  },
  {
    id: 'origin_hub',
    label: 'Hub Origen',
    icon: 'building-2',
    description: 'Gestión de clasificación en el hub de origen',
    actions: [
      {
        id: 'origin_hub_sort',
        label: 'Registrar clasificación',
        description: 'Confirmar que el paquete ha sido clasificado en el hub de origen',
        fields: [
          {
            id: 'sort_time',
            label: 'Hora de clasificación',
            type: 'time',
            required: true
          },
          {
            id: 'sort_notes',
            label: 'Observaciones',
            type: 'textarea',
            required: false
          }
        ]
      }
    ]
  },
  {
    id: 'linehaul',
    label: 'LineHaul',
    icon: 'truck',
    description: 'Transporte entre hubs',
    actions: [
      {
        id: 'linehaul_loaded',
        label: 'Carga en vehículo',
        description: 'El paquete ha sido cargado en vehículo de transporte',
        fields: []
      }
    ]
  },
  {
    id: 'destination_hub',
    label: 'Hub Destino',
    icon: 'building',
    description: 'Gestión de clasificación en el hub de destino',
    actions: [
      {
        id: 'destination_hub_sort',
        label: 'Registrar clasificación',
        description: 'Confirmar que el paquete ha sido clasificado en el hub de destino',
        fields: [
          {
            id: 'sort_time',
            label: 'Hora de clasificación',
            type: 'time',
            required: true
          },
          {
            id: 'sort_notes',
            label: 'Observaciones',
            type: 'textarea',
            required: false
          }
        ]
      }
    ]
  },
  {
    id: 'last_mile',
    label: 'Last Mile',
    icon: 'package',
    description: 'Gestión de entrega final',
    actions: [
      {
        id: 'assign_for_delivery',
        label: 'Asignar para reparto',
        description: 'Asignar paquete para entrega final',
        fields: [
          {
            id: 'driver_name',
            label: 'Nombre del repartidor',
            type: 'text',
            required: true
          },
          {
            id: 'expected_delivery_time',
            label: 'Hora estimada de entrega',
            type: 'time',
            required: true
          }
        ]
      },
      {
        id: 'delivery_issue',
        label: 'Registrar incidencia',
        description: 'Registrar un problema en el intento de entrega',
        fields: [
          {
            id: 'issue_type',
            label: 'Tipo de incidencia',
            type: 'text',
            required: true
          },
          {
            id: 'issue_description',
            label: 'Descripción',
            type: 'textarea',
            required: true
          }
        ]
      }
    ]
  },
  {
    id: 'recipient',
    label: 'Destinatario',
    icon: 'home',
    description: 'Receptor final del paquete',
    actions: [
      {
        id: 'delivered',
        label: 'Confirmar entrega',
        description: 'Confirmar que el paquete ha sido entregado exitosamente',
        fields: [
          {
            id: 'delivery_time',
            label: 'Hora de entrega',
            type: 'time',
            required: true
          },
          {
            id: 'receiver_name',
            label: 'Nombre de quien recibe',
            type: 'text',
            required: true
          }
        ]
      },
      {
        id: 'confirm_reception',
        label: 'Confirmar recepción',
        description: 'El destinatario confirma haber recibido el paquete',
        fields: [
          {
            id: 'satisfaction_level',
            label: 'Nivel de satisfacción (1-5)',
            type: 'number',
            required: true
          },
          {
            id: 'comments',
            label: 'Comentarios',
            type: 'textarea',
            required: false
          }
        ]
      }
    ]
  }
];

export default stageConfigs;