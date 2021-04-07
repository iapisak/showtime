import axios from 'axios'

const url = process.env.REACT_APP_API_URL
const key = process.env.REACT_APP_API_KEY

const getPopular = async (setMovies, type) => {
    const results = await axios.get(`${ url }/${ type }/popular?api_key=${ key }&language=en-US&page=1`)
    .then(data => data.data.results.map(item => {
                    const { id, poster_path: url, overview, backdrop_path: backdrop, vote_average: vote } = item
                    if (type === 'movie') {
                        const { title, release_date: released } = item
                        return { id, title, url, overview, released, backdrop, vote }
                    }
                    const { original_name: title, first_air_date: released, } = item
                    return { id, title, url, overview, released, backdrop, vote } }))
    return setMovies(results)
}

const getTrending = async (setTrending, weekType) => {
    const results = await axios.get(`${ url }/trending/all/${ weekType }?api_key=${ key }`)
    .then(data => data.data.results.map(item => {
                    const { id, poster_path: url, overview, backdrop_path: backdrop, vote_average: vote, media_type } = item
                    if (media_type === 'movie') {
                        const { title, release_date: released } = item
                        return { id, title, url, overview, released, backdrop, vote, media_type }
                    }
                    const { original_name: title, first_air_date: released, } = item
                    return { id, title, url, overview, released, backdrop, vote, media_type } }))
    return setTrending(results)
}

const getMovies = async (selectOption, pages) => {
    const results = await axios.get(`${ url }/movie/${ selectOption }?api_key=${ key }&language=en-US&page=${ pages }`)
    .then(data => data.data.results.map(item => {
                    const { id, title, poster_path: url, overview, release_date: released, backdrop_path: backdrop, vote_average: vote } = item
                    return { id, title, url, overview, released, backdrop, vote } }))
    return results
}

export { getPopular, getTrending, getMovies }