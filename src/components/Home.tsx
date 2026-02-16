import React from 'react';
import type { Hero } from '../types';
import { HeroCard } from './HeroCard';
import { motion } from 'framer-motion';

interface Props {
  heroes: Hero[];
  unlockedHeroes: string[];
  selectedHero: Hero | null;
  onSelectHero: (hero: Hero) => void;
  onStart: () => void;
}

export const Home: React.FC<Props> = ({ 
  heroes, 
  unlockedHeroes, 
  selectedHero, 
  onSelectHero, 
  onStart 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-sanguo-bg">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-6xl font-chinese text-sanguo-red mb-2 drop-shadow-lg">
          三国算术传
        </h1>
        <p className="text-xl text-sanguo-brown opacity-80">
          Choose your hero to conquer the lands!
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10 w-full max-w-4xl">
        {heroes.map(hero => (
          <HeroCard
            key={hero.id}
            hero={hero}
            isSelected={selectedHero?.id === hero.id}
            isLocked={!unlockedHeroes.includes(hero.id)}
            onClick={() => onSelectHero(hero)}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onStart}
        disabled={!selectedHero}
        className={`
          px-12 py-4 rounded-full text-2xl font-chinese font-bold shadow-xl border-4
          transition-all duration-300
          ${selectedHero 
            ? 'bg-sanguo-red text-white border-yellow-400 hover:bg-red-600' 
            : 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
          }
        `}
      >
        START ADVENTURE
      </motion.button>
    </div>
  );
};
