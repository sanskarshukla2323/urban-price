import { Card } from '@/components/ui/card';
import { Building2, TrendingUp, MapPin, Users } from 'lucide-react';

export const StatsSection = () => {
  const stats = [
    {
      icon: Building2,
      value: '13,000+',
      label: 'Properties Analyzed',
      color: 'text-primary',
    },
    {
      icon: MapPin,
      value: '200+',
      label: 'Locations Covered',
      color: 'text-accent',
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Prediction Accuracy',
      color: 'text-secondary',
    },
    {
      icon: Users,
      value: '10K+',
      label: 'Happy Users',
      color: 'text-primary',
    },
  ];

  return (
    <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-card shadow-medium hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border border-primary/10 animate-fade-in text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-accent rounded-full">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};