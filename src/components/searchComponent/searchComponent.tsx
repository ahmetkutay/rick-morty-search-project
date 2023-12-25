"use client"

import React, { useEffect, useState } from 'react';
import { searchCharacters } from '../../api/rickAndMortyApi';
import CharacterListComponent from '../characterListComponent/characterListComponent';
import CardComponent from '../cardComponent/cardComponent';

interface Character {
    id: number;
    name: string;
    episode: number;
    image: string;
    checked: boolean;
}

const SearchComponent: React.FC = () => {
    const [searchedCharacters, setSearchedCharacters] = useState<Character[]>([]);
    const [searchValue, setSearchValue] = useState<any>('');
    const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
    const [securedCharacters, setSecuredCharacters] = useState<Character[]>([]); // New state

    useEffect(() => {
        const rickAndMortyCharacters = async () => {
            let response = await searchCharacters(searchValue)
            setSearchedCharacters(response.map((character) => ({
                id: character.id,
                name: character.name,
                episode: character.episode,
                image: character.image,
                checked: false,
            })));
        }
        rickAndMortyCharacters()
    }, [searchValue]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const poppedSearchedValue = event.target.value.split(' ').pop();
        setSearchValue(poppedSearchedValue);
    };

    const handleCheckboxChange = (characterId: number) => {
        setSearchedCharacters((prevCharacters) => {
            const updatedCharacters = prevCharacters.map((character) =>
                character.id === characterId ? { ...character, checked: !character.checked } : character
            );
            setSelectedCharacters(updatedCharacters.filter(character => character.checked));
            setSecuredCharacters(updatedCharacters.filter(character => character.checked)); // Update the securedCharacters state
            return updatedCharacters;
        });
    };

    useEffect(() => {
        const selectedCharacters = searchedCharacters.filter((character) => character.checked);
        setSelectedCharacters(selectedCharacters);
    }, [searchedCharacters]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
                type="text"
                value={securedCharacters.map(character => character.name).join(", ") + " " + searchValue}
                onChange={handleSearchChange}
                placeholder={`Search`}
                style={{
                    padding: '8px',
                    border: '1px solid #000000',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    fontSize: '16px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
            />
            <CardComponent>
                <CharacterListComponent
                    characters={searchedCharacters}
                    onCheckboxChange={handleCheckboxChange}
                />
            </CardComponent>
        </div>
    );
};

export default SearchComponent;