import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { GoogleMapsContainer } from 'components/atoms/GoogleMaps';
import { LastLocation } from 'api/Location/declarations';
import MarkerIcon from 'assets/marker.png';

interface IGoogleMaps {
  
}

const GoogleMaps: React.FC<IGoogleMaps> = ({ children }) => (
  <GoogleMapsContainer>
    {children}
  </GoogleMapsContainer>
)

export default GoogleMaps;