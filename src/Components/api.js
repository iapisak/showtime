import axios from 'axios'

const url = process.env.REACT_APP_API_URL
const key = process.env.REACT_APP_API_KEY

const getPopularMovie = async (setMovies) => {
    const results = await axios.get(`${ url }/movie/popular?api_key=${ key }&language=en-US&page=1`)
    .then(data => data.data.results.map(item => {
                    const { id, title, poster_path: url, overview, release_date: released, backdrop_path: backdrop, vote_average: vote } = item
                    return { id, title, url, overview, released, backdrop, vote } }))
    return setMovies(results)
}

const getTrending = async (setTrending) => {
    const results = await axios.get(`${ url }/trending/movie/day?api_key=${ key }`)
    .then(data => data.data.results.map(item => {
                    const { id, title, poster_path: url, overview, release_date: released, backdrop_path: backdrop, vote_average: vote } = item
                    return { id, title, url, overview, released, backdrop, vote } }))
    return setTrending(results)
}


export { getPopularMovie, getTrending }