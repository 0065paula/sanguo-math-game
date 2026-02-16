import type { Hero } from '../types';

export const heroes: Hero[] = [
  {
    id: 'liubei',
    name: '刘备',
    description: '仁义之君',
    avatar: '🤴',
    unlockScore: 0,
    ability: '仁德 (Healing Chance)',
    color: 'bg-green-100 border-green-500 text-green-900'
  },
  {
    id: 'zhangfei',
    name: '张飞',
    description: '万人敌',
    avatar: '🦁',
    unlockScore: 300,
    ability: '咆哮 (Critical Hit)',
    color: 'bg-red-100 border-red-500 text-red-900'
  },
  {
    id: 'guanyu',
    name: '关羽',
    description: '武圣',
    avatar: '🐉',
    unlockScore: 800,
    ability: '青龙偃月 (High DMG)',
    color: 'bg-emerald-100 border-emerald-500 text-emerald-900'
  },
  {
    id: 'zhaoyun',
    name: '赵云',
    description: '常胜将军',
    avatar: '🦄',
    unlockScore: 1500,
    ability: '龙胆 (Evasion)',
    color: 'bg-blue-100 border-blue-500 text-blue-900'
  },
  {
    id: 'zhugeliang',
    name: '诸葛亮',
    description: '卧龙',
    avatar: '🪶',
    unlockScore: 2500,
    ability: '八卦阵 (Time Slow)',
    color: 'bg-purple-100 border-purple-500 text-purple-900'
  }
];
