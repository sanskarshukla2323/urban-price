import { useState, useEffect } from 'react';
import { PropertyData, PropertyPredictionInput } from '@/types/property';
import { parseCSV, getUniqueValues } from '@/utils/csvParser';
import { predictPrice } from '@/utils/pricePredictor';
import { PredictionForm } from '@/components/PredictionForm';
import { PredictionResult } from '@/components/PredictionResult';
import { DatasetPreview } from '@/components/DatasetPreview';
import { Navigation } from '@/components/Navigation';
import { FeaturesSection } from '@/components/FeaturesSection';
import { StatsSection } from '@/components/StatsSection';
import { useToast } from '@/hooks/use-toast';
import { Loader2, TrendingUp, Shield, Zap } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading property data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/10"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">India's #1 Property Price Predictor</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
              URBAN PRICE
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI-Powered Real Estate Price Prediction for Smarter Property Decisions Across India
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-3 bg-gradient-card p-4 rounded-xl shadow-medium border border-primary/10">
                <div className="p-2 bg-gradient-accent rounded-lg">
                  <Shield className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Verified Data</div>
                  <div className="font-semibold text-foreground">Trusted Results</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gradient-card p-4 rounded-xl shadow-medium border border-primary/10">
                <div className="p-2 bg-gradient-accent rounded-lg">
                  <Zap className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Lightning Fast</div>
                  <div className="font-semibold text-foreground">Instant Predictions</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gradient-card p-4 rounded-xl shadow-medium border border-primary/10">
                <div className="p-2 bg-gradient-accent rounded-lg">
                  <TrendingUp className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">95% Accuracy</div>
                  <div className="font-semibold text-foreground">AI Powered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Prediction Form Section */}
      <section id="predict" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Get Your Price Prediction
            </h2>
            <p className="text-xl text-muted-foreground">
              Enter your property details for an instant AI-powered price estimate
            </p>
          </div>
          
          <PredictionForm
            locations={locations}
            areaTypes={areaTypes}
            onPredict={handlePredict}
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Prediction Result */}
      {predictionResult && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <PredictionResult {...predictionResult} />
          </div>
        </section>
      )}

      {/* Dataset Preview Section */}
      <section id="dataset" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <DatasetPreview data={dataset} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-t border-primary/10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-gradient-accent rounded">
                  <TrendingUp className="w-4 h-4 text-accent-foreground" />
                </div>
                URBAN PRICE
              </h3>
              <p className="text-muted-foreground text-sm">
                AI-powered property price predictions helping you make smarter real estate decisions across India.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#predict" className="text-muted-foreground hover:text-primary transition-colors">Predict Price</a></li>
                <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#stats" className="text-muted-foreground hover:text-primary transition-colors">Statistics</a></li>
                <li><a href="#dataset" className="text-muted-foreground hover:text-primary transition-colors">Dataset</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Coverage</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Karnataka • Bengaluru ✓</li>
                <li>Maharashtra • Coming Soon</li>
                <li>Delhi NCR • Coming Soon</li>
                <li>Tamil Nadu • Coming Soon</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary/10 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 URBAN PRICE. Powered by Advanced AI & Machine Learning for Accurate Real Estate Predictions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
