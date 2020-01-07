import PropTypes from "prop-types"

export const Movie = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    releaseDate: PropTypes.instanceOf(Date).isRequired,
    voteAverage: PropTypes.number.isRequired,
    posterImageUrl: PropTypes.string,
    backdropImageUrl: PropTypes.string,

    duration: PropTypes.number,
    budget: PropTypes.number,
    backdropImage: PropTypes.string,
    posterImage: PropTypes.string,
    productionCountries: PropTypes.arrayOf(PropTypes.string),
    legend: PropTypes.string,
    actors: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        character: PropTypes.string,
        gender: PropTypes.number,
        photo: PropTypes.string
    })),
    crew: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        name: PropTypes.string,
        department: PropTypes.string,
        job: PropTypes.string,
        gender: PropTypes.number,
        photo: PropTypes.string
    })),

    isExtendedDataLoaded: PropTypes.bool
})
