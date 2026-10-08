import React from 'react';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { servicesData } from '../../data/servicesData';

const KidsRoom = () => {
  return <ServiceDetailTemplate service={servicesData.kidsRoom} />;
};

export default KidsRoom;
