import React, {useContext,useEffect} from "react"
import {Context} from "./../../UseReducer"
import mapboxgl from "mapbox-gl"
import country from "./../../countries.json"
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "./Location.css"

let map;

const Location = () => {

    useEffect(() => {

        mapboxgl.accessToken = 'pk.eyJ1IjoiamRmaXJleCIsImEiOiJja2JmZXBhY3QwdWw2MnNxZTlnY2N1ZDM4In0.Q34Lq3f1apoEpcn8teup1w';

        map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11'
        });
        console.log(country)

        // Add the control to the map.
        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );


    },[])

    const [state,dispatch] = useContext(Context)

    return (
        <div className="Location" >
            <div id="map">
            </div>
        </div>
    )

}


export default Location