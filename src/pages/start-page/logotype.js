import React, { useEffect, useRef, useState } from 'react';
import { Logo } from './logo-state-1';

export const LogoType = () => {
    const [imageToShow, setImageToShow] = useState(1);
    const isLooping = useRef();
   const randomNumber = () => Math.floor(Math.random() * (20000 - 5000) + 5000);

   const doFlicker = () => {
       setImageToShow(.4);
       isLooping.current = true;
       setTimeout(() => { 
           setImageToShow(1);
           setTimeout(() => {
               setImageToShow(.1); 
               setTimeout(() => {
                    isLooping.current = false;
                   setImageToShow(1);
                   doFlickerAfterTimeout();
               }, 100);
           }, 250);
       }, 200);
   };

   const doFlickerAfterTimeout = () => {
       setTimeout(() => {
           if(!isLooping.current)doFlicker();
       }, randomNumber());
   };

   useEffect(() => {
       doFlickerAfterTimeout();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
        

    return (
    <h1>
        <Logo className={`logotype ${imageToShow === 0.1 ? 'logotype-gray-scale': ''}`} style={{opacity: imageToShow}} />    
    </h1>
    );
};