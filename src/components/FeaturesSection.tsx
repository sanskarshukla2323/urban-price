import { Card } from '@/components/ui/card';
import { Brain, TrendingUp, MapPin, Shield, Clock, Database } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze thousands of properties to provide accurate predictions.',
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Get real-time market trends and insights based on comprehensive property data.',
    },
    {
      icon: MapPin,
      title: 'Multi-Location Support',
      description: 'Compare prices across different states and cities with our expanding database.',
    },
    {
      icon: Shield,
      title: 'Reliable Data',
      description: 'Trust in our verified and regularly updated property database for accurate results.',
    },
    {
      icon: Clock,
      title: 'Instant Results',
      description: 'Get price predictions in seconds with our optimized prediction engine.',
    },
    {
      icon: Database,
      title: 'Comprehensive Dataset',
      description: 'Access insights from thousands of properties with detailed specifications.',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Why Choose URBAN PRICE
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of data-driven real estate price predictions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-card shadow-medium hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border border-primary/10 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-3 bg-gradient-accent rounded-xl w-fit mb-4">
                <feature.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};