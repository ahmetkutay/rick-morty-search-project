import React, { useEffect, useState } from 'react';
import { selectedCharactersApi } from '@/api/rickAndMortyApi';

interface Character {
    id: number;
    name: string;
}

interface SearchInputProps {
    selectedCharacters: number[];
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCheckboxChange: (characterId: number) => void;
    searchValue: string;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({ selectedCharacters, handleSearchChange, onCheckboxChange, searchValue }) => {
    const [selectedCharacterList, setSelectedCharacterList] = useState<Character[]>();

    useEffect(() => {
        const selectedRickAndMortyCharacters = async () => {
            let response = await selectedCharactersApi(selectedCharacters);
            setSelectedCharacterList(response);
        };
        selectedRickAndMortyCharacters();
    }, [selectedCharacters]);

    const selectedCharactersString = selectedCharacterList?.map(character => character.name).join(', ');

    return (
        <div
            onInput={handleSearchChange}
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                padding: '8px',
                border: '1px solid #000000',
                borderRadius: '4px',
                fontSize: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
                color: '#000000',
                cursor: 'text',
            }}
        >
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {selectedCharacterList?.map((character) => (
                    <div
                        key={character.id}
                        onClick={() => onCheckboxChange(character.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '4px',
                            margin: '4px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                            border: '1px solid #000000',
                            fontSize: '14px',
                        }}
                    >
                        {character.name}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search"
                style={{
                    flex: 1,
                    marginLeft: '8px',
                    padding: '8px',
                    border: 'none',
                    fontSize: '16px',
                    outline: 'none',
                }}
            />
        </div>
    );
};

export default SearchInputComponent;
