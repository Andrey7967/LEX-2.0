

import { useAppSelector,useAppDispatch } from '../states/Store.ts'
import { setActiveGame, setChoosenFourWords, setChoosenWord, setWrongAnswer } from '../states/Slice.ts';
import { newWord } from '../logic/logic.ts';
import { animated, useSpring } from 'react-spring';

function YellowBtn({content,handle}) {
 

  
  // useEffect(() => {
  //   soundRef.current = new Audio(buttonSound);
  //   soundRef.current.preload = 'auto'; // Preload the audio


  //   soundRef.current.addEventListener('error', (e) => {
  //     console.error('Error loading audio:', e);
  //   });

 
  //   return () => {
  //     if (soundRef.current) {
  //       soundRef.current.pause();
  //       soundRef.current.removeEventListener('error', () => {});
  //       soundRef.current = null;
  //     }
  //   };
  // }, []);
    const [spring,api]  = useSpring(()=> ({
        boxShadow:` inset 4.5rem 4.5rem 8.25rem 0rem rgba(113, 111, 10, 1),
        inset 10.5rem 10.5rem 10.8rem 0rem rgb(255, 255, 255),
        inset -7.5rem -7.5rem 6.75rem 0rem  rgba(111, 113, 10, 1)` ,
        fontSize: "15rem",
        config:  {
             tension: 250,
             friction:20,
             mass:1,
        }
    }))
    return( <div className="frame yellowBtnF">
        <animated.div className="yellowBtn p12" onClick={()=>{
              handle();
              // soundRef.current.currentTime = 0; // Rewind to start
              // soundRef.current.play();
        }} style={{...spring}}
      
          onMouseDown={()=>{api.start({
            boxShadow:` inset 13rem 13rem 8.25rem 0rem rgba(113, 111, 10, 0.87),
            inset 0rem 0rem 0rem 0rem rgba(113, 111, 10, 0.87),
            inset -13rem -13rem  8.25rem 0rem  rgba(111, 113, 10, 0.87)` ,

            fontSize: "14rem",

        })
      
          }}

        onMouseUp={()=>api.start({
            boxShadow:` inset 4.5rem 4.5rem 8.25rem 0rem rgba(113, 111, 10, 1),
            inset 10.5rem 10.5rem 10.8rem 0rem rgb(255, 255, 255),
            inset -7.5rem -7.5rem 6.75rem 0rem  rgba(111, 113, 10, 1)` ,
            fontSize: "15rem",
        })}
        onMouseLeave={()=>api.start({
            boxShadow:` inset 4.5rem 4.5rem 8.25rem 0rem rgba(113, 111, 10, 1),
            inset 10.5rem 10.5rem 10.8rem 0rem rgb(255, 255, 255),
            inset -7.5rem -7.5rem 6.75rem 0rem  rgba(111, 113, 10, 1)` ,
            fontSize: "15rem",
        })}

        onTouchStart={()=>api.start({
            boxShadow:` inset 13rem 13rem 8.25rem 0rem rgba(113, 111, 10, 0.87),
            inset 0rem 0rem 0rem 0rem rgba(113, 111, 10, 0.87),
            inset -13rem -13rem  8.25rem 0rem  rgba(111, 113, 10, 0.87)` ,

            fontSize: "14rem",

        })}

        onTouchEnd={()=>api.start({
            boxShadow:` inset 4.5rem 4.5rem 8.25rem 0rem rgba(113, 111, 10, 1),
            inset 10.5rem 10.5rem 10.8rem 0rem rgb(255, 255, 255),
            inset -7.5rem -7.5rem 6.75rem 0rem  rgba(111, 113, 10, 1)` ,
            fontSize: "15rem",
        })}
        >{content}</animated.div>
    </div>)
}
export default function StartSection() {
    const dispatch = useAppDispatch();
    const activegame = useAppSelector((state) => state.app.activeGame);
    const wrongAnswer = useAppSelector((state) => state.app.wrongAnswer);
    
    const wordRange= useAppSelector((state)=> state.app.wordRange);
   
    function handlePlay() { 
        
       if(activegame !== true) {
        dispatch(setActiveGame({data: true}));
        
       }
       if(wrongAnswer===true) {
         const rand = Math.floor(Math.random() * 4);
         const words = newWord(wordRange.min, wordRange.max);
         dispatch(setChoosenFourWords({data: words}));
         dispatch(setChoosenWord({data: words[rand]}));
         dispatch(setWrongAnswer({data: false}));
       }

    }
    function handleOff() { 
        if(activegame !== false) {
         dispatch(setActiveGame({data: false}));
         
        } 
     }


   
    return(
        <div className="StartSection">
           
            <div className="StartSection-title p16">Learn new lexica</div>
            <div className="horizont toBorders StartSection-buttons">
               <YellowBtn content={"play"} handle={handlePlay}/>
               <YellowBtn content={"off"} handle={handleOff}/>
            </div>
            

        </div>
    )
}