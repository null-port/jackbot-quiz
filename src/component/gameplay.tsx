import { useState, useEffect } from 'react'
import { easeOut, motion } from 'motion/react'
import quiplash_bg1 from '../assets/quiplash_bg1.webp'
import quiplash_bg2 from '../assets/quiplash_bg2.webp'
import quiplash_bg3 from '../assets/quiplash_bg3.webp'
import quiplash_bg4 from '../assets/quiplash_bg4.webp'
import quiplash_bg5 from '../assets/quiplash_bg5.webp'

export default function GamePlayScreen({questionsArray, setCompleteIntroPage}:{questionsArray: Array<[string, string, string]>;setCompleteIntroPage: React.Dispatch<React.SetStateAction<boolean>>}){

    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [showAuthor, setShowAuthor] = useState(false);
    const [order, setOrder] = useState(true);
    
    let question;
    let humanAnswer;
    let robotAnswer;

    const background_array = [quiplash_bg1, quiplash_bg2, quiplash_bg3, quiplash_bg4, quiplash_bg5];
    
    const currentIndex = wrongCount + correctCount;

    // Loads new question on re-render
    if (currentIndex < 10) {
        question = questionsArray[currentIndex][0];
        humanAnswer = questionsArray[currentIndex][1];
        robotAnswer = questionsArray[currentIndex][2];
    }

    // Updates correct answer count and incorrect answer count
    async function handleAnswer(correct: boolean){
        setShowAuthor(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        if (correct){
            setCorrectCount(correctCount + 1);
        }
        else
        {
            setWrongCount(wrongCount + 1);
        }
        setShowAuthor(false);
    }

    // Resets component for a new game
    function reset_to_title(){
        setCorrectCount(0);
        setWrongCount(0);
        setCompleteIntroPage(false);
    }

    // Handles ending text based on score
    function pick_ending(){
        if (wrongCount > 3) {
            return (
                <div>
                    Nice try, but you fell for JackBot's answers {wrongCount} times.
                </div>
            )
        } else if (wrongCount >= 2) {
            return (
                <div>
                    Wow, pretty good!<br/>You only fell for JackBot's answer {wrongCount} times.
                </div>
            )
        } else if (wrongCount === 1 ) {
            return (
                <div>
                    Well done! You only fell for JackBot's answer {wrongCount} time.
                </div>
            )
        } else {
            return (
                <div>
                    Singularity be damned, you didn't fall for JackBot's answers at all!
                </div>
            )
        }
    }

    useEffect(() => {
        setOrder((Math.random() < 0.5));
    }, [correctCount, wrongCount]);

    return (
    <div>
        {
        currentIndex < 10 ? // If there are fewer than 10 questions answered, display game
        <div className={(showAuthor) ? 'absolute inset-0 z-50 pointer-events-none select-none' : ''}>
            <div className="fixed inset-7 font-rockwell text-3xl text-white -z-1">
                <p className="text-shadow-md/20 text-shadow-black select-none">Question {currentIndex + 1} / 10</p>
            </div>
            <div className="flex w-screen justify-center pt-30 pb-25">
                <div className="flex w-300 h-40 justify-center items-center">
                    <h1 className="font-rockwell text-white text-shadow-md/30 text-shadow-black text-7xl text-center select-none">{question}</h1>
                </div>
            </div>
            <div>
            { order ? // Randomize order of questions on left or right
                <div className="flex flex-row space-x-10 items-center justify-center">
                    <div className="flex flex-col space-x-4 justify-center">
                        <button className="w-150 h-75 font-lango tracking-wide uppercase text-7xl bg-white hover:bg-gray-300 shadow-md shadow-black text-black rounded-md p-4 hover:cursor-pointer" onClick={() => handleAnswer(true)}>
                            {humanAnswer}
                        </button>
                    </div>
                    <div className="flex aspect-square w-25 h-25 shadow-2xs shadow-black bg-white rounded-full justify-center items-center ">
                        <p className="font-lango tracking-wide text-5xl select-none">or</p>
                    </div>
                    <div className="flex flex-col space-x-4 justify-center">
                        <button className="w-150 h-75 font-lango tracking-wide uppercase text-7xl bg-white hover:bg-gray-300 shadow-md shadow-black text-black rounded-md p-4 hover:cursor-pointer"  onClick={() => handleAnswer(false)}>
                            {robotAnswer}
                        </button>
                    </div>
                </div>
                :
                <div className="flex flex-row space-x-10 items-center justify-center">
                    <div className="flex flex-col space-x-4 justify-center">
                        <button className="w-150 h-75 font-lango tracking-wide uppercase text-7xl bg-white hover:bg-gray-300 shadow-md shadow-black text-black rounded-md p-4 hover:cursor-pointer" onClick={() => handleAnswer(false)}>
                            {robotAnswer}
                        </button>
                    </div>
                    <div className="flex aspect-square w-25 h-25 shadow-2xs shadow-black bg-white rounded-full justify-center items-center ">
                        <p className="font-lango tracking-wide text-5xl select-none">or</p>
                    </div>
                    <div className="flex flex-col space-x-4 justify-center">
                        <button className="w-150 h-75 font-lango tracking-wide uppercase text-7xl bg-white hover:bg-gray-300 shadow-md shadow-black text-black rounded-md p-4 hover:cursor-pointer"  onClick={() => handleAnswer(true)}>
                            {humanAnswer}
                        </button>
                    </div>
                </div>
            }
            { showAuthor ? // Display author once question answered
                <div>
                    { order ?
                        <motion.div className="font-rockwell text-8xl pt-8 select-none"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{ease: easeOut, duration: .3}}>
                            <div className='fixed text-green-400 text-shadow-md/40 text-shadow-black pl-55'>Human</div>
                            <div className='fixed text-red-500 text-shadow-md/40 text-shadow-black pl-250'>JackBot</div>
                        </motion.div>
                        :
                        <motion.div className="font-rockwell text-8xl pt-8 select-none"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{ease: easeOut, duration: .1}}>
                            <div className='fixed text-red-500 text-shadow-md/40 text-shadow-black pl-53'>JackBot</div>
                            <div className='fixed text-green-400 text-shadow-md/40 text-shadow-black pl-252'>Human</div>
                        </motion.div>
                    }
                </div> : ''
            }               
            </div>
            {/* Preload backgrounds */}
            <img className="fixed inset-0 -z-10 select-none" src={background_array[currentIndex % 5]}></img>
            <img className="fixed inset-0 -z-10 select-none" src={background_array[(currentIndex + 1) % 5]}></img>
            <img className="fixed inset-0 -z-10 select-none" src={background_array[(currentIndex + 2) % 5]}></img>
            <img className="fixed inset-0 -z-10 select-none" src={background_array[(currentIndex + 3) % 5]}></img>
            <img className="fixed inset-0 -z-10 select-none" src={background_array[(currentIndex + 4) % 5]}></img>
        </div>
        :
        <div>
            <div className="font-helvetica font-bold text-6xl text-center mt-40">
                {pick_ending()}
            </div>
            <div className="flex text-3xl font-helvetica text-center justify-center items-center mt-30">
                Want to try again?
            </div>
            <div className="flex font-helvetica font-bold text-center items-center justify-center">
                <div className="flex h-35 w-130 bg-gray-900 hover:cursor-pointer hover:text-black hover:bg-white hover:border-black hover:border-2 rounded-lg p-4 text-7xl text-white items-center justify-center mt-10" onClick={() => reset_to_title()}>Reset</div>
            </div>
        </div>
        }

    </div>

    );
}