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
      <section className="relative bg-gradient-hero text-primary-foreground py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        <div className="container mx-auto max-w-6xl text-center space-y-8 animate-fade-in relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl shadow-glow">
              <Building2 className="w-14 h-14" />
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl shadow-glow">
              <BarChart3 className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
            URBAN PRICE
          </h1>
          <p className="text-2xl md:text-3xl font-light text-primary-foreground/95 max-w-3xl mx-auto leading-relaxed">
            AI-Powered Property Predictions
          </p>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Get accurate valuations powered by {dataset.length.toLocaleString()}+ real transactions
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
      <footer className="relative bg-gradient-hero text-primary-foreground py-12 mt-20">
        <div className="container mx-auto max-w-6xl px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold">URBAN PRICE</h3>
          <p className="text-primary-foreground/80">Powered by machine learning and real market data from Bengaluru</p>
          <p className="text-sm text-primary-foreground/60">© 2025 Urban Price. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
