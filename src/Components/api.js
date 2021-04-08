import axios from 'axios'

const url = process.env.REACT_APP_API_URL
const key = process.env.REACT_APP_API_KEY

const noImage = 'https://www.burmunk.am/themes/burmunk/assets/no-product-image.png'

const getPopular = (setMovies, type) => {
    axios.get(`${ url }/${ type }/popular?api_key=${ key }&language=en-US&page=1`)
        .then(async data => {
            const results = await data.data.results.map(item=> {
                let { id, poster_path: url, overview, backdrop_path: backdrop, vote_average: vote } = item
                    if (!url) url = noImage
                    else url = `https://image.tmdb.org/t/p/w500${url}`
                    if (type === 'movie') {
                        const { title, release_date: released } = item
                        return { id, title, url, overview, released, backdrop, vote }
                    }
                    const { original_name: title, first_air_date: released, } = item
                    return { id, title, url, overview, released, backdrop, vote } })
            return setMovies(results)
        })
}

const getTrending = (setTrending, weekType) => {
    axios.get(`${ url }/trending/all/${ weekType }?api_key=${ key }`)
        .then(async data => {
            const results = await data.data.results.map(item => {
                let { id, poster_path: url, overview, backdrop_path: backdrop, vote_average: vote, media_type } = item
                    if (!url) url = noImage
                    else url = `https://image.tmdb.org/t/p/w500${url}`
                    if (media_type === 'movie') {
                        const { title, release_date: released } = item
                        return { id, title, url, overview, released, backdrop, vote, media_type }
                    }
                    const { original_name: title, first_air_date: released, } = item
                    return { id, title, url, overview, released, backdrop, vote, media_type } })
            return setTrending(results)
        })
}

// Movie Functional
const getMovies = (setMovies, selectOption) => {
    axios.get(`${url}/movie/${selectOption}?api_key=${key}&language=en-US&page=1`)
    .then(async data=> {
        const results = await data.data.results.map(item=> {
            let { id, title, poster_path: url, overview, release_date: released, backdrop_path: backdrop, vote_average: vote } = item
            if (!url) url = noImage
            else url = `https://image.tmdb.org/t/p/w500${url}`
            return { id, title, url, overview, released, backdrop, vote } 
        })
        setMovies(results)
    })
}

const loadMoreMovies = (setMovies, selectOption, pages, movies)=> {
    axios.get(`${url}/movie/${selectOption}?api_key=${key}&language=en-US&page=${pages}`)
    .then(async data=> {
        const results = await data.data.results.map(item=> {
            let { id, title, poster_path: url, overview, release_date: released, backdrop_path: backdrop, vote_average: vote } = item
            if (!url) url = noImage
            else url = `https://image.tmdb.org/t/p/w500${url}`
            return { id, title, url, overview, released, backdrop, vote } 
        })
        const newArray = [...movies]
        setMovies([...newArray, ...results])
    })
}

const getSearchMovie = (search, setSearchMovies) => {
    axios.get(`${ url }/search/movie?api_key=289ceb9c9f5fe2b134e1433ef8599082&language=en-US&query=${search}&page=1&include_adult=false`)
    .then(async data => {
        const results = await data.data.results.map(movie => {
            let { id, title, poster_path: url, overview, release_date: released, backdrop_path: backdrop, vote_average: vote } = movie
            if (!url) url = noImage
            else url = `https://image.tmdb.org/t/p/w500${url}`
            return { id, title, url, overview, released, backdrop, vote }
        })
    setSearchMovies(results)
    })
}

// TV Function //
const getTvs = (setTvs, selectOption) => {
    axios.get(`${url}/tv/${selectOption}?api_key=${key}&language=en-US&page=1`)
    .then(async data=> {
        const results = await data.data.results.map(item => {
            let { id, original_name: title, poster_path: url, overview, first_air_date: released, backdrop_path: backdrop, vote_average: vote } = item
            if (!url) url = noImage
            else url = `https://image.tmdb.org/t/p/w500${url}`
            return { id, title, url, overview, released, backdrop, vote } 
        })
        setTvs(results)
    })
}

const loadMoreTvs = (setTvs, selectOption, pages, tvs)=> {
    axios.get(`${url}/tv/${selectOption}?api_key=${key}&language=en-US&page=${pages}`)
    .then(async data=> {
        const results = await data.data.results.map(item=> {
            let { id, original_name: title, poster_path: url, overview, first_air_date: released, backdrop_path: backdrop, vote_average: vote } = item
            if (!url) url = noImage
            else url = `https://image.tmdb.org/t/p/w500${url}`
            return { id, title, url, overview, released, backdrop, vote } 
        })
        const newArray = [...tvs]
        setTvs([...newArray, ...results])
    })
}

// All Track Information funtional
const getReviews = async (id, path, setReviews)=> {
    const results = await axios.get(`${ url }/${ path }/${ id }/reviews?api_key=${key}&language=en-US&page=1)`)
    .then(async data => data.data.results)
    if (!results) return
    setReviews(results)
}

const getCredits = async(id, path, setCredits) => {
    const results = await axios.get(`${ url }/${ path }/${ id }/credits?api_key=289ceb9c9f5fe2b134e1433ef8599082&language=en-US`)
    .then(data => data.data.cast)
    if (!results) return
    return setCredits(results)
}

const getRecommend = (id, path, setRecommend) => {
    axios.get(`${url}/${path}/${id}/similar?api_key=289ceb9c9f5fe2b134e1433ef8599082&language=en-US&page=1`)
    .then(async data => {
        const results = await data.data.results.map(item=> {
            let { id, title, poster_path: url, overview, release_date: released, backdrop_path: backdrop, vote_average: vote } = item
            if (!url) url = noImage
            else url = `https://image.tmdb.org/t/p/w500${url}`
            return { id, title, url, overview, released, backdrop, vote } 
        })
        return setRecommend(results)
    })
}

export { getPopular, getTrending, getMovies, loadMoreMovies, getSearchMovie, getTvs, loadMoreTvs, getReviews, getCredits, getRecommend }