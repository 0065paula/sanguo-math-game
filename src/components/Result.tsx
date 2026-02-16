import React from 'react';
import type { GameState } from '../types';
import { motion } from 'framer-motion';

interface Props {
  gameState: GameState;
  onHome: () => void;
  onRetry: () => void;
}

export const Result: React.FC<Props> = ({ gameState, onHome, onRetry }) => {
  const { currentLevel, enemyHealth, score, unlockedHeroes } = gameState;
  const isWin = enemyHealth <= 0;

  return (
    <div className="min-h-screen bg-sanguo-bg flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border-4 border-sanguo-brown relative overflow-hidden"
      >
        <div className={`absolute inset-0 opacity-10 ${isWin ? 'bg-yellow-200' : 'bg-gray-800'}`} />
        
        <h2 className={`text-6xl font-chinese font-bold mb-4 drop-shadow-md relative z-10 
          ${isWin ? 'text-sanguo-red' : 'text-gray-600'}
        `}>
          {isWin ? 'VICTORY!' : 'DEFEAT'}
        </h2>

        <div className="text-8xl mb-6 relative z-10 animate-bounce">
          {isWin ? '🏆' : '💀'}
        </div>

        <div className="space-y-4 mb-8 relative z-10">
          <p className="text-2xl font-bold text-sanguo-brown">
            Score: <span className="text-sanguo-red">{score}</span>
          </p>
          
          {isWin && (
            <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-400">
               <p className="font-chinese text-xl font-bold text-yellow-800">
                 You defeated {currentLevel?.enemyName}!
               </p>
               {unlockedHeroes.length > 1 && ( // Assuming liubei is always unlocked
                 <p className="text-xs mt-2 text-gray-600">
                   Total Unlocked Heroes: {unlockedHeroes.length}
                 </p>
               )}
            </div>
          )}

          {!isWin && (
             <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-300">
               <p className="font-chinese text-xl font-bold text-gray-700">
                 Don't give up!
               </p>
               <p className="text-sm mt-1 text-gray-500">
                 Try again to defeat {currentLevel?.enemyName}
               </p>
             </div>
          )}
        </div>

        <div className="flex gap-4 relative z-10">
          <button
            onClick={onHome}
            className="flex-1 py-3 px-6 bg-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Home
          </button>
          <button
            onClick={onRetry}
            className="flex-1 py-3 px-6 bg-sanguo-red text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg"
          >
            Retry
          </button>
        </div>

      </motion.div>
    </div>
  );
};
