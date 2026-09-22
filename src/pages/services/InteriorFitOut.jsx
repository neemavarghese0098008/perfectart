import React from 'react';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { servicesData } from '../../data/servicesData';

const InteriorFitOut = () => {
  return <ServiceDetailTemplate service={servicesData.interiorFitOut} />;
};

export default InteriorFitOut;
