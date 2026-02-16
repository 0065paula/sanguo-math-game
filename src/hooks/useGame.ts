import type { Hero, Level, Question, GameState } from '../types';
import { useState, useEffect } from 'react';
import { heroes } from '../data/heroes';
import { generateAddQuestion, generateSubQuestion, generateMulQuestion } from '../utils/math';

const STORAGE_KEY = 'sanguo-math-game-data';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'home',
    selectedHero: null,
    currentLevel: null,
    score: 0,
    unlockedHeroes: ['liubei'],
    playerHealth: 100,
    enemyHealth: 100,
    questions: [],
    currentQuestionIndex: 0,
    isCorrect: null,
    streak: 0,
    highScores: {}
  });

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setGameState(prev => ({
        ...prev,
        score: parsed.score || 0,
        unlockedHeroes: parsed.unlockedHeroes || ['liubei'],
        highScores: parsed.highScores || {}
      }));
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      score: gameState.score,
      unlockedHeroes: gameState.unlockedHeroes,
      highScores: gameState.highScores
    }));
  }, [gameState.score, gameState.unlockedHeroes, gameState.highScores]);

  const selectHero = (hero: Hero) => {
    setGameState(prev => ({ ...prev, selectedHero: hero, currentScreen: 'map' }));
  };

  const startLevel = (level: Level) => {
    const questions: Question[] = [];
    for (let i = 0; i < level.questionCount; i++) {
      let q;
      if (level.operation === 'add') q = generateAddQuestion(level.maxNumber);
      else if (level.operation === 'subtract') q = generateSubQuestion(level.maxNumber);
      else if (level.operation === 'multiply') q = generateMulQuestion(level.maxNumber);
      else {
        // Mixed
        const type = Math.random();
        if (type < 0.33) q = generateAddQuestion(level.maxNumber);
        else if (type < 0.66) q = generateSubQuestion(level.maxNumber);
        else q = generateMulQuestion(9); // Multiplication is usually smaller numbers for mixed
      }
      questions.push({ ...q, id: `q-${i}` });
    }

    setGameState(prev => ({
      ...prev,
      currentLevel: level,
      currentScreen: 'battle',
      questions,
      currentQuestionIndex: 0,
      playerHealth: level.playerHealth,
      enemyHealth: level.enemyHealth,
      isCorrect: null,
      streak: 0
    }));
  };

  const handleAnswer = (answer: number) => {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;
    
    setGameState(prev => {
      let newPlayerHealth = prev.playerHealth;
      let newEnemyHealth = prev.enemyHealth;
      let newScore = prev.score;
      let newStreak = isCorrect ? prev.streak + 1 : 0;
      
      // Damage calculation
      if (isCorrect) {
        let damage = 10 + (prev.streak * 2); // Combo bonus
        // Hero ability bonuses
        if (prev.selectedHero?.id === 'guanyu') damage *= 1.5;
        if (prev.selectedHero?.id === 'zhangfei' && Math.random() < 0.3) damage *= 2; // Crit
        
        newEnemyHealth = Math.max(0, newEnemyHealth - damage);
        newScore += 10 * (prev.streak + 1);
        
        // Healing chance
        if (prev.selectedHero?.id === 'liubei' && Math.random() < 0.3) {
           newPlayerHealth = Math.min(prev.currentLevel!.playerHealth, newPlayerHealth + 10);
        }
      } else {
        let damage = 10;
        // Evasion chance
        if (prev.selectedHero?.id === 'zhaoyun' && Math.random() < 0.3) damage = 0;
        
        newPlayerHealth = Math.max(0, newPlayerHealth - damage);
      }

      return {
        ...prev,
        playerHealth: newPlayerHealth,
        enemyHealth: newEnemyHealth,
        score: newScore,
        isCorrect,
        streak: newStreak
      };
    });

    // Check win/loss or next question after delay
    setTimeout(() => {
      setGameState(prev => {
        if (prev.enemyHealth <= 0) {
          // Level Complete - Unlock heroes
          const newUnlocked = [...prev.unlockedHeroes];
          const newHighScores = { ...prev.highScores };
          
          // Update high score
          if (!newHighScores[prev.currentLevel!.id] || prev.score > newHighScores[prev.currentLevel!.id]) {
            newHighScores[prev.currentLevel!.id] = prev.score;
          }

          // Check for hero unlocks based on total score
          heroes.forEach(h => {
             if (prev.score >= h.unlockScore && !newUnlocked.includes(h.id)) {
               newUnlocked.push(h.id);
             }
          });

          return {
            ...prev,
            currentScreen: 'result',
            unlockedHeroes: newUnlocked,
            highScores: newHighScores,
            isCorrect: null
          };
        } else if (prev.playerHealth <= 0) {
          // Game Over
          return { ...prev, currentScreen: 'result', isCorrect: null };
        } else if (prev.currentQuestionIndex >= prev.questions.length - 1) {
          // Ran out of questions but both alive - tie/loss depending on rules? Let's say loss if enemy not defeated
           return { ...prev, currentScreen: 'result', isCorrect: null };
        } else {
          // Next Question
          return {
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
            isCorrect: null
          };
        }
      });
    }, 1000);
  };

  const goHome = () => {
    setGameState(prev => ({ ...prev, currentScreen: 'home', selectedHero: null, currentLevel: null }));
  };
  
  const restartLevel = () => {
    if (gameState.currentLevel) {
      startLevel(gameState.currentLevel);
    }
  };

  return {
    gameState,
    selectHero,
    startLevel,
    handleAnswer,
    goHome,
    restartLevel
  };
};
