import { sortByOptions, typesOptions } from "./filterSortingOptions";

export const filterByType = (data, typeOption) => {
  switch (typeOption) {
    case typesOptions.CARTOONS:
    case typesOptions.MOVIE:
    case typesOptions.SERIES:
      return data.filter((item) => item.type === typeOption.toLowerCase());
    default:
      return data;
  }
};

export const sortByRating = (data, sortOption) => {
  switch (sortOption) {
    case sortByOptions.RATING_UP:
      return [...data].sort((a, b) => a.rating - b.rating);
    case sortByOptions.RATING_DOWN:
      return [...data].sort((a, b) => b.rating - a.rating);
    default:
      return data;
  }
};

export const sortByName = (data) => {
  return [...data].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};

export const filterByName = (data, searchString) => {
  return data.filter((item) => {
    return item.name.toLowerCase().includes(searchString.toLowerCase());
  });
};

export const filterByDescription = (data, searchString) => {
  const lowerCaseSearchString = searchString.toLowerCase();

  return data.filter((item) => {
    return (
      item.name.toLowerCase().includes(lowerCaseSearchString) ||
      item.description.toLowerCase().includes(lowerCaseSearchString)
    );
  });
};

export const filterByGenres = (data, selectedGenres) => {
  return data.filter((item) => {
    const genreNames = item.genres.map((genre) => genre.name);
    return selectedGenres.every((genre) => genreNames.includes(genre));
  });
};
