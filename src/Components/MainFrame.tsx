
import Database from '../Database/data.ts'
import { useAppSelector ,useAppDispatch} from '../states/Store.ts'
import { setAnswers, setChoosenFourWords, setChoosenWord, setWrongAnswer } from '../states/Slice.ts';
import { newWord } from '../logic/logic.ts';
import { useSpring ,animated} from 'react-spring';
// import buttonSound from '../sounds/keyPress.wav';
function AnswerButton({i}) {
    const dispatch = useAppDispatch();
    const choosenWords = useAppSelector((state)=> state.app.choosenFourWords);
    const choosenWord = useAppSelector((state)=> state.app.choosenWord);
    const activeGame = useAppSelector((state)=> state.app.activeGame);
    const wrongAnswer = useAppSelector((state)=> state.app.wrongAnswer);
    const wordRange = useAppSelector((state)=> state.app.wordRange);
    const answers= useAppSelector((state)=> state.app.answers);
    // const buttonAudioRef = useRef(new Audio(buttonSound));
    const [spring,api]  = useSpring(()=> ({
        boxShadow: `inset 4.5rem 4.5rem 8.25rem 0rem rgba(10, 113, 15, 1),
        inset 10.5rem 10.5rem 10.8rem 0rem rgb(255, 255, 255),
        inset -7.5rem -7.5rem 6.75rem 0rem rgba(10, 113, 15, 1)`,
        
        fontSize: "15rem",
        config:  {
             tension: 250,
             friction:20,
             mass:1,
        }
    }))
    function checkAnswer() {

        if( activeGame === true && wrongAnswer===false ) {
            if(  choosenWords[i] !==choosenWord) {
                dispatch(setWrongAnswer({data:true}));
                dispatch(setAnswers({data:{min: answers.min+1, max: answers.max } }));
            } else {
                       const rand = Math.floor(Math.random() * 4);
                       const words = newWord(wordRange.min,wordRange.max);
                         dispatch(setChoosenFourWords({data: words}));
                         dispatch(setChoosenWord({data: words[rand]}));
                dispatch(setWrongAnswer({data:false}));
                dispatch(setAnswers({data:{min: answers.min, max: answers.max+1 } }));
            }
        }

    }
    return(
        <div className="frame greenBtnF ">
            <animated.div className="greenBtn" onClick={checkAnswer} style={{...spring}}
            onMouseDown={()=>{api.start({
                boxShadow: `inset 13rem 13rem 8.25rem 0rem rgba(10, 113, 15, 0.87),
                       inset 0rem 0rem 0rem 0rem rgba(10, 113, 15, 0.87),
                         inset -13rem -13rem 8.25rem 0rem rgba(10, 113, 15, 0.87),

        `,
                fontSize: "14rem",
                

            })
            // buttonAudioRef.current.currentTime = 0; 
            //     buttonAudioRef.current.play();
        
        }}

            onMouseUp={()=>api.start({
                boxShadow: `inset 4.5rem 4.5rem 8.25rem 0rem rgba(10, 113, 15, 1),
                inset 10.5rem 10.5rem 10.8rem 0rem rgb(255, 255, 255),
                inset -7.5rem -7.5rem 6.75rem 0rem rgba(10, 113, 15, 1)`,

                fontSize: "15rem",
            })}
            onMouseLeave={()=>api.start({
                boxShadow: `inset 4.5rem 4.5rem 8.25rem 0rem rgba(10, 113, 15, 1),
                inset 10.5rem 10.5rem 10.8rem 0rem rgb(255, 255, 255),
                inset -7.5rem -7.5rem 6.75rem 0rem rgba(10, 113, 15, 1)`,

                fontSize: "15rem",
            })}
            
            onTouchStart={()=>api.start({
                boxShadow: `inset 13rem 13rem 8.25rem 0rem rgba(10, 113, 15, 0.87),
                       inset 0rem 0rem 0rem 0rem rgba(10, 113, 15, 0.87),
                         inset -13rem -13rem 8.25rem 0rem rgba(10, 113, 15, 0.87),

        `,
                fontSize: "14rem",

            })}

            onTouchEnd={()=>api.start({
                boxShadow: `inset 4.5rem 4.5rem 8.25rem 0rem rgba(10, 113, 15, 1),
                inset 10.5rem 10.5rem 10.8rem 0rem rgb(255, 255, 255),
                inset -7.5rem -7.5rem 6.75rem 0rem rgba(10, 113, 15, 1)`,

                fontSize: "15rem",
            })

            }
            
            
            >
            
                {Database[choosenWords[i]][1]}
            </animated.div>
        </div>
    )
}
export default function MainFrame() {
    // const choosenWord = useSelector((state: RootState) => state.app.choosenWord);



    return(
        <div className="buttonFrame">
            <AnswerButton i={0}/>
            <AnswerButton i={1} />
            <AnswerButton i={2}/>
            <AnswerButton i={3}/>
        </div>
    )
}