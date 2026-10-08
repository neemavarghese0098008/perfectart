import React from 'react';
import ServiceDetailTemplate from './ServiceDetailTemplate';
import { servicesData } from '../../data/servicesData';

const DesignBuild = () => {
  return <ServiceDetailTemplate service={servicesData.designBuild} />;
};

export default DesignBuild;
