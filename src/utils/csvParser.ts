import Papa from 'papaparse';
import { PropertyData } from '@/types/property';

export const parseCSV = (file: string): Promise<PropertyData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data as PropertyData[]);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const getUniqueValues = (data: PropertyData[], field: keyof PropertyData): string[] => {
  const values = data.map(item => item[field]).filter(Boolean);
  return Array.from(new Set(values)).sort();
};
