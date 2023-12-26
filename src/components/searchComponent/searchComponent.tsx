"use client"

import React, { useEffect, useState } from 'react';
import { searchCharacters } from '../../api/rickAndMortyApi';
import CharacterListComponent from '../characterListComponent/characterListComponent';
import CardComponent from '../cardComponent/cardComponent';
import SearchInputComponent from '../searchInputComponent/searchInputComponent';

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
    const [selectedCharacterIds, setSelectedCharacterIds] = useState<number[]>([]);

    useEffect(() => {
        const rickAndMortyCharacters = async () => {
            let response = await searchCharacters(searchValue);
            setSearchedCharacters(response.map((character) => ({
                id: character.id,
                name: character.name,
                episode: character.episode,
                image: character.image,
                checked: selectedCharacterIds.includes(character.id),
            })));
        };
        rickAndMortyCharacters();
    }, [searchValue, selectedCharacterIds]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const poppedSearchedValue = event.target.value.split(' ').pop();
        setSearchValue(poppedSearchedValue);
    };

    const handleCheckboxChange = (characterId: number) => {
        setSelectedCharacterIds((prevIds) => {
            if (prevIds.includes(characterId)) {
                return prevIds.filter((id) => id !== characterId);
            } else {
                return [...prevIds, characterId];
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SearchInputComponent handleSearchChange={handleSearchChange} onCheckboxChange={handleCheckboxChange} selectedCharacters={selectedCharacterIds} searchValue={searchValue} />
            <CardComponent>
                <CharacterListComponent
                    characters={searchedCharacters}
                    onCheckboxChange={handleCheckboxChange}
                    searchValue={searchValue}
                />
            </CardComponent>
        </div>
    );
};

export default SearchComponent;