"use client"

import React, { useEffect, useState } from 'react';
import { searchCharacters } from '../../api/rickAndMortyApi';
import CharacterListComponent from '../characterListComponent/characterListComponent';

interface Character {
    id: number;
    name: string;
    episode: number;
    image: string;
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
            })));
        }
        rickAndMortyCharacters()
    }, [searchValue])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search..."
                style={{
                    padding: '8px',
                    border: '1px solid #000000',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    fontSize: '16px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
            />
            <ul>
                <li>
                    <CharacterListComponent characters={searchedCharacters} />
                </li>
            </ul>
        </div>
    );
};

export default SearchComponent;
