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

/**
 * Retrieves character data from the Rick and Morty API based on a search word.
 * @param searchWord - The search word to filter the character data. (optional)
 * @returns An array of character objects that match the search word, or an empty array if there was an error or no characters were found.
 */
export async function searchCharacters(
  searchWord?: string
): Promise<Character[]> {
  let responseCharacter = new Map<number, Character>();
  try {
    const response = await getCharacterData(searchWord);
    if (response && response.data.results) {
      response.data.results.forEach((character: Character) => {
        if (!responseCharacter.has(character.id)) {
          responseCharacter.set(character.id, {
            id: character.id,
            name: character.name,
            episode: character.episode && character.episode.length,
            image: character.image,
            checked: character.checked,
          });
        }
      });
    }
    return Array.from(responseCharacter.values());
  } catch (error) {
    return [];
  }
}

/**
 * Retrieves character data from the Rick and Morty API based on the provided character IDs.
 * @param selectedCharacterArray - An array of numbers representing the selected character IDs. (optional)
 * @returns An array of selected character objects based on the provided character IDs, or an empty array if there was an error or no characters were found.
 */
export async function selectedCharactersApi(
  selectedCharacterArray?: number[]
): Promise<SelectedCharacter[]> {
  let responseCharacter = new Set<SelectedCharacter>();
  try {
    if (selectedCharacterArray && selectedCharacterArray.length > 0) {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${selectedCharacterArray.join(",")}`
      );
      if (response && response.data) {
        const characters = Array.isArray(response.data)
          ? response.data
          : Array.prototype.concat(response.data);
        characters.forEach((character: SelectedCharacter) => {
          if (!responseCharacter.has(character)) {
            responseCharacter.add({
              id: character.id,
              name: character.name,
            });
          }
        });
      }
    }
    return Array.from(responseCharacter);
  } catch (error) {
    return [];
  }
}

async function getCharacterData(searchWord?: string) {
  try {
    if (!searchWord) {
      return await axios.get(`https://rickandmortyapi.com/api/character`);
    }
    return await axios.get(
      `https://rickandmortyapi.com/api/character?name=${encodeURIComponent(searchWord)}`
    );
  } catch (error) {
    throw new Error("Failed to retrieve character data");
  }
}
