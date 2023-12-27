import axios from "axios";
import { searchCharacters, selectedCharactersApi } from "@/api/rickAndMortyApi";

describe("code snippet", () => {
  it("should retrieve character data without a search word", async () => {
    axios.get = jest.fn().mockResolvedValueOnce({
      data: {
        results: [
          {
            id: 1,
            name: "Rick Sanchez",
            episode: ["S01E01", "S01E02"],
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            checked: true,
          },
          {
            id: 2,
            name: "Morty Smith",
            episode: ["S01E01", "S01E02"],
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            checked: false,
          },
        ],
      },
    });

    const result = await searchCharacters();

    expect(result).toEqual([
      {
        id: 1,
        name: "Rick Sanchez",
        episode: 2,
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        checked: true,
      },
      {
        id: 2,
        name: "Morty Smith",
        episode: 2,
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        checked: false,
      },
    ]);
  });

  it("should retrieve character data with a search word", async () => {
    axios.get = jest.fn().mockResolvedValueOnce({
      data: {
        results: [
          {
            id: 1,
            name: "Rick Sanchez",
            episode: ["S01E01", "S01E02"],
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            checked: true,
          },
        ],
      },
    });

    const result = await searchCharacters("Rick");

    expect(result).toEqual([
      {
        id: 1,
        name: "Rick Sanchez",
        episode: 2,
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        checked: true,
      },
    ]);
  });

  it("should retrieve selected character data with selected character IDs", async () => {
    axios.get = jest.fn().mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: "Rick Sanchez",
        },
        {
          id: 2,
          name: "Morty Smith",
        },
      ],
    });

    const result = await selectedCharactersApi([1, 2]);

    expect(result).toEqual([
      {
        id: 1,
        name: "Rick Sanchez",
      },
      {
        id: 2,
        name: "Morty Smith",
      },
    ]);
  });

  it("should return an empty array when no characters are found", async () => {
    axios.get = jest.fn().mockResolvedValueOnce({
      data: {
        results: [],
      },
    });

    const result = await searchCharacters();

    expect(result).toEqual([]);
  });

  it("should return an empty array when there is an error", async () => {
    axios.get = jest
      .fn()
      .mockRejectedValueOnce(new Error("Failed to retrieve character data"));

    const result = await searchCharacters();

    expect(result).toEqual([]);
  });

  it("should return an empty array when no selected characters are found", async () => {
    axios.get = jest.fn().mockResolvedValueOnce({
      data: [],
    });

    const result = await selectedCharactersApi();

    expect(result).toEqual([]);
  });
});
