import { Card } from '@/components/ui/card';
import { IndianRupee, TrendingUp, Database } from 'lucide-react';

interface PredictionResultProps {
  predictedPrice: number;
  confidence: number;
  similarProperties: number;
}

export const PredictionResult = ({ predictedPrice, confidence, similarProperties }: PredictionResultProps) => {
  const formatPrice = (price: number) => {
    if (price >= 100) {
      return `₹${(price / 100).toFixed(2)} Cr`;
    }
    return `₹${price.toFixed(2)} Lakhs`;
  };

  const confidenceColor = confidence >= 0.8 ? 'text-accent' : confidence >= 0.6 ? 'text-primary' : 'text-muted-foreground';

  return (
    <Card className="p-8 bg-gradient-card shadow-glow animate-fade-in border-2 border-primary/20">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-foreground flex items-center justify-center gap-2">
          <div className="p-2 bg-gradient-accent rounded-full">
            <IndianRupee className="w-6 h-6 text-accent-foreground" />
          </div>
          Predicted Price
        </h2>
        
        <div className="space-y-3 p-6 bg-gradient-accent rounded-2xl shadow-glow">
          <div className="text-6xl md:text-7xl font-bold text-primary-foreground drop-shadow-lg">
            {formatPrice(predictedPrice)}
          </div>
          <p className="text-base text-primary-foreground/90 font-medium">
            Estimated property value in Bengaluru
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background/50">
            <TrendingUp className={`w-5 h-5 ${confidenceColor}`} />
            <div className="text-left">
              <div className="text-sm text-muted-foreground">Confidence</div>
              <div className={`text-xl font-semibold ${confidenceColor}`}>
                {(confidence * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background/50">
            <Database className="w-5 h-5 text-primary" />
            <div className="text-left">
              <div className="text-sm text-muted-foreground">Similar Properties</div>
              <div className="text-xl font-semibold text-foreground">
                {similarProperties}
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground pt-2">
          Prediction based on {similarProperties > 0 ? 'historical data analysis' : 'market averages'}
        </p>
      </div>
    </Card>
  );
};
