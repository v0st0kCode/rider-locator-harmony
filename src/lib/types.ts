
export type RiderStatus = 'active' | 'inactive' | 'offline';

export interface Rider {
  id: string;
  name: string;
  avatar: string;
  status: RiderStatus;
  location: {
    lat: number;
    lng: number;
  };
  lastUpdated: string;
  speed: number; // in km/h
  batteryLevel: number; // percentage
  totalDistance: number; // in km
  vehicle: {
    type: string;
    model: string;
    color: string;
  };
}

export interface MapSettings {
  zoom: number;
  center: [number, number];
  pitch: number;
  bearing: number;
  showTraffic: boolean;
  showSatellite: boolean;
  showLabels: boolean;
  showTerrain: boolean;
  showBuildings: boolean;
  showBoundaries: boolean;
}
