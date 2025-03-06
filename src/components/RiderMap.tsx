
import { useEffect, useRef, useState } from 'react';
import { Check, Info, LocateFixed } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Rider, MapSettings } from '@/lib/types';
import MapControls from './MapControls';
import { formatTimeDifference } from '@/lib/mockData';

interface RiderMapProps {
  riders: Rider[];
  selectedRider?: Rider | null;
  onRiderSelect: (rider: Rider) => void;
}

const defaultMapSettings: MapSettings = {
  zoom: 11,
  center: [-74.0060, 40.7128], // New York City
  pitch: 45,
  bearing: 0,
  showTraffic: false,
  showSatellite: false,
  showLabels: true,
  showTerrain: false,
  showBuildings: true,
  showBoundaries: false,
};

export function RiderMap({ riders, selectedRider, onRiderSelect }: RiderMapProps) {
  const [settings, setSettings] = useState<MapSettings>(defaultMapSettings);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Function to handle settings changes
  const handleSettingsChange = (newSettings: Partial<MapSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Functions for zoom controls
  const handleZoomIn = () => {
    setSettings(prev => ({ ...prev, zoom: Math.min(prev.zoom + 1, 20) }));
  };

  const handleZoomOut = () => {
    setSettings(prev => ({ ...prev, zoom: Math.max(prev.zoom - 1, 0) }));
  };

  const handleResetView = () => {
    setSettings(defaultMapSettings);
  };

  // Function to get user's location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(position);
        // Center map on user's location
        setSettings(prev => ({
          ...prev,
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 14,
        }));
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // Simulated map initialization (would use real map API in production)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* Map container */}
      <div 
        ref={mapContainerRef} 
        className="map-container h-full w-full rounded-xl overflow-hidden relative"
        style={{ 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        {/* Simulated map overlay */}
        {!isMapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
        
        {/* Map controls */}
        <MapControls 
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetView={handleResetView}
        />
        
        {/* Locate button */}
        <div className="absolute left-4 top-4 z-10">
          <Button 
            variant="secondary" 
            size="icon" 
            className="glass-card shadow-md bg-white/80 dark:bg-black/30"
            onClick={getUserLocation}
            disabled={isLocating}
            aria-label="Get current location"
          >
            <LocateFixed size={20} className={isLocating ? 'animate-pulse' : ''} />
          </Button>
        </div>
        
        {/* Rider pins (simulated) */}
        {isMapReady && riders.map(rider => (
          <div 
            key={rider.id}
            className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all 
              ${selectedRider?.id === rider.id ? 'z-30 scale-125' : 'z-20 hover:scale-110'}`}
            style={{
              // These positions are simulated - in a real app, would use actual map coordinates
              left: `${Math.random() * 70 + 15}%`,
              top: `${Math.random() * 70 + 15}%`,
            }}
            onClick={() => onRiderSelect(rider)}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <div 
                      className={`w-full h-full rounded-full border-2 overflow-hidden 
                        ${rider.status === 'active' ? 'border-green-500 animate-pulse' : 
                          rider.status === 'inactive' ? 'border-amber-500' : 'border-slate-400'}`}
                    >
                      <img 
                        src={rider.avatar} 
                        alt={rider.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedRider?.id === rider.id && (
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="top"
                  className="glass-card p-0 border-0 overflow-hidden"
                >
                  <div className="p-2">
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{rider.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {formatTimeDifference(rider.lastUpdated)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {rider.vehicle.type} · {rider.speed} km/h
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
        
        {/* User location marker */}
        {userLocation && (
          <div 
            className="absolute z-40 w-6 h-6 -translate-x-1/2 -translate-y-1/2"
            style={{
              // This position is simulated - in a real app, would use actual map coordinates
              left: '50%',
              top: '50%',
            }}
          >
            <div className="w-full h-full rounded-full bg-blue-500 opacity-75 animate-ping-subtle" />
            <div className="absolute w-4 h-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 border-2 border-white" />
          </div>
        )}
      </div>
      
      {/* Selected rider details panel */}
      {selectedRider && (
        <div className="absolute left-4 bottom-4 right-4 glass-card p-4 z-30 md:w-80 animate-in slide-in-from-bottom">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <img 
                src={selectedRider.avatar} 
                alt={selectedRider.name} 
                className="w-10 h-10 rounded-full" 
              />
              <div className="ml-3">
                <h3 className="font-medium">{selectedRider.name}</h3>
                <div className="flex items-center mt-0.5">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 
                    ${selectedRider.status === 'active' ? 'bg-green-500' : 
                      selectedRider.status === 'inactive' ? 'bg-amber-500' : 'bg-slate-400'}`} 
                  />
                  <span className="text-xs text-muted-foreground capitalize">
                    {selectedRider.status}
                  </span>
                </div>
              </div>
            </div>
            <Button size="icon" variant="ghost" className="rounded-full h-7 w-7">
              <Info size={16} />
            </Button>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div className="glass-panel rounded-lg px-3 py-2">
              <div className="text-muted-foreground text-xs">Speed</div>
              <div className="font-medium">{selectedRider.speed} km/h</div>
            </div>
            <div className="glass-panel rounded-lg px-3 py-2">
              <div className="text-muted-foreground text-xs">Battery</div>
              <div className="font-medium">{selectedRider.batteryLevel}%</div>
            </div>
            <div className="glass-panel rounded-lg px-3 py-2">
              <div className="text-muted-foreground text-xs">Distance</div>
              <div className="font-medium">{selectedRider.totalDistance} km</div>
            </div>
            <div className="glass-panel rounded-lg px-3 py-2">
              <div className="text-muted-foreground text-xs">Last Updated</div>
              <div className="font-medium">{formatTimeDifference(selectedRider.lastUpdated)}</div>
            </div>
          </div>
          
          <div className="mt-3 text-xs">
            <span className="text-muted-foreground">Vehicle: </span>
            <span className="font-medium">{selectedRider.vehicle.color} {selectedRider.vehicle.model}</span>
          </div>
          
          <div className="mt-3 flex space-x-2">
            <Button size="sm" className="flex-1">Track</Button>
            <Button size="sm" variant="outline" className="flex-1">Contact</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RiderMap;
