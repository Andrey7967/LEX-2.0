import Database from "../Database/data.ts";
import { useAppDispatch } from "../states/Store.ts";
import { setChoosenWord } from "../states/Slice.ts";
export function newWord(min:number,max:number): Array<number> {
    const Indexes = new Array<number>(4);
    let rand:number = 0;
    let filled = 0;
    
    while(filled<4) {
       rand =  min + Math.floor(Math.random() * (max-min+1)) ;
       if(!Indexes.includes(rand)) {
        Indexes[filled] = rand;
        filled++;
       }
       
    }
     return Indexes;
  
            
   }

