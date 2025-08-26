import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  isHighlighted?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  isHighlighted = false,
}) => {
  return (
    <div className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg group ${
      isHighlighted 
        ? 'border-warm-gold bg-warm-gold/5 dark:bg-warm-gold/10' 
        : 'border-slate-gray/20 bg-soft-white dark:bg-navy-blue/50 hover:border-vibrant-teal/30'
    }`}>
      {/* Icon with gold accent */}
      <div className={`inline-flex p-3 rounded-lg mb-4 ${
        isHighlighted
          ? 'bg-warm-gold/20'
          : 'bg-vibrant-teal/10 group-hover:bg-vibrant-teal/20'
      } transition-colors duration-200`}>
        <Icon className={`h-6 w-6 ${
          isHighlighted ? 'text-warm-gold' : 'text-vibrant-teal'
        }`} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-navy-blue dark:text-white mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-gray dark:text-slate-gray mb-4 leading-relaxed">
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2 text-sm">
            <div className={`w-1.5 h-1.5 rounded-full ${
              isHighlighted ? 'bg-warm-gold' : 'bg-vibrant-teal'
            }`} />
            <span className="text-slate-gray dark:text-slate-gray">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;