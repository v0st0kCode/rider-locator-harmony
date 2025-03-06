
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import RiderList from "@/components/RiderList";
import RiderMap from "@/components/RiderMap";
import Header from "@/components/Header";
import { Rider } from "@/lib/types";
import { mockRiders, generateMockRiders } from "@/lib/mockData";

const Index = () => {
  const [riders, setRiders] = useState<Rider[]>(mockRiders);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();

  // Simulate real-time updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setRiders(prev => {
        return prev.map(rider => {
          // Only update active riders
          if (rider.status === 'active') {
            // Random small changes to location to simulate movement
            const latChange = (Math.random() - 0.5) * 0.005;
            const lngChange = (Math.random() - 0.5) * 0.005;
            
            // Randomly update speed
            const speedChange = Math.random() > 0.7 ? (Math.random() - 0.5) * 5 : 0;
            const newSpeed = Math.max(5, Math.min(80, rider.speed + speedChange));
            
            // Randomly decrease battery
            const batteryDecrease = Math.random() > 0.8 ? Math.random() * 1 : 0;
            
            return {
              ...rider,
              location: {
                lat: rider.location.lat + latChange,
                lng: rider.location.lng + lngChange
              },
              speed: Math.round(newSpeed),
              batteryLevel: Math.max(0, Math.round(rider.batteryLevel - batteryDecrease)),
              lastUpdated: new Date().toISOString()
            };
          }
          return rider;
        });
      });
      
      // Occasionally update rider statuses
      if (Math.random() > 0.9) {
        setRiders(prev => {
          const updatedRiders = [...prev];
          const randomIndex = Math.floor(Math.random() * updatedRiders.length);
          const statuses: ('active' | 'inactive' | 'offline')[] = ['active', 'inactive', 'offline'];
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          
          if (updatedRiders[randomIndex].status !== newStatus) {
            if (selectedRider?.id === updatedRiders[randomIndex].id) {
              toast({
                title: `${updatedRiders[randomIndex].name} is now ${newStatus}`,
                description: `Status changed at ${new Date().toLocaleTimeString()}`,
                duration: 3000,
              });
            }
            
            updatedRiders[randomIndex] = {
              ...updatedRiders[randomIndex],
              status: newStatus,
              lastUpdated: new Date().toISOString(),
              speed: newStatus === 'active' ? Math.floor(Math.random() * 50) + 10 : 
                     newStatus === 'inactive' ? Math.floor(Math.random() * 5) : 0
            };
          }
          return updatedRiders;
        });
      }
    }, 3000);

    return () => clearInterval(updateInterval);
  }, [selectedRider, toast]);

  const handleRiderSelect = (rider: Rider) => {
    setSelectedRider(rider);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`h-full ${isSidebarOpen ? 'w-80' : 'w-0'} 
            border-r border-border bg-secondary/30 transition-all duration-300
            overflow-hidden`}
        >
          {isSidebarOpen && (
            <div className="h-full w-80">
              <RiderList 
                riders={riders} 
                onRiderSelect={handleRiderSelect}
                selectedRider={selectedRider}
              />
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className="flex-1 h-full p-4 overflow-hidden bg-gradient-radial from-background to-muted/30">
          <RiderMap 
            riders={riders}
            selectedRider={selectedRider}
            onRiderSelect={handleRiderSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
