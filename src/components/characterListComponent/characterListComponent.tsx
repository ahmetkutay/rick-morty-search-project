import React from 'react';
import Image from 'next/image';

interface Character {
    id: number;
    name: string;
    image: string;
    episode: number;
}

interface CharacterListProps {
    characters: Character[];
    onCheckboxChange: (characterId: number) => void;
}

const CharacterListComponent: React.FC<CharacterListProps> = ({ characters, onCheckboxChange }) => {
    const handleCheck = (characterId: number) => {
        onCheckboxChange(characterId);
    };

    return (
        <>
            {characters.map((character) => (
                <div key={character.id} style={{ display: 'flex', flexDirection: 'row' }}>
                    <input type="checkbox" onChange={() => handleCheck(character.id)} />
                    <div style={{ padding: '10px' }}>
                        <Image src={character.image} alt={character.name} width={40} height={20} />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                        <h3>{character.name}</h3>
                        <p>Episodes: {character.episode}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CharacterListComponent;
