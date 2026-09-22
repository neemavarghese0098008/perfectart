import React from 'react';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { servicesData } from '../../data/servicesData';

const MEPWorks = () => {
  return <ServiceDetailTemplate service={servicesData.mepWorks} />;
};

export default MEPWorks;
