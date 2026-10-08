import React from 'react';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { servicesData } from '../../data/servicesData';

const CustomInteriorFurniture = () => {
  return <ServiceDetailTemplate service={servicesData.customInteriorFurniture} />;
};

export default CustomInteriorFurniture;
