
import { useState } from 'react';
import { Layers, Map, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapSettings } from '@/lib/types';

interface MapControlsProps {
  settings: MapSettings;
  onSettingsChange: (settings: Partial<MapSettings>) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
}

export function MapControls({ 
  settings, 
  onSettingsChange, 
  onZoomIn, 
  onZoomOut, 
  onResetView 
}: MapControlsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
      <Button 
        variant="secondary" 
        size="icon" 
        className="glass-card shadow-md bg-white/80 dark:bg-black/30"
        onClick={onZoomIn}
        aria-label="Zoom in"
      >
        <ZoomIn size={20} />
      </Button>
      
      <Button 
        variant="secondary" 
        size="icon" 
        className="glass-card shadow-md bg-white/80 dark:bg-black/30"
        onClick={onZoomOut}
        aria-label="Zoom out"
      >
        <ZoomOut size={20} />
      </Button>
      
      <Button 
        variant="secondary" 
        size="icon" 
        className="glass-card shadow-md bg-white/80 dark:bg-black/30 mt-2"
        onClick={onResetView}
        aria-label="Reset view"
      >
        <Map size={20} />
      </Button>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="secondary" 
            size="icon" 
            className="glass-card shadow-md bg-white/80 dark:bg-black/30 mt-2"
            aria-label="Map settings"
          >
            <Layers size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-64 glass-panel shadow-md bg-white/90 dark:bg-black/70"
          align="end"
        >
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Map Settings</h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-traffic" className="text-sm">Traffic</Label>
              <Switch 
                id="show-traffic" 
                checked={settings.showTraffic}
                onCheckedChange={(checked) => onSettingsChange({ showTraffic: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-satellite" className="text-sm">Satellite</Label>
              <Switch 
                id="show-satellite" 
                checked={settings.showSatellite}
                onCheckedChange={(checked) => onSettingsChange({ showSatellite: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-labels" className="text-sm">Labels</Label>
              <Switch 
                id="show-labels" 
                checked={settings.showLabels}
                onCheckedChange={(checked) => onSettingsChange({ showLabels: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-terrain" className="text-sm">Terrain</Label>
              <Switch 
                id="show-terrain" 
                checked={settings.showTerrain}
                onCheckedChange={(checked) => onSettingsChange({ showTerrain: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-buildings" className="text-sm">3D Buildings</Label>
              <Switch 
                id="show-buildings" 
                checked={settings.showBuildings}
                onCheckedChange={(checked) => onSettingsChange({ showBuildings: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-boundaries" className="text-sm">Boundaries</Label>
              <Switch 
                id="show-boundaries" 
                checked={settings.showBoundaries}
                onCheckedChange={(checked) => onSettingsChange({ showBoundaries: checked })}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MapControls;
