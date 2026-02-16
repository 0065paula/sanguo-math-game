import React from 'react';
import type { Hero } from '../types';
import { motion } from 'framer-motion';

interface Props {
  hero: Hero;
  isSelected?: boolean;
  isLocked?: boolean;
  onClick?: () => void;
}

export const HeroCard: React.FC<Props> = ({ hero, isSelected, isLocked, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={isLocked ? undefined : onClick}
      className={`relative p-4 rounded-xl border-4 cursor-pointer transition-all duration-300
        ${isSelected ? 'ring-4 ring-yellow-400 shadow-xl' : 'shadow-md'}
        ${isLocked ? 'opacity-50 grayscale bg-gray-200 border-gray-400' : hero.color}
      `}
    >
      <div className="text-4xl mb-2 text-center">{hero.avatar}</div>
      <h3 className="text-xl font-bold text-center mb-1 font-chinese">{hero.name}</h3>
      <p className="text-xs text-center opacity-80 mb-2">{hero.description}</p>
      
      {isLocked ? (
        <div className="text-center text-xs font-bold text-red-600">
          🔒 Unlock at {hero.unlockScore} pts
        </div>
      ) : (
        <div className="text-center text-xs font-bold bg-white/30 rounded px-2 py-1">
          ✨ {hero.ability}
        </div>
      )}

      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full p-1 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};
