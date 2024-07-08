import React from 'react';
import { motion } from 'framer-motion';

const Calculator = () => {
  const functionButtons = ['sin', 'e', 'cos', 'ln', 'tan', 'log', '^', '√', 'π', '!'];
  const numberButtons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
  const operatorButtons = ['÷', '(', 'x', ')', '+', '=', '-'];
  const specialButtons = ['Del', 'Ans', 'H'];

  return (
    <div>
      <div className='calBody'>
        <div className='innerDiv'>
          <div className='display'>2</div>
          <div className='numbers'>
            <div className='functions'>
              {functionButtons.map(button => (
                <motion.button 
                  key={button} 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                >
                  {button}
                </motion.button>
              ))}
            </div>
            <div className='number'>
              {numberButtons.map((button, index) => (
                <motion.button 
                  key={button} 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  id={button === '0' ? 'zero' : undefined}
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
                >
                  {button}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
