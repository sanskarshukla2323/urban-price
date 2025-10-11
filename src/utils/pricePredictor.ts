import { PropertyData, PropertyPredictionInput } from '@/types/property';

const parseSqft = (sqftStr: string): number => {
  if (!sqftStr) return 0;
  
  // Handle ranges like "1200 - 1400"
  if (sqftStr.includes('-')) {
    const parts = sqftStr.split('-').map(s => parseFloat(s.trim()));
    return (parts[0] + parts[1]) / 2;
  }
  
  return parseFloat(sqftStr) || 0;
};

const parseBHK = (sizeStr: string): number => {
  if (!sizeStr) return 0;
  const match = sizeStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
};

export const predictPrice = (
  input: PropertyPredictionInput,
  dataset: PropertyData[]
): { predictedPrice: number; confidence: number; similarProperties: number } => {
  // Filter similar properties
  const similarProperties = dataset.filter(property => {
    const propSqft = parseSqft(property.total_sqft);
    const propBHK = parseBHK(property.size);
    const propPrice = parseFloat(property.price);
    
    if (!propPrice || propPrice <= 0) return false;
    
    const locationMatch = property.location === input.location;
    const sqftRange = Math.abs(propSqft - input.total_sqft) / input.total_sqft;
    const bhkMatch = propBHK === parseBHK(input.size);
    
    // Similar if: same location OR (similar size AND same BHK)
    return locationMatch || (sqftRange < 0.3 && bhkMatch);
  });

  if (similarProperties.length === 0) {
    // Fallback: calculate based on average price per sqft in dataset
    const validProperties = dataset.filter(p => {
      const price = parseFloat(p.price);
      const sqft = parseSqft(p.total_sqft);
      return price > 0 && sqft > 0;
    });
    
    const avgPricePerSqft = validProperties.reduce((sum, p) => {
      return sum + (parseFloat(p.price) * 100000) / parseSqft(p.total_sqft);
    }, 0) / validProperties.length;
    
    const basePrice = (avgPricePerSqft * input.total_sqft) / 100000;
    
    // Adjust for amenities
    const bathBonus = (input.bath - 2) * 5;
    const balconyBonus = input.balcony * 3;
    
    return {
      predictedPrice: Math.round(basePrice * (1 + (bathBonus + balconyBonus) / 100) * 10) / 10,
      confidence: 0.6,
      similarProperties: 0
    };
  }

  // Calculate weighted average based on similarity
  let totalWeight = 0;
  let weightedSum = 0;

  similarProperties.forEach(property => {
    const propSqft = parseSqft(property.total_sqft);
    const propPrice = parseFloat(property.price);
    
    // Weight based on sqft similarity
    const sqftDiff = Math.abs(propSqft - input.total_sqft);
    const weight = 1 / (1 + sqftDiff / 1000);
    
    totalWeight += weight;
    weightedSum += propPrice * weight;
  });

  const predictedPrice = Math.round((weightedSum / totalWeight) * 10) / 10;
  const confidence = Math.min(0.95, 0.7 + (similarProperties.length / 100));

  return {
    predictedPrice,
    confidence,
    similarProperties: similarProperties.length
  };
};
