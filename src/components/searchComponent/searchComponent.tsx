"use client"

import React, { useEffect, useState } from 'react';
import { searchCharacters } from '../../api/rickAndMortyApi';
import CharacterListComponent from '../characterListComponent/characterListComponent';
import SearchInputComponent from '../searchInputComponent/searchInputComponent';
import './searchCompoment.css'

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
    const [loadingState, setLoadingState] = useState<boolean>(true);

    useEffect(() => {
        const rickAndMortyCharacters = async () => {
            setLoadingState(true);
            let response = await searchCharacters(searchValue);
            setSearchedCharacters(response.map((character) => ({
                id: character.id,
                name: character.name,
                episode: character.episode,
                image: character.image,
                checked: selectedCharacterIds.includes(character.id),
            })));
            setLoadingState(false);
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
        <div className='search-wrapper'>
            <SearchInputComponent handleSearchChange={handleSearchChange} onCheckboxChange={handleCheckboxChange} selectedCharacters={selectedCharacterIds} searchValue={searchValue} />
            <CharacterListComponent
                loadingState={loadingState}
                characters={searchedCharacters}
                onCheckboxChange={handleCheckboxChange}
                searchValue={searchValue}
            />
        </div>
    );
};

export default SearchComponent;