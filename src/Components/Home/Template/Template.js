import './Template.css'

export default function Template ({ data, head }) {

    return  <div className="col-sm-10 mx-auto">
                <div className="container-fluid d-flex pl-4">
                    <h2 className="display-5">{ `What's ${head}` }</h2>
                    <h2 className="ml-auto">Hi</h2>                  
                </div>
                <div className="item-container d-flex overflow-auto pl-4 py-4">
                    { data ? data.map(item => {
                        const { id, title, url, released } = item
                        return  <div className="item" key={ id }>
                                    <img className="" 
                                        style={{ width: '10rem', borderRadius: '' }}
                                        src= { "https://image.tmdb.org/t/p/w200" + url } 
                                        alt={ title } />
                                    <div>{ title }</div>
                                    <div>{ released }</div>
                                </div>
                    }) : null }
                </div>
            </div>
            
}