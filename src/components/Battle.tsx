import React from 'react';
import type { GameState } from '../types';
import { HealthBar } from './HealthBar';
import { Question } from './Question';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  gameState: GameState;
  onAnswer: (answer: number) => void;
  onGoHome: () => void;
}

export const Battle: React.FC<Props> = ({ gameState, onAnswer, onGoHome }) => {
  const { currentLevel, selectedHero, playerHealth, enemyHealth, questions, currentQuestionIndex, isCorrect, streak } = gameState;

  if (!currentLevel || !selectedHero) return null;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={`min-h-screen p-4 flex flex-col justify-between ${currentLevel.bgImage} bg-cover bg-center transition-colors duration-1000`}>
      {/* Header / Top Bar */}
      <div className="flex justify-between items-center bg-white/80 p-2 rounded-lg backdrop-blur-sm shadow-md mb-4">
        <button 
          onClick={onGoHome}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded text-sm transition-colors"
        >
          Quit
        </button>
        <div className="text-center font-bold text-lg text-sanguo-brown">
          Battle: {currentLevel.name}
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold shadow-inner">
          Score: {gameState.score}
        </div>
      </div>

      {/* Battle Arena */}
      <div className="flex-1 flex flex-col justify-center items-center relative">
        
        {/* Enemy Area */}
        <motion.div 
          animate={isCorrect === false ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white/90 rounded-xl p-4 shadow-xl border-4 border-red-800 mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-4xl mr-4">{currentLevel.enemyAvatar}</div>
            <div className="flex-1">
              <h3 className="font-chinese text-xl text-red-900 font-bold">{currentLevel.enemyName}</h3>
              <HealthBar 
                current={enemyHealth} 
                max={currentLevel.enemyHealth} 
                label="Enemy HP" 
                color="bg-red-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {isCorrect !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-6xl font-black drop-shadow-2xl pointer-events-none
                ${isCorrect ? 'text-green-500' : 'text-red-500'}
              `}
            >
              {isCorrect ? 'NICE!' : 'OUCH!'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question Area */}
        <div className="w-full max-w-md z-10 mb-8">
           {currentQuestion && (
             <Question 
               question={currentQuestion} 
               onAnswer={onAnswer} 
               disabled={isCorrect !== null}
             />
           )}
        </div>

        {/* Player Area */}
        <motion.div 
          animate={isCorrect === true ? { y: [0, -10, 0] } : {}}
          className={`w-full max-w-md bg-white/90 rounded-xl p-4 shadow-xl border-4 ${selectedHero.color}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex-1 mr-4">
              <h3 className="font-chinese text-xl text-blue-900 font-bold">{selectedHero.name}</h3>
              <HealthBar 
                current={playerHealth} 
                max={currentLevel.playerHealth} 
                label="Your HP" 
                color="bg-green-500"
              />
            </div>
            <div className="text-4xl">{selectedHero.avatar}</div>
          </div>
          <div className="mt-2 text-center text-xs font-bold text-gray-500">
            Streak: {streak} 🔥
          </div>
        </motion.div>

      </div>
    </div>
  );
};
