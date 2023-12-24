import React, { ReactNode } from 'react';
import './cardComponent.css'
interface CardProps {
    children: ReactNode;
}

const CardComponent: React.FC<CardProps> = ({ children }) => {
    return (
        <div className="card" id="scrollStyle">
            {children}
        </div>
    );
};

export default CardComponent;
