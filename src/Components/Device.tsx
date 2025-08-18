
import  {useState,useRef} from 'react' 
import Database from '../Database/data.ts'
import MainFrame from './MainFrame.tsx'
import Display from './Display.tsx'
import Wheel from './Wheel.tsx'
import StartSection from './StartSection.tsx'
import Logo from './Logo.tsx'
import { useAppDispatch, useAppSelector } from '../states/Store.ts'
import { setWordRange } from '../states/Slice.ts'


export default function Device()  {
    const dispatch = useAppDispatch();
    const wordRange = useAppSelector((state)=> state.app.wordRange);
    const activeGame = useAppSelector((state)=> state.app.activeGame);
    const [position1,setPosition1] = useState<number>(0);
    const [position2,setPosition2] = useState<number>(0);
  
    const swipe1=useRef<boolean>(false);
    const swipe2= useRef<boolean>(false);
    const touch1 = useRef<number>(0);
    const touch2 = useRef<number>(0);
  
    function changeMin(e: WheelEvent) {
  
    
      if(e.deltaY > 0) {
        setPosition1(position1-3);
        if(position1 < -100) {
          setPosition1(0);
        }
        if (wordRange.min < Database.length-1 && activeGame===true) {
          if(Math.abs(wordRange.max-wordRange.min)>7) {
      
            dispatch(setWordRange({data: {min: wordRange.min+3, max: wordRange.max}}));
          }
  
    
        }
        }  else {
          setPosition1(position1+3);
        if(position1 > 0) {
          setPosition1(-100);
        }
          if(wordRange.min > 0  && activeGame===true) {
 
              dispatch(setWordRange({data: {min: wordRange.min-3, max: wordRange.max}}));
              
            
          }
        } 
        
      }
     
      
      
    
    function changeMax(e: WheelEvent ) {
 
        if(e.deltaY > 0) {
          setPosition2(position2-3);
          if(position2 < -100) {
            setPosition2(0);
          }
          if (wordRange.max < Database.length-1 && activeGame===true) {
           
        
              dispatch(setWordRange({data: {min: wordRange.min, max: wordRange.max+3}}));
              
    
      
          }
          }  else {
            setPosition2(position2+3);
          if(position2 > 0) {
            setPosition2(-100);
          }
            if(wordRange.max > 4  && activeGame===true) {
              if(Math.abs(wordRange.max-wordRange.min)>7) {
                dispatch(setWordRange({data: {min: wordRange.min, max: wordRange.max-3}}));
                
              }
            }
          } 
        
         
    

      
      
    }
    
  function TouchMin(moveY) {
    if(moveY < 0) {
    
      setPosition1(position1-1.5);
      if(position1 < -100) {
        setPosition1(0);
      }
      if (wordRange.min < Database.length-1 && activeGame===true) {
        if(Math.abs(wordRange.max-wordRange.min)>7) {
    
          dispatch(setWordRange({data: {min: wordRange.min+3, max: wordRange.max}}));
        }

  
      }
      }  else {
        setPosition1(position1+1.5);
      if(position1 > 0) {
        setPosition1(-100);
      }
        if(wordRange.min > 0  && activeGame===true) {

            dispatch(setWordRange({data: {min: wordRange.min-3, max: wordRange.max}}));
            
          
        }
      } 
      
    
  }
    function TouchMax(moveY) {
     
      if(moveY < 0) {
        setPosition2(position2-1.5);
        if(position2 < -100) {
          setPosition2(0);
        }
        if (wordRange.max < Database.length-1 && activeGame===true) {
         
      
            dispatch(setWordRange({data: {min: wordRange.min, max: wordRange.max+3}}));
            
  
    
        }
        }  else {
          setPosition2(position2+1.5);
        if(position2 > 0) {
          setPosition2(-100);
        }
          if(wordRange.max > 4  && activeGame===true) {
            if(Math.abs(wordRange.max-wordRange.min)>7) {
              dispatch(setWordRange({data: {min: wordRange.min, max: wordRange.max-3}}));
              
            }
          }
        } 
    }
    function touchStart(e,touch,swipe) {
     
      touch.current = e.touches[0].clientY;
      swipe.current = true;

  }

  
  function touchEnd(swipe) {
    swipe.current = false;
  }


  function touchMove(e ,change,touch,swipe) {
      if(!swipe.current) return;
      const touchY = e.touches[0].clientY;
      const diffY = touchY - touch.current;
      const elemRect  =e.currentTarget.getBoundingClientRect();
      if(touchY < elemRect.top || touchY > elemRect.bottom) {
        touchEnd(swipe);
        return;
      }
      change(diffY);
      touch.current = touchY;


  }


    return(
        <div className="device" >
          <div className="device-display">
          <Display/>
          <div className="horizont  toBorders deviceAdjust">
            <StartSection/>
            <div className="horizont wheelSection">
            <Wheel title="min" change={(e)=> changeMin(e)} position={position1} Swipe={
              {start:(e) => touchStart(e,touch1,swipe1),
              move:(e) => touchMove(e,TouchMin,touch1,swipe1),
              end: ()=> touchEnd(swipe1)}}/>
           <Wheel title="max" change={(e)=> changeMax(e)} position={position2} Swipe={
              {start:(e) => touchStart(e,touch2,swipe2),
              move:(e) => touchMove(e,TouchMax,touch2,swipe2),
              end: ()=> touchEnd(swipe2)}}/>
            </div>
          
        
         </div>
          
          </div>
          <div className="device-answers">

          <MainFrame/>
          <Logo/>
          </div>
       

        </div >
    )
}