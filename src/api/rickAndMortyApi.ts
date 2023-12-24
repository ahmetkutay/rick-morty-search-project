import axios from "axios";

interface Character {
  id: number;
  name: string;
  episode: any;
  image: string;
}
export async function searchCharacters(
  searchWord: string
): Promise<Character[]> {
  let responseCharacter = new Set<Character>();
  try {
    const response = await axios.get(
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
          });
        }
      });
    }
    return Array.from(responseCharacter);
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
}
