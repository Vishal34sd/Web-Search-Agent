import {RunnableLambda} from "@langchain/core/runnables";
import {searchInputSchema } from "../utils/schemas"


export function routeStrategy(q: string): "web" | "direct" {
    const trimedQuery = q.toLowerCase().trim();

    const isLongQuery = trimedQuery.length > 70;

    const recentYearRegex= /\b20(2[4-9]|3[0-9])\b/.test(trimedQuery);

    const patterns: RegExp[] = [

        /\btop[-\s]*\d+\b/u,

        /\bbest\b/u,

        /\brank(?:ings)?\b/u,

        /\bwhich\s+is\s+better\b/u,

        /\b(?:vs\.?|versus)\b/u,

        /\bcompare|comparison\b/u,

        /\bprice|prices|pricing|cost|costs|cheapest|cheaper|affordable\b/u,

        /\bunders*\d+(?:\s*[kK])?\b/u,

        /\b(?:₹|\$)\s*\d+/u

    ];

    const isQueryPresentInPatterns = patterns.some(pattern => pattern.test(trimedQuery))

    if( isLongQuery || recentYearRegex || isQueryPresentInPatterns){
        return "web" ;
    }
    else{
        return "direct"
    }
}

export const routerStep = RunnableLambda.from(async (input : {q: string})=>{
    const {q} = searchInputSchema.parse(input)

    const mode = routeStrategy(q);

    return {
        q , 
        mode
    };
})