import React from 'react';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { servicesData } from '../../data/servicesData';

const InteriorBuild = () => {
  return <ServiceDetailTemplate service={servicesData.interiorBuild} />;
};

export default InteriorBuild;
