import React from 'react';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { servicesData } from '../../data/servicesData';

const DiningRoom = () => {
  return <ServiceDetailTemplate service={servicesData.diningRoom} />;
};

export default DiningRoom;
