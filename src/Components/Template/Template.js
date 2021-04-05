import './Template.css'

export default function Template ({ data }) {

    return  <div className="item-container col-sm-10 d-flex overflow-auto mx-auto py-4 text-dark bg-light">
                { data ? data.map(item => {
                    const { id, title, url } = item
                    return  <div className="item" key={ id }>
                                <img className="" 
                                    style={{ width: '12rem' }}
                                    src= { "https://image.tmdb.org/t/p/w200" + url } 
                                    alt={ title } />
                            </div>
                }) : null }
            </div>
}