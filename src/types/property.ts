export interface PropertyData {
  area_type: string;
  availability: string;
  location: string;
  size: string;
  society: string;
  total_sqft: string;
  bath: string;
  balcony: string;
  price: string;
}

export interface PropertyPredictionInput {
  location: string;
  size: string;
  total_sqft: number;
  bath: number;
  balcony: number;
  area_type: string;
}
