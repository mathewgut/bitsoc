// returns shortText if screensize < 748px 
// returns longText if screen size >= 748px
export function setTextLength(shortText:string, longText:string){
   return(window.innerWidth < 748 ? shortText : longText);
}