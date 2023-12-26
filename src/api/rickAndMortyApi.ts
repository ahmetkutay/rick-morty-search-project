import axios from "axios";

interface Character {
  id: number;
  name: string;
  episode: any;
  image: string;
  checked: boolean;
}

interface SelectedCharacter {
  id: number;
  name: string;
}

export async function searchCharacters(
  searchWord?: string
): Promise<Character[]> {
  let responseCharacter = new Set<Character>();
  try {
    const response =
      searchWord === undefined || searchWord === "" || searchWord === null
        ? await axios.get(`https://rickandmortyapi.com/api/character`)
        : await axios.get(
            `https://rickandmortyapi.com/api/character/?name=${searchWord}`
          );
    if (response && response.data.results) {
      response.data.results.map((character: Character) => {
        if (!responseCharacter.has(character)) {
          responseCharacter.add({
            id: character.id,
            name: character.name,
            episode: character.episode && character.episode.length,
            image: character.image,
            checked: character.checked ?? false,
          });
        }
      });
    }
    return Array.from(responseCharacter);
  } catch (error) {
    return [];
  }
}

export async function selectedCharactersApi(
  selectedCharacterArray?: number[]
): Promise<SelectedCharacter[]> {
  let responseCharacter = new Set<SelectedCharacter>();
  try {
    const response =
      selectedCharacterArray?.length > 0 &&
      (await axios.get(
        `https://rickandmortyapi.com/api/character/${selectedCharacterArray?.join(
          ","
        )}`
      ));
    if (response && response.data) {
      const characters = Array.isArray(response.data)
        ? response.data
        : [response.data];
      characters.map((character: SelectedCharacter) => {
        if (!responseCharacter.has(character)) {
          responseCharacter.add({
            id: character.id,
            name: character.name,
          });
        }
      });
    }
    return Array.from(responseCharacter);
  } catch (error) {
    return [];
  }
}
