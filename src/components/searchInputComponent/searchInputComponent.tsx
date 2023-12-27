import React, { useEffect, useState } from 'react';
import { selectedCharactersApi } from '@/api/rickAndMortyApi';
import './searchInputComponent.css'

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

    return (
        <div
            onInput={handleSearchChange}
            className='input-wrapper'
        >
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {selectedCharacterList?.map((character) => (
                    <div
                        key={character.id}
                        className='selected-character'
                    >
                        {character.name}
                        <div onClick={() => onCheckboxChange(character.id)} className='close-icon'>
                            X
                        </div>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search"
                className='search-input'
            />
        </div>
    );
};

export default SearchInputComponent;
