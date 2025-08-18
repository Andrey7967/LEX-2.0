
import  {useEffect} from 'react' 
import Database from '../Database/data.ts'
import {useAppDispatch, useAppSelector}  from '../states/Store.ts';
import { newWord } from '../logic/logic.ts';
import { setChoosenWord,setChoosenFourWords } from '../states/Slice.ts';

interface CounterProps {
    
title: string,
subtitle1: string,
subtitle2: string,
value1: number,
value2: number
}  
function Counter({title,
    subtitle1,
    subtitle2,
    value1,
    value2}: CounterProps)  {
    return(
        <div>
            <div className="p20 TextCenter">{title}</div>
    
                <div className="horizont counter-couples">
                    <div className="p16">{subtitle1}</div>
                    <div className="p16">{subtitle2}</div>  
                </div>
                <div className="horizont counter-couples toBorders">
                    <div className="p16">{value1}</div>
                    <div className="p16">{value2}</div>
                </div>
         
           
                
        </div>
    )
}


function DisplayContent() {
    const choosenWord: number = useAppSelector((state) => state.app.choosenWord);
    const wrongAnswer: boolean = useAppSelector((state) => state.app.wrongAnswer);
    const wordRange = useAppSelector((state)=> state.app.wordRange);
    const answers = useAppSelector((state)=> state.app.answers);

    return (<>
    <div className="state p20">{ wrongAnswer ? "Wrong Answer" :  "Enjoy"}</div>
        <div className="EngWord p24">{ wrongAnswer ? Database[choosenWord][0] + " - " + Database[choosenWord][1] : Database[choosenWord][0] }</div>
        <div className="horizont toBorders">
            <Counter title="Answer" subtitle1="wrong" subtitle2="right" value1={answers.min} value2={answers.max}/>
            <Counter title="Word Range" subtitle1="min" subtitle2="max" value1={wordRange.min+1} value2={wordRange.max+1}/>
        </div>
        </>)
}
export default function Display() {
    const activeGame = useAppSelector((state)=> state.app.activeGame);
   const dispatch = useAppDispatch();
   const wordRange=  useAppSelector((state)=> state.app.wordRange);
    useEffect(()=> {
        const rand = Math.floor(Math.random() * 4);
        const words = newWord(wordRange.min,wordRange.max);
        dispatch(setChoosenWord({data: words[rand]}));
        dispatch(setChoosenFourWords({data: words}));
    },[])
    return(
        <div className="frame displayF">
            <div className="display">
              {activeGame && <DisplayContent/>}
            
            </div>

        </div>
    )
}