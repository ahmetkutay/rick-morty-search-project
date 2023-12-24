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
    const [searchedCharacters, setSearcedCharacters] = useState<Character[]>([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const rickAndMortyCharacters = async () => {
            let response = await searchCharacters(searchValue)
            setSearcedCharacters(response.map((character) => ({
                id: character.id,
                name: character.name,
                episode: character.episode,
                image: character.image,
                checked: false,
            })));
        }
        rickAndMortyCharacters()
    }, [searchValue])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleCheckboxChange = (characterId: number) => {
        setSearcedCharacters((prevCharacters) =>
            prevCharacters.map((character) =>
                character.id === characterId
                    ? { ...character, checked: !character.checked }
                    : character
            )
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder={`Search ${searchedCharacters.length > 0 ? searchedCharacters[0].name : ''}...`}
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
