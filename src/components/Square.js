import React from 'react';

const Square = ({ squareIndex, squareClassName, updateSquares }) => {
    const handleClick = () => {
        updateSquares(squareIndex);
    };
    return (
        <div className="square" onClick={handleClick}>
            {squareClassName}
        </div>
    );
};

export default Square;