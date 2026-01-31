// search the internet tool
// u give it is a natural langauge query
//it calls tavily under the hood
// it returns a clean array of search hits -> WebSearchResultSchema

import {env} from "../shared/env" ;
export async function webSearch(q : string){
    const query = (q?? '').trim();
    if(!query){
        return [];
    }

    return await searchTavilyUtil(query);
}

async function searchTavilyUtil(query: string){
    if(!env.TAVILY_API_KEY){
        throw Error('Tavily api key is missing')
    }
    const response = await fetch('https://api.tavily.com/search', {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json',
            Authorisation: `Bearer ${env.TAVILY_API_KEY}`
        },
        body : JSON.stringify({
            query ,
            search_depth : "basic",
            max_results : 5 ,
            include_answer : false, 
            include_images : false
        }),
    });
}