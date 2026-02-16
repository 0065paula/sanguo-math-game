import React from 'react';
import type { Level, Hero } from '../types';
import { motion } from 'framer-motion';

interface Props {
  levels: Level[];
  onSelectLevel: (level: Level) => void;
  highScores: Record<string, number>;
  selectedHero: Hero | null;
}

export const LevelMap: React.FC<Props> = ({ levels, onSelectLevel, highScores }) => {
  return (
    <div className="min-h-screen bg-sanguo-bg p-6 flex flex-col items-center">
      <h2 className="text-4xl font-chinese text-sanguo-brown mb-8">
        Select Battle
      </h2>

      <div className="flex flex-col gap-6 w-full max-w-md">
        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectLevel(level)}
            className={`
              relative p-6 rounded-xl border-4 cursor-pointer overflow-hidden group
              ${level.bgImage} shadow-md hover:shadow-xl hover:scale-105 transition-all
            `}
          >
            <div className="absolute inset-0 bg-white/40 group-hover:bg-white/20 transition-colors" />
            
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-chinese font-bold text-gray-900 mb-1">
                  {level.name}
                </h3>
                <p className="text-sm text-gray-800 font-medium mb-2">
                  {level.description}
                </p>
                <div className="flex gap-2 text-xs font-bold">
                  <span className={`px-2 py-1 rounded bg-white/50 text-gray-800`}>
                    {level.difficulty.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 rounded bg-white/50 text-gray-800">
                    Enemy: {level.enemyName}
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-2 drop-shadow-md">{level.enemyAvatar}</div>
                {highScores[level.id] ? (
                  <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                    High Score: {highScores[level.id]}
                  </div>
                ) : (
                  <div className="text-xs font-bold text-gray-600 bg-white/50 px-2 py-1 rounded-full">
                    Not Played
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
