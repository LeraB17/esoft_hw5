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

export const getSearchString = (queryParams) => {
  const filteredQueryParams = Object.entries(queryParams).filter(
    ([key, value]) => value.length > 0
  );
  const searchParams = new URLSearchParams(filteredQueryParams);

  return `?${searchParams.toString()}`;
};

export const getSimilarFilms = (films, selectedFilm) => {
  const selectedGenres = selectedFilm?.genres?.map((item) => item.name);
  const minMatches = selectedGenres?.length > 1 ? 2 : 1;

  return films
    .filter((film) => film.name !== selectedFilm.name)
    .filter((film) => {
      const genreNames = film.genres.map((genre) => genre.name);
      const matchingGenres = selectedGenres?.filter((genre) =>
        genreNames.includes(genre)
      );
      return matchingGenres?.length >= minMatches;
    });
};

export const getDateNowToString = () => {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const addStartZero = (value) => (value < 10 ? `0${value}` : value);

  const formattedDate =
    `${addStartZero(day)}-${addStartZero(month)}-${year}` +
    ` ` +
    `${addStartZero(hours)}:${addStartZero(minutes)}:${addStartZero(seconds)}`;

  return formattedDate;
};

const parseFormattedDate = (dateStr) => {
  const [datePart, timePart] = dateStr.split(" ");

  const [day, month, year] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds);
};

export const sortByDate = (data) => {
  if (!data) return [];
  return [...data].sort((a, b) => {
    const dateA = parseFormattedDate(a.date);
    const dateB = parseFormattedDate(b.date);

    return dateB - dateA;
  });
};