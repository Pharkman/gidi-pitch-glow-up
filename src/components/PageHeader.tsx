import { ChevronDown } from 'lucide-react';

export default function PageHeader({ heading, subheading }: { heading: React.ReactNode, subheading?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold">{heading}</h2>
        {subheading && <div className="text-muted-foreground text-base mt-1">{subheading}</div>}
      </div>
      {/* Removed avatar and chevron icon */}
    </div>
  );
} 