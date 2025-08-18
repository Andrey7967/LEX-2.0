import { createSlice } from '@reduxjs/toolkit';



interface Range {
  min:number,
  max:number
}

interface State {
 
  choosenWord: number,
  choosenFourWords:  Array<number>,
  wordRange: Range,
  answers: Range,
  activeGame: boolean,
  wrongAnswer: boolean
  
}

const initialState : State = {
    choosenWord: 0,
    choosenFourWords: [0,0,0,0],
    wordRange: {min:0,max:546},
    answers:  {min:0,max:0} ,
    activeGame:false,
    wrongAnswer:false,
   
}
const componentsSlice = createSlice({
  name: 'app',
   initialState,
   reducers: {/*{*/
      setChoosenWord: (state, action) => {
                            const { data} = action.payload ;
                          
                              state.choosenWord = data;
                              
                         
                        } ,  
   setChoosenFourWords: (state, action) => {
                                const { data} = action.payload ;
                              
                                     state.choosenFourWords = data;
                                  
                             
                                  }  ,     
   setWordRange: (state, action) => {
                               const { data} = action.payload ;
                                  
                                  state.wordRange = data;
                                      
                                 
                               } ,            
   setAnswers: (state, action) => {
                                const { data} = action.payload ;
                                      
                                      state.answers = data;
                                          
                                     
                                    
                                     },

  setActiveGame : (state, action) => {
                             const { data} = action.payload ;
                            
                                  state.activeGame = data;
  },
  setWrongAnswer : (state, action) => {
                                    const { data} = action.payload ;
                                   
                                         state.wrongAnswer = data;
  }    
}         
});

  export const {setActiveGame,setChoosenWord,setChoosenFourWords,setWrongAnswer,setWordRange,setAnswers} = componentsSlice.actions;
export default componentsSlice.reducer;
 