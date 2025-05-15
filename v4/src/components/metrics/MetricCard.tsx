import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { ArrowRight } from 'lucide-react';
import { MetricType } from '../../types';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  type: MetricType;
  change?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

const getColorForMetricType = (type: MetricType): string => {
  switch (type) {
    case 'heart-rate':
      return '#FF2D55'; // heart red
    case 'sleep':
      return '#AF52DE'; // sleep purple
    case 'blood-oxygen':
      return '#5AC8FA'; // oxygen blue
    case 'stress':
      return '#FFD60A'; // stress yellow
    case 'hrv':
      return '#FF9500'; // HRV orange
    case 'weight':
      return '#34C759'; // weight green
    default:
      return '#0A84FF'; // default blue
  }
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  type,
  change,
  onClick
}) => {
  const accentColor = getColorForMetricType(type);
  
  return (
    <Card 
      className="h-full"
      accentColor={accentColor}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center text-neutral-400 mb-2">
          <span className="mr-2" style={{ color: accentColor }}>{icon}</span>
          <span className="font-medium text-sm">{title}</span>
        </div>
        {onClick && (
          <motion.div 
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            className="text-neutral-500 hover:text-neutral-300"
          >
            <ArrowRight size={16} />
          </motion.div>
        )}
      </div>
      
      <div className="flex items-baseline">
        <span className="text-3xl font-semibold text-white">{value}</span>
        {unit && <span className="ml-1 text-neutral-400 text-sm">{unit}</span>}
      </div>
      
      {change && (
        <div className={`mt-1 text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}% from last week
        </div>
      )}
    </Card>
  );
};

export default MetricCard;