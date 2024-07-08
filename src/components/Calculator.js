import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Calculator = () => {
  const functionButtons = ['sin', 'cos', 'tan', 'ln', 'log', '√', 'π', '!', '^'];
  const numberButtons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
  const operatorButtons = ['÷', '(', '*', ')', '+', '=', '-'];
  const specialButtons = ['Del', 'Clr', 'Ans', 'History'];
  const [display, setDisplay] = useState('0');
  const [prevAnswer, setPrevAnswer] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('calculatorHistory');
      if (storedHistory) {
        console.log("Loaded history from localStorage:", storedHistory);
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const jsonHistory = JSON.stringify(history);
      console.log("Updating localStorage with history:", jsonHistory);
      localStorage.setItem('calculatorHistory', jsonHistory);
    } catch (error) {
      console.error("Failed to save history to localStorage:", error);
    }
  }, [history]);

  const calculate = (expression) => {
    try {
      expression = expression
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/√/g, 'Math.sqrt')
        .replace(/\^/g, '**');

      expression = expression.replace(/(sin|cos|tan|ln|log|Math.sqrt)\(([^)]+)\)/g, (match, func, arg) => {
        if (func === 'sin') return `Math.sin(${arg} * Math.PI / 180)`;
        if (func === 'cos') return `Math.cos(${arg} * Math.PI / 180)`;
        if (func === 'tan') return `Math.tan(${arg} * Math.PI / 180)`;
        if (func === 'ln') return `Math.log(${arg})`;
        if (func === 'log') return `Math.log10(${arg})`;
        if (func === 'Math.sqrt') return `Math.sqrt(${arg})`;
        return match;
      });

      const evaluated = Function(`"use strict"; return (${expression})`)();
      return evaluated.toString();
    } catch (error) {
      return 'Error';
    }
  };

  const addToDisplay = (button) => {
    if (button === '=') {
      const result = calculate(display);
      setDisplay(result);
      setPrevAnswer(result);
      setHistory(prevHistory => {
        const newHistory = [...prevHistory, { expression: display, result }];
        console.log("Adding to history:", newHistory);
        return newHistory;
      });
    } else if (button === 'Del') {
      setDisplay(display.slice(0, -1) || '0');
    } else if (button === 'Clr') {
      setDisplay('0');
    } else if (button === 'Ans') {
      setDisplay(prevAnswer);
    } else if (button === 'History') {
      setShowHistory(!showHistory);
    } else if (button === 'π') {
      setDisplay(display === '0' ? `${button}` : `${display}${button}`);
    } else if (functionButtons.includes(button)) {
      setDisplay(display === '0' ? `${button}(` : `${display}${button}(`);
    } else {
      setDisplay(display === '0' ? button : display + button);
    }
  };

  return (
    <div>
      <div className='calBody'>
        <div className='innerDiv'>
          <div className='display'>
            {display}
          </div>
          <div className='numbers'>
            <div className='functions'>
              {functionButtons.map(button => (
                <motion.button 
                  key={button} 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToDisplay(button)}
                >
                  {button}
                </motion.button>
              ))}
            </div>
            <div className='number'>
              {numberButtons.map(button => (
                <motion.button 
                  key={button} 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  id={button === '0' ? 'zero' : undefined}
                  onClick={() => addToDisplay(button)}
                >
                  {button}
                </motion.button>
              ))}
            </div>
            <div className='operators'>
              {operatorButtons.map(button => (
                <motion.button 
                  key={button} 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  id={button === '=' ? 'equal' : undefined}
                  onClick={() => addToDisplay(button)}
                >
                  {button}
                </motion.button>
              ))}
            </div>
            <div className='si'>
              {specialButtons.map(button => (
                <motion.button 
                  key={button} 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToDisplay(button)}
                >
                  {button === 'Del' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512">
                      <path fill="#44403e" d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                    </svg>
                  ) : button === 'History' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
                      <path fill="#44403e" d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"/>
                    </svg>
                  ) : button}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showHistory && (
        <div className='history'>
          <h3>History</h3>
          {history.length > 0 ? (
            <ul>
              {history.map((entry, index) => (
                <li key={index}>
                  <strong>{entry.expression}</strong> = {entry.result}
                </li>
              ))}
            </ul>
          ) : (
            <p>No history yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;
