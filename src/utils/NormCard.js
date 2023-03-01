import { BASE_BF_API_URL } from '../constants/constants';

function NormCard({
  country,
  director,
  duration,
  year,
  description,
  trailerLink,
  nameRU,
  nameEN,
  id,
  image,
}) {
  return {
    country,
    director,
    duration,
    year,
    description,
    trailerLink,
    nameRU,
    nameEN,
    movieId: id,
    image: `${BASE_BF_API_URL}${image.url}`,
    thumbnail: `${BASE_BF_API_URL}${image.formats.thumbnail.url}`,
  };
}

export default NormCard;
