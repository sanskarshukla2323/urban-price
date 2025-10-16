import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PropertyPredictionInput } from '@/types/property';
import { Home, MapPin, Square, Bath, Maximize, Map, Building } from 'lucide-react';
import { getAllStates, getCitiesByState } from '@/data/indianStatesAndCities';

interface PredictionFormProps {
  locations: string[];
  areaTypes: string[];
  onPredict: (input: PropertyPredictionInput) => void;
  isLoading: boolean;
}

export const PredictionForm = ({ locations, areaTypes, onPredict, isLoading }: PredictionFormProps) => {
  const [formData, setFormData] = useState<PropertyPredictionInput>({
    state: 'Karnataka',
    city: 'Bengaluru',
    location: '',
    size: '2 BHK',
    total_sqft: 1000,
    bath: 2,
    balcony: 1,
    area_type: 'Super built-up  Area',
  });

  // Get all Indian states and cities
  const states = getAllStates();
  const cities = getCitiesByState(formData.state);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.state && formData.city && formData.location) {
      onPredict(formData);
    }
  };

  const handleStateChange = (value: string) => {
    const stateCities = getCitiesByState(value);
    setFormData({ 
      ...formData, 
      state: value, 
      city: stateCities[0] || '',
      location: '' 
    });
  };

  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6 BHK'];

  return (
    <Card className="p-8 bg-gradient-card shadow-medium animate-fade-in border border-primary/10">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Property Details</h3>
        <p className="text-muted-foreground">Enter the details below to get an accurate price prediction</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Map className="w-4 h-4 text-primary" />
              State
            </Label>
            <Select value={formData.state} onValueChange={handleStateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Building className="w-4 h-4 text-primary" />
              City
            </Label>
            <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value, location: '' })}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2 text-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              Location / Area
            </Label>
            <Select 
              value={formData.location} 
              onValueChange={(value) => setFormData({ ...formData, location: value })}
              disabled={formData.city !== 'Bengaluru'}
            >
              <SelectTrigger>
                <SelectValue placeholder={formData.city === 'Bengaluru' ? "Select location" : "Dataset available only for Bengaluru"} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.city !== 'Bengaluru' && (
              <p className="text-xs text-muted-foreground">
                Dataset for other cities coming soon!
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Home className="w-4 h-4 text-primary" />
              Size (BHK)
            </Label>
            <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bhkOptions.map((bhk) => (
                  <SelectItem key={bhk} value={bhk}>
                    {bhk}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Square className="w-4 h-4 text-primary" />
              Total Area (sqft)
            </Label>
            <Input
              type="number"
              value={formData.total_sqft}
              onChange={(e) => setFormData({ ...formData, total_sqft: parseInt(e.target.value) })}
              min="100"
              step="50"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Bath className="w-4 h-4 text-primary" />
              Bathrooms
            </Label>
            <Select value={formData.bath.toString()} onValueChange={(value) => setFormData({ ...formData, bath: parseInt(value) })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Maximize className="w-4 h-4 text-primary" />
              Balconies
            </Label>
            <Select value={formData.balcony.toString()} onValueChange={(value) => setFormData({ ...formData, balcony: parseInt(value) })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Area Type</Label>
            <Select value={formData.area_type} onValueChange={(value) => setFormData({ ...formData, area_type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {areaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-hero hover:opacity-90 transition-all text-primary-foreground shadow-glow font-semibold text-lg py-6"
          disabled={!formData.state || !formData.city || !formData.location || isLoading}
        >
          {isLoading ? '✨ Analyzing...' : '🚀 Predict Price'}
        </Button>
      </form>
    </Card>
  );
};
