
import { Rider, RiderStatus } from './types';

// Helper to generate a random date within the last hour
const getRandomRecentTime = () => {
  const now = new Date();
  const randomMinutesAgo = Math.floor(Math.random() * 60);
  now.setMinutes(now.getMinutes() - randomMinutesAgo);
  return now.toISOString();
};

// Helper to generate a random location near a center point
const getRandomLocation = (centerLat: number, centerLng: number, radiusKm: number) => {
  // Convert radius from kilometers to degrees (approximate)
  const radiusLat = radiusKm / 111.32;
  const radiusLng = radiusKm / (111.32 * Math.cos(centerLat * (Math.PI / 180)));
  
  const randomLat = centerLat + (Math.random() * 2 - 1) * radiusLat;
  const randomLng = centerLng + (Math.random() * 2 - 1) * radiusLng;
  
  return { lat: randomLat, lng: randomLng };
};

// Vehicle types
const vehicleTypes = [
  { type: 'Scooter', models: ['Xiaomi Pro 2', 'Segway Ninebot Max', 'Inokim OX'] },
  { type: 'Bike', models: ['Trek FX 3', 'Specialized Sirrus', 'Giant Escape'] },
  { type: 'Motorcycle', models: ['Honda CB300R', 'Yamaha MT-03', 'KTM Duke 390'] },
  { type: 'Car', models: ['Toyota Prius', 'Honda Civic', 'Tesla Model 3'] }
];

const vehicleColors = ['Black', 'White', 'Silver', 'Blue', 'Red', 'Green'];

// Status possibilities with weighted distribution
const statuses: RiderStatus[] = ['active', 'active', 'active', 'inactive', 'offline'];

// Generate mock riders
export const generateMockRiders = (count: number, centerLat = 40.7128, centerLng = -74.0060): Rider[] => {
  return Array.from({ length: count }, (_, i) => {
    const vehicleTypeIndex = Math.floor(Math.random() * vehicleTypes.length);
    const vehicleType = vehicleTypes[vehicleTypeIndex];
    const modelIndex = Math.floor(Math.random() * vehicleType.models.length);
    const colorIndex = Math.floor(Math.random() * vehicleColors.length);
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const speed = status === 'active' 
      ? Math.floor(Math.random() * 50) + 10 
      : status === 'inactive' ? Math.floor(Math.random() * 5) : 0;
    
    return {
      id: `rider-${i + 1}`,
      name: `Rider ${i + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      status,
      location: getRandomLocation(centerLat, centerLng, 10),
      lastUpdated: getRandomRecentTime(),
      speed,
      batteryLevel: Math.floor(Math.random() * 100),
      totalDistance: Math.floor(Math.random() * 1000) + 100,
      vehicle: {
        type: vehicleType.type,
        model: vehicleType.models[modelIndex],
        color: vehicleColors[colorIndex]
      }
    };
  });
};

// Generate 20 mock riders around New York City as default
export const mockRiders = generateMockRiders(20);

// Helper function to format time difference
export const formatTimeDifference = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return `${diffSecs} sec ago`;
  }
  if (diffMins < 60) {
    return `${diffMins} min ago`;
  }
  if (diffHours < 24) {
    return `${diffHours} hr ago`;
  }
  return `${diffDays} day ago`;
};
