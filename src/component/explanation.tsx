import { useState } from "react";
import quiplash_logo from "../assets/quiplash_logo.webp"
import jackbot from "../assets/jackbot_file.png"

export default function IntroScreen({setCompleteIntroPage} : {setCompleteIntroPage: React.Dispatch<React.SetStateAction<boolean>>}){

    const [introButton, setIntroButton] = useState(false);

    function handleIntroButtonClick(){
        setIntroButton(true);
    }
    
    return (
        <>
            <div>
                { !introButton ?
                <div className="flex flex-col font-helvetica font-bold items-center text-center tracking-wider">
                    <div className="text-7xl text-center pt-8">
                        This is JackBot.
                    </div>

                    <img className="pt-8" src={jackbot}></img>
                    <div className="flex flex-row">
                        <div className="flex items-center justify-center text-5xl pt-10">
                            He's an AI model I trained to beat my friends at
                        </div>
                        <img className="w-45 h-20 pl-4 mt-10"src={quiplash_logo}></img>
                    </div>
                    <div className="flex items-center justify-center text-3xl">
                        (a head-to-head comedy game published by Jackbox Games)
                    </div>

                    <div className="text-7xl pt-15">
                        Think you can outsmart him?
                    </div>

                    <button className="h-20 w-90 shadow bg-gray-900 rounded-lg mt-16 hover:cursor-pointer hover:text-black hover:bg-white hover:border-black hover:border-2 text-white text-3xl" onClick={() => handleIntroButtonClick()}>Play</button>
                    <div className="text-xl mt-15 text-red-600">
                        WARNING: The jokes in this game will be CRASS and OFFENSIVE, involve SWEARING/CURSING, and contain SEXUAL CONTENT.<br/>
                        By clicking the Play button, you agree that you are (or have permission from) a consenting adult (18+) to be exposed to inappropriate content.
                    </div>       

                </div>
                :
                <div>
                    <button className="fixed w-30 h-10 inset-8 text-white rounded-lg bg-gray-900 hover:cursor-pointer hover:text-black hover:bg-white hover:border-black hover:border-2" onClick={() => (setIntroButton(false))}>Back</button>
                    <div className="font-helvetica">
                        <div className="flex justify-center text-3xl text-center mt-40 pl-15 pr-15">
                            In the following game, you'll see 10 prompts and be given a choice between 2 answers to those prompts.
                        </div>
                        <div className="flex justify-center text-3xl text-center mt-6">
                            One of the answers is written by a human, and the other by<b>&nbsp;JackBot</b>.
                        </div>
                        <div className="flex justify-center font-bold text-6xl text-center mt-25 tracking-wide">
                            Your job is to pick the answer you think is funnier.
                        </div>
                        <div className="flex justify-center text-3xl text-center mt-9">
                            At the end, you'll be graded on how many times you fell for JackBot's answer.
                        </div>
                    </div>
                    <div className="flex justify-center items-center pt-30 font-helvetica font-bold">
                        <button className="h-35 w-130 bg-gray-900 hover:cursor-pointer rounded-lg text-white text-8xl text-center hover:text-black hover:bg-white hover:border-black hover:border-2 tracking-wider" onClick={() => (setCompleteIntroPage(true))}>Start</button>
                    </div>
                </div>}
            </div>
        </>
    );
}