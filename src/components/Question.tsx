import React, { useState, useRef, useEffect } from 'react';
import type { Question as QuestionType } from '../types';
import { motion } from 'framer-motion';

interface Props {
  question: QuestionType;
  onAnswer: (answer: number) => void;
  disabled?: boolean;
}

export const Question: React.FC<Props> = ({ question, onAnswer, disabled }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto focus input when question changes
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
    setInputValue('');
  }, [question.id, disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      const answer = parseInt(inputValue, 10);
      if (!isNaN(answer)) {
        onAnswer(answer);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-sanguo-brown mb-6 text-center">
        <h2 className="text-4xl font-bold text-sanguo-brown font-mono tracking-wider">
          {question.text}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="输入答案"
          className={`
            w-48 p-4 text-3xl font-bold text-center rounded-xl shadow-md border-2
            focus:outline-none focus:ring-4 focus:ring-yellow-400
            ${disabled 
              ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed' 
              : 'bg-white border-yellow-500 text-sanguo-brown'
            }
          `}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        
        <motion.button
          type="submit"
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          disabled={disabled || !inputValue.trim()}
          className={`
            px-12 py-3 text-xl font-bold rounded-full shadow-md border-2
            transition-colors duration-200
            ${disabled || !inputValue.trim()
              ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed' 
              : 'bg-sanguo-red border-red-600 text-white hover:bg-red-600'
            }
          `}
        >
          确认答题
        </motion.button>
      </form>
    </div>
  );
};
