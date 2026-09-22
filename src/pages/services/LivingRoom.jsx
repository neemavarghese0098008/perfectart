import React from 'react';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { servicesData } from '../../data/servicesData';

const LivingRoom = () => {
  return <ServiceDetailTemplate service={servicesData.livingRoom} />;
};

export default LivingRoom;
