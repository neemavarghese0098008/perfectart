import React from 'react';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { servicesData } from '../../data/servicesData';

const KitchenCabinets = () => {
  return <ServiceDetailTemplate service={servicesData.kitchenCabinets} />;
};

export default KitchenCabinets;
