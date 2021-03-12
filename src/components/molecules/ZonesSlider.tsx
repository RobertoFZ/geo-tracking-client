import { LocationActivity } from 'api/Location/declarations';
import React from 'react';
import Slider from "react-slick";
import ZoneActivityCard from './ZoneActivityCard';

interface IZoneSlider {
  activity: LocationActivity[];
}

const ZonesSlider = ({
  activity
}: IZoneSlider) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: activity.length < 3 ? activity.length : 3,
    slidesToScroll: activity.length < 3 ? activity.length : 3
  };
  return (
    <Slider {...settings}>
      {
        activity.map((register: LocationActivity) => (
          <ZoneActivityCard key={register.location_zone.id} activity={register} />
        ))
      }
    </Slider>
  )
}

export default ZonesSlider;