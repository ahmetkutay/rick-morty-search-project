import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './characterListComponent.css'

interface Character {
    id: number;
    name: string;
    image: string;
    episode: number;
    checked: boolean;
}

interface CharacterListProps {
    characters: Character[];
    onCheckboxChange: (characterId: number) => void;
    searchValue: string;
}

const CharacterListComponent: React.FC<CharacterListProps> = ({ characters, onCheckboxChange, searchValue }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleCheck = (characterId: number) => {
        onCheckboxChange(characterId);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
                setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
                break;
            case 'ArrowDown':
                setActiveIndex((prevIndex) => (prevIndex < characters.length - 1 ? prevIndex + 1 : prevIndex));
                break;
            case 'Enter':
                handleCheck(characters[activeIndex].id);
                break;
        }

        if (containerRef.current) {
            const itemHeight = 60;
            containerRef.current.scrollTop = activeIndex * itemHeight;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown as any);
        return () => {
            window.removeEventListener('keydown', handleKeyDown as any);
        };
    }, [activeIndex, characters]);

    return (
        <div ref={containerRef} className="card" id='scrollStyle'>
            {characters.map((character, index) => (
                <div key={character.id} style={{ display: 'flex', flexDirection: 'row', backgroundColor: index === activeIndex ? 'lightgray' : 'transparent' }}>
                    <input type="checkbox" onChange={() => handleCheck(character.id)} checked={character.checked} />
                    <div style={{ padding: '10px' }}>
                        <Image src={character.image} alt={character.name} width={40} height={20} style={{ width: 'auto', height: 'auto' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
                        <h3>
                            {character.name.split(new RegExp(`(${searchValue})`, 'gi')).map((part, index) => (
                                <React.Fragment key={index}>
                                    {part.toLowerCase() === searchValue.toLowerCase() ? (
                                        <b>{part}</b>
                                    ) : (
                                        part
                                    )}
                                </React.Fragment>
                            ))}
                        </h3>
                        <p>Episodes: {character.episode}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharacterListComponent;
