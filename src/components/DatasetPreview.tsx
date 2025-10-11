import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PropertyData } from '@/types/property';
import { Database } from 'lucide-react';

interface DatasetPreviewProps {
  data: PropertyData[];
}

export const DatasetPreview = ({ data }: DatasetPreviewProps) => {
  const previewData = data.slice(0, 10);

  return (
    <Card className="p-6 bg-gradient-card shadow-medium animate-fade-in border border-primary/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Database className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Dataset Preview</h3>
        <span className="text-sm text-muted-foreground ml-auto bg-secondary/20 px-3 py-1 rounded-full">
          Showing 10 of {data.length.toLocaleString()} properties
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Area (sqft)</TableHead>
              <TableHead>Bath</TableHead>
              <TableHead>Balcony</TableHead>
              <TableHead className="text-right">Price (Lakhs)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewData.map((property, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{property.location}</TableCell>
                <TableCell>{property.size}</TableCell>
                <TableCell>{property.total_sqft}</TableCell>
                <TableCell>{property.bath}</TableCell>
                <TableCell>{property.balcony}</TableCell>
                <TableCell className="text-right font-semibold text-accent">
                  ₹{property.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
