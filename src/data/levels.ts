import type { Level } from '../types';

export const levels: Level[] = [
  {
    id: 'peach_garden',
    name: '桃园结义',
    description: '练习 20 以内加法',
    difficulty: 'easy',
    enemyName: '黄巾兵',
    enemyAvatar: '🥷',
    bgImage: 'bg-gradient-to-br from-pink-200 to-rose-100',
    operation: 'add',
    maxNumber: 20,
    questionCount: 10,
    enemyHealth: 50,
    playerHealth: 100
  },
  {
    id: 'zhuo_jun',
    name: '涿郡义兵',
    description: '练习 50 以内减法',
    difficulty: 'medium',
    enemyName: '程远志',
    enemyAvatar: '😠',
    bgImage: 'bg-gradient-to-br from-yellow-100 to-orange-100',
    operation: 'subtract',
    maxNumber: 50,
    questionCount: 15,
    enemyHealth: 80,
    playerHealth: 100
  },
  {
    id: 'hulao_pass',
    name: '三英战吕布',
    description: '100 以内混合加减',
    difficulty: 'hard',
    enemyName: '吕布',
    enemyAvatar: '👹',
    bgImage: 'bg-gradient-to-br from-red-200 to-gray-800',
    operation: 'mixed',
    maxNumber: 100,
    questionCount: 20,
    enemyHealth: 150,
    playerHealth: 120
  },
  {
    id: 'xuchang',
    name: '许昌练兵',
    description: '乘法口诀 (1-9)',
    difficulty: 'medium',
    enemyName: '曹操',
    enemyAvatar: '🦸‍♂️',
    bgImage: 'bg-gradient-to-br from-blue-200 to-indigo-200',
    operation: 'multiply',
    maxNumber: 9,
    questionCount: 15,
    enemyHealth: 100,
    playerHealth: 100
  },
  {
    id: 'red_cliff',
    name: '赤壁之战',
    description: '综合终极挑战',
    difficulty: 'hard',
    enemyName: '百万曹军',
    enemyAvatar: '🚢',
    bgImage: 'bg-gradient-to-br from-orange-400 to-red-600',
    operation: 'mixed',
    maxNumber: 100,
    questionCount: 25,
    enemyHealth: 200,
    playerHealth: 150
  }
];
