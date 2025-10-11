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
    <Card className="p-6 bg-gradient-card shadow-soft animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Dataset Preview</h3>
        <span className="text-sm text-muted-foreground ml-auto">
          Showing 10 of {data.length} properties
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
