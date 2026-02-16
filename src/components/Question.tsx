import React from 'react';
import type { Question as QuestionType } from '../types';
import { motion } from 'framer-motion';

interface Props {
  question: QuestionType;
  onAnswer: (answer: number) => void;
  disabled?: boolean;
}

export const Question: React.FC<Props> = ({ question, onAnswer, disabled }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-sanguo-brown mb-6 text-center">
        <h2 className="text-4xl font-bold text-sanguo-brown font-mono tracking-wider">
          {question.text}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => !disabled && onAnswer(option)}
            disabled={disabled}
            className={`
              p-4 text-2xl font-bold rounded-xl shadow-md border-2
              ${disabled 
                ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed' 
                : 'bg-yellow-100 border-yellow-500 text-yellow-900 hover:bg-yellow-200 active:bg-yellow-300'
              }
            `}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
