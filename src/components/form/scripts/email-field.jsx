import React, { useState, useEffect } from "react";
import {validateEmail} from "../scripts/validations.js";
import "../styles/form.css";

export default function EmailField({isDebounce = false}) {
    const [inputText, setInputText] = useState('');
    const [isErrored, setIsErrored] = useState(false);
    const [isTimeouted, setIsTimeouted] = useState(false);

    const debouncedInputFunction = () => {
        if(!isTimeouted) {
            setIsTimeouted(true);
            setIsErrored(validateEmail(inputText));
            setTimeout(() => {
                setIsErrored(!validateEmail(inputText));
                setIsTimeouted(false);
            }, 100
            );
        }
    };

    const InputResults = () => { 
        if (inputText.length === 0) {
            return [];
          } else if(isDebounce) {
            return debouncedInputFunction(inputText);
          } else {
            setIsErrored(!validateEmail(inputText));
          }
        };

    useEffect(() => {
        InputResults(inputText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputText])


    return <div>
            Email: <input className={`input ${isErrored ? 'errored' : ''}`} type="email" onChange={(e) => setInputText(e.target.value)}/>
        </div>
}