import { useGame } from './hooks/useGame';
import { Home } from './components/Home';
import { LevelMap } from './components/LevelMap';
import { Battle } from './components/Battle';
import { Result } from './components/Result';
import { heroes } from './data/heroes';
import { levels } from './data/levels';
import './App.css';

function App() {
  const { 
    gameState, 
    selectHero, 
    startLevel, 
    handleAnswer, 
    goHome, 
    restartLevel 
  } = useGame();

  const renderScreen = () => {
    switch (gameState.currentScreen) {
      case 'home':
        return (
          <Home
            heroes={heroes}
            unlockedHeroes={gameState.unlockedHeroes}
            selectedHero={gameState.selectedHero}
            onSelectHero={selectHero}
            onStart={() => selectHero(gameState.selectedHero!)}
          />
        );
      
      case 'map':
        return (
          <LevelMap
            levels={levels}
            highScores={gameState.highScores}
            onSelectLevel={startLevel}
            selectedHero={gameState.selectedHero}
          />
        );
      
      case 'battle':
        return (
          <Battle
            gameState={gameState}
            onAnswer={handleAnswer}
            onGoHome={goHome}
          />
        );
      
      case 'result':
        return (
          <Result
            gameState={gameState}
            onHome={goHome}
            onRetry={restartLevel}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;
