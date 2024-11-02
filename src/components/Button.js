import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ text, type ,  onClick, styleClass , link0 }) => {
  return (
    <Link to={link0}>
    <button
      onClick={onClick}
      className={`w-28 h-8 border border-neutral-500 shadow-xl bg-green-500  flex items-center justify-center
               hover:bg-green-600 text-black font-semibold py-2 rounded-lg text-[11px] ${styleClass}`}
               type={type}
    >
{text}
    </button>
    </Link>
  );
};

export default Button;
