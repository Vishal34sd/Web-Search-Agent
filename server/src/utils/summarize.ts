import {summarizeInputSchema,summarizeOutputSchema } from "../utils/schemas";
import {getChatModel} from "../shared/model";
import {SystemMessage , HumanMessage} from "@langchain/core/messages"

export async function summarize(text : string){

    const {text : raw} = summarizeInputSchema.parse({text})

    const clipped = clip(raw , 4000)

    const model = getChatModel({temperature : 0.2});
    
    // ask the model to summarize in a controlled manner
    const res = await model.invoke([
        new SystemMessage([
            "You are a helpful assistant that writes short , accurate summaries.",
            "Guidelines:",
            " - Be factual and neutral , avaoid marketing languages. ",
            " - 5-8 sentences , no list unless absolutely necessary.",
            " - Do not invent sources , you can only summarize the provided text.",
            "- Keep it readable for beginners"
        ].join("\n")),

        new HumanMessage([
            "Summarize the following content for a beginner friendly audience.",
            "Focus on key facts and remove fluff",
            "Text:", clipped
        ].join("\n\n"))
    ])

    const rawModelOutput = typeof res.content === "string" ? res.content : String(res.content)

    const summary = normalizeSummary(rawModelOutput);
    return summarizeOutputSchema.parse(summary)

}

function clip(s : string , max : number){
    return s.length > max ? s.slice(0, max) : s
}

function normalizeSummary(s: string){
    const t = s.replace(/\s+\n/g, "\n").
    replace(/\n{3,}/g, "\n").trim();

    return t.slice(0 , 2500);
}