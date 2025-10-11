import { useState, useEffect } from 'react';
import { PropertyData, PropertyPredictionInput } from '@/types/property';
import { parseCSV, getUniqueValues } from '@/utils/csvParser';
import { predictPrice } from '@/utils/pricePredictor';
import { PredictionForm } from '@/components/PredictionForm';
import { PredictionResult } from '@/components/PredictionResult';
import { DatasetPreview } from '@/components/DatasetPreview';
import { useToast } from '@/hooks/use-toast';
import { Building2, BarChart3 } from 'lucide-react';

const Index = () => {
  const [dataset, setDataset] = useState<PropertyData[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [areaTypes, setAreaTypes] = useState<string[]>([]);
  const [predictionResult, setPredictionResult] = useState<{
    predictedPrice: number;
    confidence: number;
    similarProperties: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await parseCSV('/data/Bengaluru_House_Data.csv');
        const filteredData = data.filter(item => item.location && item.price);
        
        setDataset(filteredData);
        setLocations(getUniqueValues(filteredData, 'location'));
        setAreaTypes(getUniqueValues(filteredData, 'area_type'));
        setDataLoading(false);

        toast({
          title: "Dataset Loaded",
          description: `Successfully loaded ${filteredData.length} properties from Bengaluru`,
        });
      } catch (error) {
        console.error('Error loading dataset:', error);
        toast({
          title: "Error",
          description: "Failed to load property dataset",
          variant: "destructive",
        });
        setDataLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const handlePredict = (input: PropertyPredictionInput) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const result = predictPrice(input, dataset);
      setPredictionResult(result);
      setIsLoading(false);

      toast({
        title: "Prediction Complete",
        description: `Estimated price: ₹${result.predictedPrice} Lakhs`,
      });
    }, 800);
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading property data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center space-y-6 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-12 h-12" />
            <BarChart3 className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Bengaluru Real Estate Price Predictor
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Get accurate property price predictions powered by {dataset.length.toLocaleString()}+ real estate transactions
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-12 space-y-12">
        {/* Prediction Form */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
            <Building2 className="w-8 h-8 text-primary" />
            Property Details
          </h2>
          <PredictionForm
            locations={locations}
            areaTypes={areaTypes}
            onPredict={handlePredict}
            isLoading={isLoading}
          />
        </section>

        {/* Prediction Result */}
        {predictionResult && (
          <section>
            <PredictionResult {...predictionResult} />
          </section>
        )}

        {/* Dataset Preview */}
        <section>
          <DatasetPreview data={dataset} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto max-w-6xl px-4 text-center text-muted-foreground">
          <p>Powered by machine learning and real market data from Bengaluru</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
