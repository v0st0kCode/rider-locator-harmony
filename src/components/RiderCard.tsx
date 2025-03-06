
import { Battery, MapPin, Navigation } from 'lucide-react';
import { Rider } from '@/lib/types';
import { formatTimeDifference } from '@/lib/mockData';

interface RiderCardProps {
  rider: Rider;
  onClick?: () => void;
  selected?: boolean;
}

export function RiderCard({ rider, onClick, selected = false }: RiderCardProps) {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'offline': return 'status-offline';
      default: return 'status-offline';
    }
  };
  
  const getBatteryIcon = (level: number) => {
    if (level >= 75) return 'battery-full';
    if (level >= 40) return 'battery-medium';
    if (level >= 10) return 'battery-low';
    return 'battery-warning';
  };

  return (
    <div 
      className={`glass-card p-4 mb-3 transition-all duration-300 hover:shadow-md cursor-pointer ${selected ? 'ring-2 ring-primary/70' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="relative">
          <img 
            src={rider.avatar} 
            alt={rider.name} 
            className="w-12 h-12 rounded-full object-cover" 
          />
          <div 
            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs ${getStatusClass(rider.status)}`}
          />
        </div>
        
        <div className="ml-3 flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm">{rider.name}</h3>
            <span className="text-xs text-muted-foreground">{formatTimeDifference(rider.lastUpdated)}</span>
          </div>
          
          <div className="text-xs text-muted-foreground mt-1 flex items-center">
            <span className="inline-flex items-center mr-3">
              <MapPin size={12} className="mr-1" /> 
              {rider.location.lat.toFixed(4)}, {rider.location.lng.toFixed(4)}
            </span>
            
            {rider.status !== 'offline' && (
              <span className="inline-flex items-center">
                <Navigation size={12} className="mr-1" /> 
                {rider.speed} km/h
              </span>
            )}
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center text-xs">
              <div className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-2">
                {rider.vehicle.type}
              </div>
              <span className="text-muted-foreground">{rider.vehicle.model}</span>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <Battery size={14} className="mr-1" />
              <span>{rider.batteryLevel}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderCard;
