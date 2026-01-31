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