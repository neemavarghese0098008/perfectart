import React from 'react';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { servicesData } from '../../data/servicesData';

const Bedroom = () => {
  return <ServiceDetailTemplate service={servicesData.bedroom} />;
};

export default Bedroom;
