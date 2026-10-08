// Local downloaded service images
import dbImg1 from '../assets/img/services/design-build/img_1.png';
import dbImg2 from '../assets/img/services/design-build/img_2.png';
import dbImg3 from '../assets/img/services/design-build/img_3.jpg';
import dbImg4 from '../assets/img/services/design-build/img_4.jpeg';

import ibImg1 from '../assets/img/services/interior-build/img_1.png';
import ibImg2 from '../assets/img/services/interior-build/img_2.jpg';
import ibImg3 from '../assets/img/services/interior-build/img_3.jpg';
import ibImg4 from '../assets/img/services/interior-build/img_4.jpg';

import foImg1 from '../assets/img/services/interior-fit-out/img_1.jpg';
import foImg2 from '../assets/img/services/interior-fit-out/img_2.jpg';
import foImg3 from '../assets/img/services/interior-fit-out/img_3.jpg';
import foImg4 from '../assets/img/services/interior-fit-out/img_4.jpg';

import mepImg1 from '../assets/img/services/mep/img_1.png';
import mepImg2 from '../assets/img/services/mep/img_2.png';
import mepImg3 from '../assets/img/services/mep/img_3.jpg';
import mepImg4 from '../assets/img/services/mep/img_4.png';

import cifImg1 from '../assets/img/services/custom-interior-furniture/img_1.png';
import cifImg2 from '../assets/img/services/custom-interior-furniture/img_2.jpeg';
import cifImg3 from '../assets/img/services/custom-interior-furniture/img_3.jpeg';
import cifImg4 from '../assets/img/services/custom-interior-furniture/img_4.jpg';

import kcImg1 from '../assets/img/services/kitchen-cabinets/img_1.jpg';
import kcImg2 from '../assets/img/services/kitchen-cabinets/img_2.png';
import kcImg3 from '../assets/img/services/kitchen-cabinets/img_3.jpg';

import bedImg1 from '../assets/img/services/bedroom/img_1.jpg';
import bedImg2 from '../assets/img/services/bedroom/img_2.jpg';
import bedImg3 from '../assets/img/services/bedroom/img_3.jpg';

import lrImg1 from '../assets/img/services/living-room/img_1.jpg';
import lrImg2 from '../assets/img/services/living-room/img_2.jpeg';
import lrImg3 from '../assets/img/services/living-room/img_3.jpg';

import drImg1 from '../assets/img/services/dining-room/img_1.jpg';
import drImg2 from '../assets/img/services/dining-room/img_2.jpg';
import drImg3 from '../assets/img/services/dining-room/img_3.jpg';

const serviceAreas = ['Riyadh', 'Jeddah', 'Abha', 'Dammam', 'Madina', 'Al Khobar', 'Tabuk', 'Al Kharj', 'Qiddiya'];

const coreFaqs = {
  designBuild: [
    { question: 'What does Design & Build include?', answer: 'Design & Build covers concept design, detailed engineering, construction, and project management through to final handover, all delivered by Perfect Art Contracting Company\'s own teams.' },
    { question: 'Does Perfect Art handle both design and construction?', answer: 'Yes, one team carries the project from concept design through to construction and handover, rather than handing off between separate design and construction firms.' },
    { question: 'Does Design & Build cover residential projects?', answer: 'Yes, Design & Build is delivered for residential and villa projects as well as commercial and hospitality projects.' },
    { question: 'Which cities does Perfect Art offer Design & Build in?', answer: 'Riyadh, Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya, with full coverage in Riyadh.' },
    { question: 'Is Perfect Art certified for Design & Build projects?', answer: 'Yes, Perfect Art is certified to ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018.' }
  ],
  interiorFitOut: [
    { question: 'What does Interior Fit-Out include?', answer: 'Interior Fit-Out covers partitions, ceilings, flooring, and finishes, taking a space from bare shell to a fully finished, ready-to-use environment.' },
    { question: 'Does Perfect Art fit out villas as well as commercial spaces?', answer: 'Yes, Interior Fit-Out is delivered for villas and residential buildings as well as retail, F&B, corporate, and hospitality spaces.' },
    { question: 'Can Interior Fit-Out be coordinated with MEP Works?', answer: 'Yes, our in-house teams coordinate Interior Fit-Out directly with MEP Works when both are part of the same project.' },
    { question: 'Which cities does Perfect Art offer Interior Fit-Out in?', answer: 'Riyadh, Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya, with full coverage in Riyadh.' },
    { question: 'Is Perfect Art certified for Interior Fit-Out projects?', answer: 'Yes, Perfect Art is certified to ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018.' }
  ],
  mepWorks: [
    { question: 'What does MEP Works include?', answer: 'MEP Works covers mechanical (HVAC), electrical, plumbing, and fire and safety systems, engineered and installed to Saudi standards.' },
    { question: 'Can MEP Works be coordinated with Design & Build or Interior Fit-Out?', answer: 'Yes, our in-house MEP teams coordinate directly with Design & Build and Interior Fit-Out when they are part of the same project.' },
    { question: 'Does Perfect Art provide MEP for residential and villa projects?', answer: 'Yes, MEP Works is delivered for residential and villa projects as well as commercial and hospitality projects.' },
    { question: 'Which cities does Perfect Art offer MEP Works in?', answer: 'Riyadh, Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya, with full coverage in Riyadh.' },
    { question: 'Is Perfect Art certified for MEP Works?', answer: 'Yes, Perfect Art is certified to ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018.' }
  ],
  customInteriorFurniture: [
    { question: 'What does Custom Interiors & Furniture include?', answer: 'Custom Interiors & Furniture covers bespoke kitchen cabinets, bedroom, living room, and dining room furniture, manufactured in-house through PACE Workshop.' },
    { question: 'Is the furniture manufactured in-house?', answer: 'All furniture is manufactured in-house through PACE Workshop, built to the exact specification of each project.' },
    { question: 'Can Custom Interiors & Furniture be coordinated with Interior Fit-Out?', answer: 'Yes, our in-house teams coordinate Custom Interiors & Furniture directly with Interior Fit-Out and Design & Build on the same project.' },
    { question: 'Which cities does Perfect Art offer Custom Interiors & Furniture in?', answer: 'Riyadh, Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya, with full coverage in Riyadh.' },
    { question: 'Does Custom Interiors & Furniture cover villa and residential projects?', answer: 'Yes, bespoke furniture and joinery are delivered for villas and residential buildings as well as commercial and hospitality projects.' }
  ]
};

const roomServiceContent = {
  kitchenCabinets: {
    pageType: 'room',
    title: 'Custom Kitchen Cabinets in Riyadh',
    subtitle: 'Kitchen cabinetry manufactured in-house through PACE Workshop, fitted precisely to your space, across Saudi Arabia.',
    description: 'Perfect Art Contracting Company designs and manufactures custom kitchen cabinets through PACE Workshop, our in-house manufacturing facility in Riyadh. Because cabinets are produced on our own floor, every measurement, finish, and fitting is built to the exact specification of the kitchen, rather than adapted from a standard size.',
    offers: [
      { title: 'Custom Cabinetry', text: "Kitchen cabinets designed and manufactured to fit each kitchen's exact layout and dimensions." },
      { title: 'Finish Options', text: "A range of finishes and materials manufactured in-house to match a project's interior design." },
      { title: 'Fitting & Installation', text: 'Cabinets installed by our own in-house team, coordinated with the wider Interior Fit-Out project when applicable.' }
    ],
    whyChooseUs: [
      'Manufactured in-house through PACE Workshop, not sourced from third parties',
      'Cabinets built to the exact measurements of each kitchen',
      'Coordinated directly with Interior Fit-Out on the same project',
      'Available for villa, residential, and commercial kitchens'
    ],
    faqs: [
      { question: 'Are kitchen cabinets manufactured in-house?', answer: 'Yes, kitchen cabinets are manufactured in-house through PACE Workshop, built to the exact specification of each kitchen.' },
      { question: 'Does Perfect Art install kitchen cabinets for villas?', answer: 'Yes, custom kitchen cabinets are supplied and installed for villas, residential buildings, and commercial kitchens.' },
      { question: 'Can kitchen cabinets be coordinated with a larger Interior Fit-Out project?', answer: 'Yes, cabinet manufacturing and installation is coordinated directly with Interior Fit-Out when both are part of the same project.' },
      { question: 'Which cities are kitchen cabinets available in?', answer: 'Riyadh, Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya, manufactured from our Riyadh workshop.' }
    ],
    finalCta: 'Start Your Kitchen Cabinets Project'
  },
  bedroom: {
    pageType: 'room',
    title: 'Custom Bedroom Furniture in Riyadh',
    subtitle: 'Bespoke wardrobes and bedroom furniture manufactured in-house through PACE Workshop, across Saudi Arabia.',
    description: "Perfect Art Contracting Company designs and manufactures custom bedroom furniture, including wardrobes and bed frames, through PACE Workshop in Riyadh. Every piece is built to the exact dimensions and finish of the room it's designed for, rather than adapted from ready-made stock furniture.",
    offers: [
      { title: 'Wardrobes', text: 'Custom wardrobes designed and manufactured to fit the exact space and storage needs of each bedroom.' },
      { title: 'Bed Frames & Furniture', text: "Bespoke bed frames and bedroom furniture manufactured to match a project's interior design." },
      { title: 'Fitting & Installation', text: 'Bedroom furniture installed by our own in-house team, coordinated with Interior Fit-Out when applicable.' }
    ],
    whyChooseUs: [
      'Manufactured in-house through PACE Workshop, not sourced from third parties',
      'Furniture built to the exact dimensions of each bedroom',
      'Coordinated directly with Interior Fit-Out on the same project',
      'Available for villa, residential, and hospitality bedrooms'
    ],
    faqs: [
      { question: 'Is bedroom furniture manufactured in-house?', answer: 'Yes, bedroom furniture and wardrobes are manufactured in-house through PACE Workshop, built to the exact specification of each room.' },
      { question: 'Does Perfect Art design custom wardrobes for villas?', answer: 'Yes, custom wardrobes and bedroom furniture are supplied for villas, residential buildings, and hospitality projects.' },
      { question: 'Can bedroom furniture be coordinated with a larger Interior Fit-Out project?', answer: 'Yes, bedroom furniture manufacturing and installation is coordinated directly with Interior Fit-Out when both are part of the same project.' },
      { question: 'Which cities is custom bedroom furniture available in?', answer: 'Riyadh, Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya, manufactured from our Riyadh workshop.' }
    ],
    finalCta: 'Start Your Bedroom Project'
  },
  livingRoom: {
    pageType: 'room',
    title: 'Custom Living Room Furniture in Riyadh',
    subtitle: 'Bespoke living room furniture and joinery manufactured in-house through PACE Workshop, across Saudi Arabia.',
    description: "Perfect Art Contracting Company designs and manufactures custom living room furniture through PACE Workshop, our in-house manufacturing facility in Riyadh. From TV units to storage joinery, every piece is manufactured to match the interior design of the space it's built for.",
    offers: [
      { title: 'TV & Media Units', text: "Custom media units designed and manufactured to fit each living room's layout." },
      { title: 'Storage & Joinery', text: 'Bespoke storage units and joinery manufactured for a consistent, brand-accurate finish.' },
      { title: 'Fitting & Installation', text: 'Living room furniture installed by our own in-house team, coordinated with Interior Fit-Out when applicable.' }
    ],
    whyChooseUs: [
      'Manufactured in-house through PACE Workshop, not sourced from third parties',
      'Furniture built to the exact dimensions of each living room',
      'Coordinated directly with Interior Fit-Out on the same project',
      'Available for villa, residential, and hospitality living spaces'
    ],
    faqs: [
      { question: 'Is living room furniture manufactured in-house?', answer: 'Yes, living room furniture is manufactured in-house through PACE Workshop, built to the exact specification of each room.' },
      { question: 'Does Perfect Art design custom TV units?', answer: 'Yes, custom TV and media units are manufactured and installed for villas, residential buildings, and hospitality projects.' },
      { question: 'Can living room furniture be coordinated with a larger Interior Fit-Out project?', answer: 'Yes, living room furniture manufacturing and installation is coordinated directly with Interior Fit-Out when both are part of the same project.' },
      { question: 'Which cities is custom living room furniture available in?', answer: 'Riyadh, Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya, manufactured from our Riyadh workshop.' }
    ],
    finalCta: 'Start Your Living Room Project'
  },
  diningRoom: {
    pageType: 'room',
    title: 'Custom Dining Room Furniture in Riyadh',
    subtitle: 'Bespoke dining room furniture manufactured in-house through PACE Workshop, across Saudi Arabia.',
    description: 'Perfect Art Contracting Company designs and manufactures custom dining room furniture through PACE Workshop, our in-house manufacturing facility in Riyadh. Dining tables, storage units, and joinery are all built to the exact specification of the space, rather than adapted from standard stock furniture.',
    offers: [
      { title: 'Dining Tables & Seating Areas', text: "Custom dining furniture designed and manufactured to fit each dining room's layout." },
      { title: 'Storage & Display Units', text: 'Bespoke storage and display joinery manufactured for a consistent, brand-accurate finish.' },
      { title: 'Fitting & Installation', text: 'Dining room furniture installed by our own in-house team, coordinated with Interior Fit-Out when applicable.' }
    ],
    whyChooseUs: [
      'Manufactured in-house through PACE Workshop, not sourced from third parties',
      'Furniture built to the exact dimensions of each dining room',
      'Coordinated directly with Interior Fit-Out on the same project',
      'Available for villa, residential, and hospitality dining spaces'
    ],
    faqs: [
      { question: 'Is dining room furniture manufactured in-house?', answer: 'Yes, dining room furniture is manufactured in-house through PACE Workshop, built to the exact specification of each room.' },
      { question: 'Does Perfect Art design custom dining tables?', answer: 'Yes, custom dining tables and storage units are manufactured and installed for villas, residential buildings, and hospitality projects.' },
      { question: 'Can dining room furniture be coordinated with a larger Interior Fit-Out project?', answer: 'Yes, dining room furniture manufacturing and installation is coordinated directly with Interior Fit-Out when both are part of the same project.' },
      { question: 'Which cities is custom dining room furniture available in?', answer: 'Riyadh, Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya, manufactured from our Riyadh workshop.' }
    ],
    finalCta: 'Start Your Dining Room Project'
  },
  kidsRoom: {
    pageType: 'room',
    title: 'Custom Kids Room Furniture in Riyadh',
    subtitle: 'Bespoke kids room furniture manufactured in-house through PACE Workshop, across Saudi Arabia.',
    description: "Perfect Art Contracting Company designs and manufactures custom kids room furniture through PACE Workshop, our in-house manufacturing facility in Riyadh. Beds, storage, and study furniture are built to fit the room and the child's needs, rather than adapted from standard stock furniture.",
    offers: [
      { title: 'Beds & Storage', text: "Custom beds and storage furniture designed and manufactured to fit each kids room's layout." },
      { title: 'Study & Play Furniture', text: 'Bespoke study desks and storage units manufactured for a consistent, brand-accurate finish.' },
      { title: 'Fitting & Installation', text: 'Kids room furniture installed by our own in-house team, coordinated with Interior Fit-Out when applicable.' }
    ],
    whyChooseUs: [
      'Manufactured in-house through PACE Workshop, not sourced from third parties',
      'Furniture built to the exact dimensions of each kids room',
      'Coordinated directly with Interior Fit-Out on the same project',
      'Available for villa and residential kids rooms'
    ],
    faqs: [
      { question: 'Is kids room furniture manufactured in-house?', answer: 'Yes, kids room furniture is manufactured in-house through PACE Workshop, built to the exact specification of each room.' },
      { question: 'Does Perfect Art design custom kids beds and storage?', answer: 'Yes, custom beds and storage furniture are manufactured and installed for villas and residential projects.' },
      { question: 'Can kids room furniture be coordinated with a larger Interior Fit-Out project?', answer: 'Yes, kids room furniture manufacturing and installation is coordinated directly with Interior Fit-Out when both are part of the same project.' },
      { question: 'Which cities is custom kids room furniture available in?', answer: 'Riyadh, Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya, manufactured from our Riyadh workshop.' }
    ],
    finalCta: 'Start Your Kids Room Project'
  }
};

export const servicesData = {
  designBuild: {
    id: 'design-build',
    slug: 'design-build',
    title: 'Design & Build',
    categoryTag: 'TURNKEY CONTRACTING DIVISION',
    subtitle: 'From concept design to full construction delivery, Perfect Art Contracting Company manages every stage of your project under one roof, for commercial, hospitality, and residential clients across Saudi Arabia.',
    description: 'Design & Build is Perfect Art Contracting Company\'s end-to-end delivery service, covering concept design, detailed engineering, and full construction execution for commercial, hospitality, and residential projects across Saudi Arabia. Backed by ISO 9001, ISO 14001, and ISO 45001 certification, our in-house design and construction teams carry a project from first concept through to final handover, without handing off between separate design and construction firms.',
    mainImage: dbImg1,
    images: [
      { src: dbImg1, title: 'Concept Architectural Design & Rendering' },
      { src: dbImg2, title: 'Commercial & Retail Design-Build Site' },
      { src: dbImg3, title: 'Civil & Engineering Structural Execution' },
      { src: dbImg4, title: 'High-End Office & Commercial Turnkey Delivery' }
    ],
    features: [
      'Concept & Schematic Design: Initial design concepts that establish the layout, look, and function of a space before detailed engineering begins.',
      'Detailed Design & Engineering: Full architectural and engineering drawings, coordinated with structural, MEP, and interior requirements.',
      'Construction & Execution: Civil works and construction carried out by our own in-house teams, coordinated with the original design intent.',
      'Project Management & Handover: Timeline, budget, and quality management through to a final, ready-to-use handover.'
    ],
    processSteps: [
      { step: '01', title: 'Consultation & Spatial Audit', text: 'Site analysis, BOQ evaluation, client requirements mapping, and preliminary budget setup.' },
      { step: '02', title: 'Concept Design & 3D Renders', text: 'Architectural layout plans, mood boards, photorealistic 3D visual models, and material board approval.' },
      { step: '03', title: 'Engineering & Permits', text: 'Detailed MEP schematics, structural drawings, municipal & Civil Defense authority submissions.' },
      { step: '04', title: 'Construction & Handover', text: 'Civil site works, joinery installation, testing, quality audits, and final client sign-off.' }
    ],
    whyChooseUs: 'In-house coordination with MEP, custom interiors, and elevator installation when needed on the same project.',
    faqs: coreFaqs.designBuild,
    serviceAreas
  },

  interiorBuild: {
    id: 'interior-build',
    slug: 'interior-build',
    title: 'Interior & Build',
    categoryTag: 'ARCHITECTURAL INTERIORS DIVISION',
    subtitle: 'High-End Civil Remodeling, Architectural Structural Works & Space Transformation',
    description: 'Our Interior & Build service bridges structural civil engineering and interior architectural refinement. Perfect Art delivers complete structural modifications, partition layouts, slab openings, floor screeding, acoustic ceiling installations, and high-performance wall finishes tailored for corporate offices, luxury villas, and commercial spaces across KSA.',
    mainImage: ibImg1,
    images: [
      { src: ibImg1, title: 'Architectural Renovation & Interior Construction' },
      { src: ibImg2, title: 'Luxury Villa & Commercial Interior Structural Works' },
      { src: ibImg3, title: 'Custom Ceiling & Structural Framing' },
      { src: ibImg4, title: 'High-Grade Floor & Wall Cladding Execution' }
    ],
    features: [
      'Comprehensive structural alterations, blockwork, plastering, and screeding',
      'Acoustic drywall partitioning and decorative ceiling systems',
      'Custom marble, granite, terrazzo, and epoxy floor installations',
      'Integrated architectural lighting troughs and recessed ceiling coves',
      'Complete project safety supervision meeting ISO 45001 standards'
    ],
    processSteps: [
      { step: '01', title: 'Site Inspection & Demolition', text: 'Safe site preparation, non-structural wall removal, and waste management.' },
      { step: '02', title: 'Civil & Partitioning Works', text: 'Blockwork, drywall framing, ceiling grids, and floor level screeding.' },
      { step: '03', title: 'Architectural Finishes', text: 'Plaster, wallpaper, microcement, marble tiling, and acoustic paneling.' },
      { step: '04', title: 'Final Inspection', text: 'Surface alignment checks, paint touch-ups, and snag list clearance.' }
    ],
    serviceAreas
  },

  interiorFitOut: {
    id: 'interior-fit-out',
    slug: 'interior-fit-out',
    title: 'Interior Fit-Out',
    categoryTag: 'COMMERCIAL & RESIDENTIAL FIT-OUT',
    subtitle: 'Complete interior fit-out for retail, F&B, corporate, health club, hospitality, and villa spaces across Saudi Arabia, from Perfect Art Contracting Company.',
    description: 'Interior Fit-Out is Perfect Art Contracting Company\'s turnkey finishing service, taking a space from bare shell to a fully functional, finished environment, for retail, F&B, corporate, health club, hospitality, and villa clients across Saudi Arabia. Our in-house teams handle partitions, ceilings, flooring, and finishes, coordinated directly with MEP works and custom furniture when those are part of the same project.',
    mainImage: foImg1,
    images: [
      { src: foImg1, title: 'Corporate Headquarters Office Fit-Out' },
      { src: foImg2, title: 'Brands For Less Flagship Store Interior' },
      { src: foImg3, title: 'Executive Conference Room & Wall Paneling' },
      { src: foImg4, title: 'Turnkey Commercial Interior Execution' }
    ],
    features: [
      'Partitions & Ceilings: Wall partitioning and ceiling systems built to the layout and finish specification of each project.',
      'Flooring & Finishes: Flooring, wall finishes, and final detailing carried out to a consistent, brand-accurate standard.',
      'Retail & Commercial Fit-Out: Turnkey fit-out for retail stores, restaurants, and corporate offices, from shell to final handover.',
      'Villa & Residential Fit-Out: Interior fit-out for private villas and residential buildings, finished to the same standard as our commercial work.'
    ],
    processSteps: [
      { step: '01', title: 'Pre-Construction Planning', text: 'Review mall/building management rules, work permits, and schedule milestones.' },
      { step: '02', title: 'Core Fit-Out Execution', text: 'HVAC ducting, power routing, fire fighting lines, and wall partitioning.' },
      { step: '03', title: 'Joinery & Feature Installation', text: 'Fitting custom reception desks, wall paneling, display cases, and signage.' },
      { step: '04', title: 'Testing & Commissioning', text: 'MEP balance testing, Civil Defense inspection, and store opening clearance.' }
    ],
    whyChooseUs: 'Direct coordination with MEP Works and Custom Interiors & Furniture on the same project.',
    faqs: coreFaqs.interiorFitOut,
    serviceAreas
  },

  mepWorks: {
    id: 'mep-works',
    slug: 'mep-works',
    title: 'MEP Works',
    categoryTag: 'MECHANICAL, ELECTRICAL & PLUMBING',
    subtitle: 'Mechanical, electrical, and plumbing systems engineered, installed, and commissioned to Saudi standards, by Perfect Art Contracting Company.',
    description: 'MEP Works is Perfect Art Contracting Company\'s mechanical, electrical, and plumbing division, engineering and installing the systems that keep a building running, for commercial, hospitality, and residential projects across Saudi Arabia. Our in-house MEP teams coordinate directly with Design & Build and Interior Fit-Out on the same project, rather than working as a separate subcontractor with its own schedule.',
    mainImage: mepImg1,
    images: [
      { src: mepImg1, title: 'MEP Electrical & Mechanical Schematics' },
      { src: mepImg2, title: 'HVAC Ducting & Air Handling Unit Installation' },
      { src: mepImg3, title: 'Facility Electrical Control Panels & Wiring' },
      { src: mepImg4, title: 'Fire Safety, Sprinklers & Civil Defense Compliance' }
    ],
    features: [
      'Mechanical Systems (HVAC): Heating, ventilation, and air conditioning systems designed and installed for the building\'s size and use.',
      'Electrical Systems: Power distribution, lighting, and low-current electrical systems installed to Saudi standards.',
      'Plumbing Systems: Water supply, drainage, and plumbing systems engineered and installed for commercial and residential buildings.',
      'Fire & Safety Systems: Fire detection and safety system installation, coordinated with the building\'s overall MEP design.'
    ],
    processSteps: [
      { step: '01', title: 'MEP Load Calculation & Design', text: 'Engineering heat load, electrical power distribution, and flow rate schematics.' },
      { step: '02', title: 'First Fix Installation', text: 'Conduit laying, main cable trays, chilled water pipes, and main duct runs.' },
      { step: '03', title: 'Second Fix & Fixtures', text: 'Light fixture fitting, DB panel termination, diffuser installation, and sanitaryware.' },
      { step: '04', title: 'Testing & Balancing (TAB)', text: 'Air balancing, pressure testing, electrical load test, and Civil Defense signoff.' }
    ],
    whyChooseUs: 'In-house MEP teams, coordinated directly with Design & Build and Interior Fit-Out.',
    faqs: coreFaqs.mepWorks,
    serviceAreas
  },

  customInteriorFurniture: {
    id: 'custom-interior-furniture',
    slug: 'custom-interior-furniture',
    title: 'Custom Interiors & Furniture',
    categoryTag: 'PACE IN-HOUSE MANUFACTURING WORKSHOP',
    subtitle: 'Bespoke joinery and furniture manufactured in-house through PACE Workshop, for a consistent, brand-accurate finish, across Saudi Arabia.',
    description: 'Custom Interiors & Furniture is Perfect Art Contracting Company\'s bespoke manufacturing service, producing joinery and furniture in-house through PACE Workshop, for commercial, hospitality, and residential clients across Saudi Arabia. Because manufacturing happens in-house, every piece is built to the exact specification of the project, rather than sourced from third-party suppliers.',
    mainImage: cifImg1,
    images: [
      { src: cifImg1, title: 'Custom Joinery & Timber Carpentry' },
      { src: cifImg2, title: 'Bespoke Villa Living & Built-in Furniture' },
      { src: cifImg3, title: 'Custom Veneer Paneling & Woodwork' },
      { src: cifImg4, title: 'Bespoke Executive Furniture & Joinery' }
    ],
    features: [
      'Kitchen Cabinets: Custom kitchen cabinetry manufactured and installed to fit each space precisely.',
      'Bedroom: Bespoke bedroom furniture, from wardrobes to bed frames, built to match a project\'s interior design.',
      'Living Room: Custom living room furniture and joinery, manufactured for a consistent, brand-accurate finish.',
      'Dining Room: Bespoke dining room furniture, manufactured in-house through PACE Workshop.'
    ],
    processSteps: [
      { step: '01', title: '3D Workshop Drawings', text: 'CAD millwork detail drawings, jointing details, and material approval.' },
      { step: '02', title: 'Timber Selection & CNC', text: 'Selecting natural veneers/hardwoods and high-precision CNC cutting.' },
      { step: '03', title: 'Assembly & Spray Painting', text: 'Master carpentry assembly and dust-free multi-layer spray booth finishing.' },
      { step: '04', title: 'Site Delivery & Fitting', text: 'Careful transport, seamless site fitting, and protective wrap removal.' }
    ],
    whyChooseUs: 'Coordinated directly with Interior Fit-Out and Design & Build on the same project.',
    faqs: coreFaqs.customInteriorFurniture,
    serviceAreas
  },

  kitchenCabinets: {
    id: 'kitchen-cabinets',
    slug: 'kitchen-cabinets',
    title: 'Kitchen Cabinets',
    categoryTag: 'CUSTOM RESIDENTIAL SUB-SERVICE',
    subtitle: 'Luxury Modern & Classic Kitchen Cabinetry Designed & Built for Saudi Villas',
    description: 'Every kitchen manufactured by PACE Joinery is tailored specifically for the homeowner’s lifestyle, spatial dimensions, and culinary requirements. From durable soft-close German hardware mechanisms to quartz/granite countertops, custom island units, and lacquer finishes, we build dream kitchens in our Riyadh workshop.',
    mainImage: kcImg1,
    images: [
      { src: kcImg1, title: 'Luxury Villa Custom Kitchen Fit-Out' },
      { src: kcImg2, title: 'Modern Handleless Kitchen Cabinetry' },
      { src: kcImg3, title: 'Island Unit & Quartz Countertop Installation' }
    ],
    features: [
      'Custom island units, pantry pull-outs, and corner Carousel mechanisms',
      'High-grade moisture-resistant (MR) marine plywood and MDF core materials',
      'German soft-close Blum & Hettich hinges and drawer runners',
      'Wide choice of finishes: solid wood, natural veneer, acrylic, and lacquer',
      'Seamless integration of built-in appliances and LED under-cabinet task lighting'
    ],
    processSteps: [
      { step: '01', title: 'Kitchen Measurement & Layout', text: 'Site 3D laser survey and ergonomic triangle workflow planning.' },
      { step: '02', title: 'Finish & Hardware Selection', text: 'Choosing door profile, handle style, quartz countertop, and cabinet color.' },
      { step: '03', title: 'In-House Fabrication', text: 'Precision cutting, edge-banding, and spray coating in our Riyadh facility.' },
      { step: '04', title: 'Installation & Appliance Fit', text: 'Level mounting, countertop fitting, plumbing hookup, and hardware tuning.' }
    ],
    ...roomServiceContent.kitchenCabinets,
    id: 'kitchen-cabinets',
    slug: 'kitchen-cabinets',
    categoryTag: 'CUSTOM RESIDENTIAL SUB-SERVICE',
    mainImage: kcImg1,
    images: [
      { src: kcImg1, title: 'Luxury Villa Custom Kitchen Fit-Out' },
      { src: kcImg2, title: 'Modern Handleless Kitchen Cabinetry' },
      { src: kcImg3, title: 'Island Unit & Quartz Countertop Installation' }
    ]
  },

  bedroom: {
    id: 'bedroom',
    slug: 'bedroom',
    title: 'Bedroom',
    categoryTag: 'CUSTOM RESIDENTIAL SUB-SERVICE',
    subtitle: 'Bespoke Wardrobes, Walk-in Closets, Headboards & Bedroom Interior Woodwork',
    description: 'Transform master suites and bedrooms with custom-crafted built-in wardrobes, walk-in closets with glass displays, integrated lighting, upholstered headboards, and floating nightstands. Engineered for luxury villa interiors across Saudi Arabia.',
    mainImage: bedImg1,
    images: [
      { src: bedImg1, title: 'Luxury Villa Bedroom Interior Fit-Out' },
      { src: bedImg2, title: 'Bespoke Master Bedroom Wardrobe & Cabinetry' },
      { src: bedImg3, title: 'Custom Wood & Leather Padded Headboard' }
    ],
    features: [
      'Custom walk-in closets with tinted glass doors and sensor LED lighting',
      'Built-in sliding & hinged door wardrobes tailored to full ceiling height',
      'Upholstered fabric/leather feature headboard panels and acoustic wall trim',
      'Integrated vanity tables, shoe organization towers, and safe compartments',
      'Durable, eco-friendly timber substrates and scratch-resistant finishes'
    ],
    processSteps: [
      { step: '01', title: 'Storage & Spatial Planning', text: 'Mapping wardrobe hanging height, drawers, shoe racks, and vanity space.' },
      { step: '02', title: 'Material & Fabric Sample Signoff', text: 'Selecting wood veneer, glass tint, leather/fabric upholstery, and hardware.' },
      { step: '03', title: 'Workshop Crafting', text: 'Manufacturing closet modules, carcass framing, and door spray painting.' },
      { step: '04', title: 'Precision Site Assembly', text: 'Erecting closet frames, mounting soft-close doors, and wiring internal lights.' }
    ],
    ...roomServiceContent.bedroom,
    id: 'bedroom',
    slug: 'bedroom',
    categoryTag: 'CUSTOM RESIDENTIAL SUB-SERVICE',
    mainImage: bedImg1,
    images: [
      { src: bedImg1, title: 'Luxury Villa Bedroom Interior Fit-Out' },
      { src: bedImg2, title: 'Bespoke Master Bedroom Wardrobe & Cabinetry' },
      { src: bedImg3, title: 'Custom Wood & Leather Padded Headboard' }
    ]
  },

  livingRoom: {
    id: 'living-room',
    slug: 'living-room',
    title: 'Living Room',
    categoryTag: 'CUSTOM RESIDENTIAL SUB-SERVICE',
    subtitle: 'Custom TV Media Units, Architectural Feature Walls, Majlis Paneling & Furniture',
    description: 'The living room and majlis are the heart of hospitality in Saudi homes. Perfect Art crafts bespoke TV background feature walls with integrated marble, fireplace inserts, hidden cable routing, wood slat paneling, and custom luxury seating units.',
    mainImage: lrImg1,
    images: [
      { src: lrImg1, title: 'Custom Villa Living Room Wall Paneling & Joinery' },
      { src: lrImg2, title: 'Feature Wall Media Unit with Marble & Wood' },
      { src: lrImg3, title: 'Bespoke Saudi Majlis & Living Room Seating' }
    ],
    features: [
      'Custom media console units with concealed wiring and ambient LED backlighting',
      'Bookmatched marble cladding combined with fluted wood slat panels',
      'Traditional & modern Majlis custom seating and decorative display niches',
      'Acoustic ceiling coves, chandeliers, and decorative metal trim inlays',
      'Durable stain-resistant upholstery and premium hardwood construction'
    ],
    processSteps: [
      { step: '01', title: 'Concept Design & Lighting Plan', text: 'Creating 3D renders of the feature wall, majlis layout, and lighting.' },
      { step: '02', title: 'Substrate & Accent Selection', text: 'Pairing natural wood veneer, marble slabs, brass strips, and acoustic foam.' },
      { step: '03', title: 'Manufacturing & Framing', text: 'Building internal steel/timber support frames and pre-assembling cabinetry.' },
      { step: '04', title: 'On-Site Fitting & Finishes', text: 'Mounting wall panels, stone veneer, TV consoles, and ambient strip lights.' }
    ],
    ...roomServiceContent.livingRoom,
    id: 'living-room',
    slug: 'living-room',
    categoryTag: 'CUSTOM RESIDENTIAL SUB-SERVICE',
    mainImage: lrImg1,
    images: [
      { src: lrImg1, title: 'Custom Villa Living Room Wall Paneling & Joinery' },
      { src: lrImg2, title: 'Feature Wall Media Unit with Marble & Wood' },
      { src: lrImg3, title: 'Bespoke Saudi Majlis & Living Room Seating' }
    ]
  },

  diningRoom: {
    id: 'dining-room',
    slug: 'dining-room',
    title: 'Dining Room',
    categoryTag: 'CUSTOM RESIDENTIAL SUB-SERVICE',
    subtitle: 'Bespoke Dining Tables, Console Units, Sideboards & Decorative Wall Cladding',
    description: 'Craft unforgettable dining experiences with custom-made solid timber or marble-top dining tables, built-in buffet credenzas, glass-door display cabinets for tableware, and elegant dining area wall treatments crafted by PACE Joinery.',
    mainImage: drImg1,
    images: [
      { src: drImg1, title: 'Custom Villa Dining Space Interior & Joinery' },
      { src: drImg2, title: 'Bespoke Dining Table & Sideboard Credenza' },
      { src: drImg3, title: 'Contemporary Villa Dining Furniture' }
    ],
    features: [
      'Custom dining tables up to 14-seater capacity in solid oak, walnut, or marble',
      'Built-in buffet console tables with soft-close drawers and cutlery organizers',
      'Illuminated china display cabinets with fluted glass doors and brass handles',
      'Decorative dining area wall treatments: mirror paneling, wood slats, wallpaper',
      'Scratch and heat-resistant protective polyurethane table surface coats'
    ],
    processSteps: [
      { step: '01', title: 'Dimensioning & Seating Analysis', text: 'Calculating table length, clearance zones, and seating ergonomics.' },
      { step: '02', title: 'Wood & Stone Selection', text: 'Choosing slab wood grain, marble top pattern, and base leg design.' },
      { step: '03', title: 'Workshop Fabrication', text: 'Hand-crafting table bases, buffer credenzas, and spray booth sealing.' },
      { step: '04', title: 'Delivery & Positioning', text: 'Delivering, assembling table components, and leveling in position.' }
    ],
    ...roomServiceContent.diningRoom,
    id: 'dining-room',
    slug: 'dining-room',
    categoryTag: 'CUSTOM RESIDENTIAL SUB-SERVICE',
    mainImage: drImg1,
    images: [
      { src: drImg1, title: 'Custom Villa Dining Space Interior & Joinery' },
      { src: drImg2, title: 'Bespoke Dining Table & Sideboard Credenza' },
      { src: drImg3, title: 'Contemporary Villa Dining Furniture' }
    ]
  },

  kidsRoom: {
    id: 'kids-room',
    slug: 'kids-room',
    categoryTag: 'CUSTOM RESIDENTIAL SUB-SERVICE',
    mainImage: bedImg1,
    images: [
      { src: bedImg1, title: 'Custom Kids Room Furniture' },
      { src: bedImg2, title: 'Bespoke Kids Storage and Wardrobes' },
      { src: bedImg3, title: 'Custom Kids Room Joinery' }
    ],
    ...roomServiceContent.kidsRoom
  }
};
