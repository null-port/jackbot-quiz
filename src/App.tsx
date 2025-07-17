import './App.css'
import { useState, useEffect } from 'react'
import IntroScreen from './component/explanation.tsx'
import GamePlayScreen from './component/gameplay.tsx';
import { fetch_random_qna } from './logic/game.ts'

function App() {

  const [completeIntroPage, setCompleteIntroPage] = useState(false);
  const [questionsArray, setQuestionsArray] = useState<[string, string, string][]>([]);

  useEffect(() => {
    if (!completeIntroPage)
      setQuestionsArray(fetch_random_qna());
  }, [completeIntroPage]);

  return (
    <>
      {!completeIntroPage ? 
      <IntroScreen setCompleteIntroPage={setCompleteIntroPage}></IntroScreen>
      :
      <GamePlayScreen questionsArray={questionsArray} setCompleteIntroPage={setCompleteIntroPage}></GamePlayScreen>
      }
    </>
  )
}

export default App
