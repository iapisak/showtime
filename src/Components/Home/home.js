import Template from './Template/Template'

export default function Home ({ data }) {
    const { movies, trending, bgImage } = data
    return  <div>
                <div className="p-5 mb-4" 
                  style={ bgImage ? 
                    { backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${bgImage.movie}')`, 
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed'} 
                : null }>
                <div className="col-sm-10 mx-auto py-5">
                  <h1 className="display-5 fw-bold">Custom jumbotron</h1>
                  <p className="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
                  <button className="btn btn-primary btn-lg" type="button">Example button</button>
                </div>
              </div>
              <Template data={ movies } head='Popular' />
              <div className="p-5 mb-4 rounded-3" 
                  style={ bgImage ? 
                    { backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${bgImage.movie}')`, 
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed'} 
                : null }>
                <div className="col-sm-10 mx-auto py-5">
                  <h1 className="display-5 fw-bold">Custom jumbotron</h1>
                  <p className="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
                  <button className="btn btn-primary btn-lg" type="button">Example button</button>
                </div>
              </div>
              <Template data={ trending } head='Trending' />
            </div>
}