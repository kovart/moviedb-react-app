import PropTypes from "prop-types"

export const Movie = PropTypes.shape({
    name: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    voteAverage: PropTypes.number.isRequired,
    posterImageUrl: PropTypes.string.isRequired,
    backdropImageUrl: PropTypes.string,
})
