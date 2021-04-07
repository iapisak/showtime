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

const getMovies = async (array, setMovies, selectOption, pages) => {
    const results = await axios.get(`${ url }/movie/${ selectOption }?api_key=${ key }&language=en-US&page=${ pages }`)
    .then(data => data.data.results.map(item => {
                    const { id, title, poster_path: url, overview, release_date: released, backdrop_path: backdrop, vote_average: vote } = item
                    return { id, title, url, overview, released, backdrop, vote } }))
    if (!results) return
    if (!array.length) return setMovies(results)
    if (!results) return
    const newArray = [...array]
    setMovies([...newArray, ...results])
}

const getTvs = async (array, setTvs, selectOption, pages) => {
    const results = await axios.get(`${ url }/tv/${ selectOption }?api_key=${ key }&language=en-US&page=${ pages }`)
    .then(data => data.data.results.map(item => {
                    const { id, original_name: title, poster_path: url, overview, first_air_date: released, backdrop_path: backdrop, vote_average: vote } = item
                    return { id, title, url, overview, released, backdrop, vote } }))
    if (!results) return
    if (!array.length) return setTvs(results)
    if (!results) return
    const newArray = [...array]
    setTvs([...newArray, ...results])
}

const getReviews = async(id, path, setReviews)=> {
    const results = await axios.get(`${ url }/${ path }/${ id }/reviews?api_key=${key}&language=en-US&page=1)`)
    .then(data => data.data.results)
    if (!results) return
    return setReviews(results)
}

const getCredits = async(id, path, setCredits) => {
    const results = await axios.get(`${ url }/${ path }/${ id }/credits?api_key=289ceb9c9f5fe2b134e1433ef8599082&language=en-US`)
    .then(data => data.data.cast)
    if (!results) return
    return setCredits(results)
}

export { getPopular, getTrending, getMovies, getTvs, getReviews, getCredits }