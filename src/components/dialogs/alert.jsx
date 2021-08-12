import React, { Suspense, lazy, useContext } from 'react';
import './alert.css';
export const Alert = ({ title, icon }) => (
  <div className='alert-container'>
    <div className='alert-icon'>
      <i className={`fas ${icon}`}></i>
    </div>
    <div className='alert-title'>
      <h2>{title}</h2>
    </div>
  </div>
);
