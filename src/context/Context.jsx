import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context=createContext();

const ContextProvider=(props)=>{
    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [prevPrompt,setPrevPrompt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [ResultData,setResultData]=useState("");

    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
            setResultData((prev)=>prev+nextWord)
        },75*index)
    }
    const newChat=()=>{
        setLoading(false);
        setShowResult(false);
    }



    const onSent = async (prompt) => {
        setResultData(""); // Clear previous result
        setLoading(true);  // Show loading indicator
        setShowResult(true); // Display result section
    
        // Use the passed prompt or the input if the prompt is undefined
        const currentPrompt = prompt !== undefined ? prompt : input;
    
        // Update previous prompts - prepend the current prompt to the list
        // Check if the current prompt is already in the previous prompts
        setPrevPrompt(prev => {
            if (prev.includes(currentPrompt)) {
                return prev; // Return the existing array without modification
            }
            return [currentPrompt, ...prev]; // Prepend current prompt if not present
        });
    
        // Call the run function to get the result
        const result = await run(currentPrompt); 
        setRecentPrompt(currentPrompt); // Update recent prompt after calling run
    
        // Process result
        let responseArray = result.split("**");
        let newResponse = "";
    
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 === 0) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
    
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
    
        // Use delayPara to show response word by word
        for (let i = 0; i < newResponseArray.length; i++) {
            let nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
    
        console.log("Result Data (Updated):", result); // Log the correct result after receiving it
    
        setLoading(false); // Hide loading indicator
        setInput(""); // Clear the input field
    };
    
    

    const contextValue={
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        ResultData,
        input,
        setInput,
        newChat
        

    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}

        </Context.Provider>
    )
}
export default ContextProvider;