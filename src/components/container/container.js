import React from 'react';
import './container.css';

export const Container = ({children, isMaxHeight}) => (
    <div className={`container-component${isMaxHeight? ' container-component-max-height' : ''}`}>
        {children}
    </div>
);