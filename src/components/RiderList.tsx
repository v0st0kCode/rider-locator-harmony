
import { useEffect, useState } from 'react';
import { Filter, SortDesc } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rider, RiderStatus } from '@/lib/types';
import RiderCard from './RiderCard';

interface RiderListProps {
  riders: Rider[];
  onRiderSelect: (rider: Rider) => void;
  selectedRider?: Rider | null;
}

export function RiderList({ riders, onRiderSelect, selectedRider }: RiderListProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filteredRiders, setFilteredRiders] = useState<Rider[]>(riders);
  
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredRiders(riders);
    } else {
      setFilteredRiders(riders.filter(rider => rider.status === activeTab));
    }
  }, [activeTab, riders]);

  const getStatusCount = (status: RiderStatus | 'all'): number => {
    if (status === 'all') return riders.length;
    return riders.filter(rider => rider.status === status).length;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 px-4">
        <h2 className="text-lg font-medium">Riders</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" aria-label="Filter">
            <Filter size={18} />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Sort">
            <SortDesc size={18} />
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="all" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="px-4">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All ({getStatusCount('all')})
            </TabsTrigger>
            <TabsTrigger value="active" className="flex-1">
              Active ({getStatusCount('active')})
            </TabsTrigger>
            <TabsTrigger value="inactive" className="flex-1">
              Inactive ({getStatusCount('inactive')})
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-3 px-4 flex-1 overflow-auto">
          <div className="space-y-2 animate-in fade-in">
            {filteredRiders.map((rider, index) => (
              <div 
                key={rider.id} 
                className={`animate-in slide-in-from-bottom stagger-${Math.min(index, 5)}`}
              >
                <RiderCard 
                  rider={rider} 
                  onClick={() => onRiderSelect(rider)}
                  selected={selectedRider?.id === rider.id}
                />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-3 px-4 flex-1 overflow-auto">
          <div className="space-y-2 animate-in fade-in">
            {filteredRiders.map((rider, index) => (
              <div 
                key={rider.id} 
                className={`animate-in slide-in-from-bottom stagger-${Math.min(index, 5)}`}
              >
                <RiderCard 
                  rider={rider} 
                  onClick={() => onRiderSelect(rider)}
                  selected={selectedRider?.id === rider.id}
                />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-3 px-4 flex-1 overflow-auto">
          <div className="space-y-2 animate-in fade-in">
            {filteredRiders.map((rider, index) => (
              <div 
                key={rider.id} 
                className={`animate-in slide-in-from-bottom stagger-${Math.min(index, 5)}`}
              >
                <RiderCard 
                  rider={rider} 
                  onClick={() => onRiderSelect(rider)}
                  selected={selectedRider?.id === rider.id}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default RiderList;
