export interface Hero {
  id: string;
  name: string;
  description: string;
  avatar: string; // Emoji or image path
  unlockScore: number;
  ability: string;
  color: string;
}

export interface Level {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  enemyName: string;
  enemyAvatar: string;
  bgImage: string; // CSS gradient or color
  operation: 'add' | 'subtract' | 'multiply' | 'mixed';
  maxNumber: number; // For add/sub
  questionCount: number;
  enemyHealth: number;
  playerHealth: number;
}

export interface Question {
  id: string;
  text: string;
  answer: number;
  options: number[];
}

export interface GameState {
  currentScreen: 'home' | 'map' | 'battle' | 'result';
  selectedHero: Hero | null;
  currentLevel: Level | null;
  score: number;
  unlockedHeroes: string[];
  playerHealth: number;
  enemyHealth: number;
  questions: Question[];
  currentQuestionIndex: number;
  isCorrect: boolean | null;
  streak: number;
  highScores: Record<string, number>; // levelId -> score
}
