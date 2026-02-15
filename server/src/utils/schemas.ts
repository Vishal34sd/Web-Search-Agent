import {z} from 'zod';

export const WebSearchResultSchema = z.object({
    title: z.string().min(1),
    url : z.string().url(),
    snippet : z.string().optional().default("")
});

export const WebSearchResultsSchema = z.array(WebSearchResultSchema).max(10);

//We filter web results into a small clean set and let the AI summarize it,
//  saving cost and improving accuracy.

export type WebSearchResult = z.infer<typeof WebSearchResultsSchema> ;

export const openUrlInputSchema = z.object({
    url : z.url() ,

});

export const openUrlOutputSchema = z.object({
    url : z.url() ,
    content : z.string().min(1)

});

export const summarizeInputSchema   = z.object({
    text : z.string().min(50 , "Need a bit more text to summarize ")
});

export const summarizeOutputSchema   = z.object({
    summary : z.string().min(1 , "Need a bit more text to summarize ")
})