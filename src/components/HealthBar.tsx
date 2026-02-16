import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  current: number;
  max: number;
  label: string;
  color?: string;
}

export const HealthBar: React.FC<Props> = ({ current, max, label, color = 'bg-green-500' }) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  return (
    <div className="w-full mb-2">
      <div className="flex justify-between text-xs font-bold mb-1 px-1">
        <span>{label}</span>
        <span>{Math.ceil(current)}/{max}</span>
      </div>
      <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden border border-gray-300">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full ${color} transition-all duration-300`}
        />
      </div>
    </div>
  );
};
