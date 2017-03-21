import React, { Component } from 'react'

import './BloombergCard.css'

class BloombergCard extends Component {

    render() {

        const {author, title, text, picture, publishedAt } = this.props

        return (
            <div className="card horizontal" style={ { margin: 'auto' } }>
                <div className="card-image lnews-img-container">
                    <img alt="" className="lnews-img" src={ picture } />
                    <span className="card-title" style={ { fontSize: 36 } }>
                        { text }
                    </span>
                </div>
                <div className="card-stacked">
                    <div className="card-content">

                        <div className="lnews-data">
                            <p>
                                <span className="card-title" style={{fontSize: 36}}>
                                { title }
                                </span>
                            </p>
                            <p>
                              <span className="card-title" style={{fontSize: 18}}>
                              { text }
                              </span>
                            </p>
                        </div>
                     </div>
                </div>
            </div>
        )
    }

}

export default BloombergCard
