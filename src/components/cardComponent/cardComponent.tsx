import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
}

const CardComponent: React.FC<CardProps> = ({ children }) => {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflowY: 'scroll', height: '400px', margin: '20px' }}>
            {children}
        </div>
    );
};

export default CardComponent;
