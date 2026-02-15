
//web path -> browse , summarize , source urls 
//direct path -> llm
//shared shape -> candidate 


export type candidate = {
    answer : string ;
    sources : string [];
    mode : "web" | "direct"
}