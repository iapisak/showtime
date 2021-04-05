import axios from 'axios'

const url = process.env.REACT_APP_API_URL
const key = process.env.REACT_APP_API_KEY

const getPopularMovie = async (setMovies) => {
    const results = await axios.get(`${ url }/movie/popular?api_key=${ key }&language=en-US&page=1`)
    .then(data => data.data.results.map(item => {
                    const { id, title, poster_path: url, overview, } = item
                    return { id, title, url, overview } }))
    return setMovies(results)
}

export { getPopularMovie }