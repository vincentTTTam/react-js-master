/* ROOT Component of your App  */

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'


const Materialize = window.Materialize

const APP_TITLE = 'BLOOMBERG NEWS'
//update document title (displayed in the opened browser tab)
document.title = APP_TITLE

//web api utils
import { get, ENDPOINTS } from './utils/api'

//components
import BloombergCard from './components/BloombergCard'

class App extends Component {

    /* React state initialization DOCUMENTATION : https://facebook.github.io/react/docs/react-without-es6.html#setting-the-initial-state */

    constructor( props ) {
        super( props )
        this.state = {
            lnews: undefined,
            sources: []
        }
    }


    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>{ APP_TITLE }</h1>
                    <img src={ logo } className="App-logo" alt="logo" />
                </div>

                <div className="App-content">
                    <div className="center-align">

                        <form onSubmit={ this.fetchBloomberg }>

                            <button type="submit" className="waves-effect waves-light btn">
                                Lastest News of Bloomberg
                            </button>

                        </form>

                    </div>

                    <div className="row" style={ { marginTop: 20 } } >
                        <div className="col s12 m6 offset-m3">
                            { this.displayBloomberg() }
                        </div>
                    </div>
                </div>

            </div>
        )
    }



    //method triggered by onSubmit event of the form or by onClick event of the "Weather?" button
    /* Arrow function syntax used for Autobinding, see details here : https://facebook.github.io/react/docs/react-without-es6.html#autobinding */
    fetchBloomberg = async ( event ) => {

        event.preventDefault()

        /* ASYNC - AWAIT DOCUMENTATION : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await */

        try {
            let _lnews = await get( ENDPOINTS.BLOOMBERG_API_URL, {
                //YOU NEED TO PROVIDE YOUR "APIXU" API KEY HERE, see /utils/api.js file to grab the DOCUMENTATION file
                apiKey: 'a89781fbb1bd44bd84dd78f0b694425c',
            } )

            this.setState( {
                    lnews: _lnews
                } )
        }
        catch ( error ) {
            Materialize.toast( error, 8000, 'error-toast' )
            console.log( 'Failed fetching data: ', error )
        }

    }


    displayBloomberg = () => {
        const lnews = this.state.lnews

        /*
            DATA FORMAT SENT BY THE API LOKKS LIKE THIS :

            {
                "pixabayPicture": string, //CUSTOM ADD VIA PIXABAY API CALL
                "location": {
                    "name": string,
                    "region": string,
                    "country": string,
                    "lat": number,
                    "lon": number,
                    "tz_id": string,
                    "localtime_epoch": number,
                    "localtime": string
                },
                "current": {
                    "temp_c": number,
                    "is_day": boolean,
                    "condition": {
                        "text": string,
                        "icon": string
                    },
                    "wind_kph": number
                }
            }

        */

        if ( lnews ) {

            var array=lnews.articles.map(function(element) {
              var image=element.urlToImage;
              var picture = new Image();
              picture= Image
              return <BloombergCard title={element.title}
                                author={element.author}
                                text={element.description}
                                picture={picture}
                                publishedAt={element.publishedAt}/>
            })

            return array;
        }

        return null
    }

}

export default App
