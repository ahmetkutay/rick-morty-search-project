import React from 'react';
import Image from 'next/image';
import Card from '../cardComponent/cardComponent';

interface Character {
    id: number;
    name: string;
    image: string;
    episode: number;
}

interface CharacterListProps {
    characters: Character[];
}

const CharacterListComponent: React.FC<CharacterListProps> = ({ characters }) => {
    return (
        <Card>
            {characters.map((character) => (
                <div key={character.id} style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ padding: '10px' }}>
                        <Image src={character.image} alt={character.name} width={40} height={20} />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                        <h3>{character.name}</h3>
                        <p>Episodes: {character.episode}</p>
                    </div>
                </div>
            ))}
        </Card>
    );
};

export default CharacterListComponent;
