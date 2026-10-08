import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const products = ['Passenger Elevators', 'Panoramic Elevators', 'Home Elevators', 'Vacuum Elevators', 'Vertical Platform Lift & Wheelchair Lift', 'Dumbwaiters', 'Escalators & Moving Walks', 'Cargo & Freight Elevators', 'Turntable, For Parking Spaces & Showrooms'];
const services = [
  ['Elevator Design & Consulting', 'We engineer the right elevator flow for each building, offering expert consulting that integrates safety and performance from the earliest design stage.'],
  ['Sales', 'Supply of elevators, escalators, and dumbwaiters, covering vertical transportation needs for commercial, residential, and villa buildings.'],
  ['Installation', "Expert installation crews handle PACE projects and third-party installation requests."],
  ['Maintenance', 'AMC programs with preventive maintenance and technical support for long-term reliability, safety, and compliance with standards.'],
  ['Modernisation', 'Solutions that improve the performance, safety, and appearance of existing elevators without a full system replacement.'],
  ['Cabins & Interiors', "Custom cabin interior design that reflects each building's character."]
];
const faqs = [
  ['What elevator services does PACE ELEVATORS provide?', 'PACE ELEVATORS provides design consulting, supply, installation, maintenance, modernisation, and cabin interior services.'],
  ['Where does PACE ELEVATORS provide service?', 'PACE ELEVATORS serves Riyadh and cities across Saudi Arabia, including Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya.'],
  ['Do you provide elevator maintenance contracts?', 'Yes. Annual Maintenance Contract programs include preventive maintenance and technical support.'],
  ['Can existing elevators be modernised?', 'Yes. Modernisation work can improve the performance, safety, and appearance of existing elevators without full system replacement.']
];
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: 'PACE ELEVATORS vertical transportation solutions', provider: { '@type': 'Organization', name: 'PACE ELEVATORS' }, areaServed: ['Riyadh', 'Saudi Arabia'], serviceType: products };
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };

export default function PaceLifts() {
  useEffect(() => {
    const title = 'PACE ELEVATORS | Elevators, Escalators & Maintenance in Riyadh';
    document.title = title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement('meta'); description.name = 'description'; document.head.appendChild(description); }
    description.content = 'PACE ELEVATORS supplies, installs, and maintains elevators, escalators, and dumbwaiters across Riyadh and Saudi Arabia, backed by Perfect Art Contracting Company.';
    const addSchema = (id, data) => { let node = document.getElementById(id); if (!node) { node = document.createElement('script'); node.id = id; node.type = 'application/ld+json'; document.head.appendChild(node); } node.textContent = JSON.stringify(data); };
    addSchema('pace-service-schema', serviceSchema); addSchema('pace-faq-schema', faqSchema);
    return () => { document.getElementById('pace-service-schema')?.remove(); document.getElementById('pace-faq-schema')?.remove(); };
  }, []);
  const section = { background: '#fff' }; const text = { color: '#556b8e' }; const title = { color: '#0d2d5c' };
  const editorial = [
    ['/assets/img/pace-elevators/elevator-entrance.jpeg','Elevator entrance','Complete elevator solutions, from design to long-term support','PACE ELEVATORS is the dedicated elevator division of Perfect Art Contracting Company, providing complete vertical transportation solutions, from design consulting through sales, installation, maintenance, modernisation, and cabin interiors, for commercial, residential, and villa buildings across Saudi Arabia. As part of Perfect Art Contracting Company, PACE ELEVATORS draws on the same ISO 9001, ISO 14001, and ISO 45001 certified processes, the same in-house team, and the same focus on precision and timeliness that has delivered more than 200 projects since 2013.'],
    ['/assets/img/pace-elevators/elevator-control-panel.jpeg','Elevator control panel','Design, sales and installation','We engineer the right elevator flow for each building, offering expert consulting that integrates safety and performance from the earliest design stage. Supply of elevators, escalators, and dumbwaiters covers vertical transportation needs for commercial, residential, and villa buildings. Expert installation crews handle PACE projects and third-party installation requests.'],
    ['/assets/img/pace-elevators/elevator-interior.jpeg','Elevator interior','Maintenance and modernisation','AMC programs with preventive maintenance and technical support for long-term reliability, safety, and compliance with standards. Modernisation solutions improve the performance, safety, and appearance of existing elevators without a full system replacement.'],
    ['/assets/img/pace-elevators/elevator-premium.jpeg','Premium elevator interior','Cabins and interiors',"Custom cabin interior design that reflects each building's character."],
    ['/assets/img/pace-elevators/elevator-button.jpeg','Elevator button detail','Coordinated project delivery','Comprehensive, end-to-end partnership from design consultation through installation and maintenance. Backed by an ISO 9001, ISO 14001, and ISO 45001 certified parent company, with in-house installation crews, direct coordination with civil and MEP works, and over a decade of project delivery experience across Saudi Arabia.']
  ];
  return <main className="pace-lifts-page" style={{ background: '#fff' }}>
    <section className="pace-banner" aria-labelledby="pace-banner-title">
      <div className="pace-banner-content">
        <span className="text-uppercase fw-bold">PACE ELEVATORS</span>
        <h1 id="pace-banner-title">PACE ELEVATORS, Complete Vertical Transportation Solutions</h1>
        <p>From elevator design consulting to sales, installation, maintenance, modernisation, and cabin interiors, PACE ELEVATORS delivers complete vertical transportation solutions for buildings across Saudi Arabia.</p>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <a href="https://wa.me/966579797607" className="th-btn style3">WhatsApp Us</a>
          <Link to="/quote" className="th-btn">Request A Proposal</Link>
        </div>
      </div>
      <img className="pace-banner-image" src="/assets/img/pace-elevators/pace-elevators-banner.jpeg" alt="Premium PACE ELEVATORS banner" />
    </section>
    <section className="py-4" style={section}><div className="container"><div className="row text-center g-3">{['10+ Years in Business', '200+ Projects Delivered', '50+ In-House Professionals', '3 Countries Served'].map((x) => <div className="col-6 col-lg-3" key={x}><div className="p-3 rounded border h-100 fw-bold" style={title}>{x}</div></div>)}</div><p className="text-center mt-3 mb-0" style={text}>ISO 9001:2015 Quality Management · ISO 14001:2015 Environmental Management · ISO 45001:2018 Occupational Health &amp; Safety</p></div></section>
    <section className="py-5" style={section}><div className="container"><div className="row align-items-center g-4"><div className="col-lg-8"><span className="text-theme fw-bold">ABOUT PACE ELEVATORS</span><h2 className="display-6 fw-bold mt-2" style={title}>Complete elevator solutions, from design to long-term support</h2><p style={text}>PACE ELEVATORS is the dedicated elevator division of Perfect Art Contracting Company, providing complete vertical transportation solutions, from design consulting through sales, installation, maintenance, modernisation, and cabin interiors, for commercial, residential, and villa buildings across Saudi Arabia.</p><p style={text}>As part of Perfect Art Contracting Company, PACE ELEVATORS draws on the same ISO 9001, ISO 14001, and ISO 45001 certified processes, the same in-house team, and the same focus on precision and timeliness that has delivered more than 200 projects since 2013.</p></div><div className="col-lg-4"><div className="p-4 rounded border h-100"><h3 className="h5" style={title}>Certified processes</h3><p className="mb-0" style={text}>ISO 9001:2015 · ISO 14001:2015 · ISO 45001:2018</p></div></div></div></div></section>
    {editorial.map(([src,alt,heading,copy],index)=><section key={src} className="py-5" style={{background:index%2?'#f7f9fb':'#fff'}}><div className="container"><div className={`row align-items-center g-4 g-lg-5 ${index%2?'flex-lg-row-reverse':''}`}><div className="col-lg-6"><div className="p-2 p-md-3 bg-white rounded-4 border shadow-sm"><img src={src} alt={alt} className="w-100 h-auto rounded-3 d-block" style={{maxHeight:560,objectFit:'contain'}} /></div></div><div className="col-lg-6"><span className="text-theme fw-bold text-uppercase">PACE ELEVATORS</span><h2 className="display-6 fw-bold mt-2" style={title}>{heading}</h2><p style={{...text,lineHeight:1.8}}>{copy}</p></div></div></div></section>)}
    <section className="py-5" style={{ ...section, background: '#f7f9fb' }}><div className="container"><header className="text-center mb-4"><span className="text-theme fw-bold">WHAT WE OFFER</span><h2 className="display-6 fw-bold" style={title}>End-to-end elevator services</h2></header><div className="row g-3">{services.map(([name, copy]) => <div className="col-md-6 col-lg-4" key={name}><div className="p-4 bg-white rounded border h-100"><h3 className="h5 fw-bold" style={title}>{name}</h3><p className="mb-0" style={text}>{copy}</p></div></div>)}</div><h3 className="h4 fw-bold mt-5" style={title}>Products and services</h3><div className="d-flex flex-wrap gap-2 mt-3">{products.map((p) => <span key={p} className="badge bg-white text-dark border p-3">{p}</span>)}</div></div></section>
    <section className="py-5" style={section}><div className="container"><div className="row g-4"><div className="col-lg-6"><h2 className="h2 fw-bold" style={title}>Why choose PACE ELEVATORS</h2><ul className="mt-3" style={text}><li>Comprehensive, end-to-end partnership from design consultation through installation and maintenance.</li><li>Backed by an ISO 9001, ISO 14001, and ISO 45001 certified parent company.</li><li>In-house installation crews for PACE projects and third-party requests.</li><li>Coordinated directly with civil and MEP works on PACE projects.</li><li>Over a decade of project delivery experience across Saudi Arabia.</li></ul></div><div className="col-lg-6"><h2 className="h2 fw-bold" style={title}>Our process</h2><ol className="mt-3" style={text}>{['Consultation & Design', 'Supply', 'Installation by our in-house technical team', 'Testing & Commissioning', 'Handover & long-term support through Annual Maintenance Contracts (AMC)'].map((item) => <li key={item} className="mb-2">{item}</li>)}</ol></div></div><div className="mt-4"><h2 className="h3 fw-bold" style={title}>Cities we serve</h2><p style={text}>Riyadh · Jeddah · Abha · Dammam · Madina · Al Khobar · Tabuk · Al Kharj · Qiddiya</p><strong style={title}>Full-service coverage in Riyadh.</strong></div></div></section>
    <section className="py-5" style={{ ...section, background: '#f7f9fb' }}><div className="container" style={{ maxWidth: 920 }}><h2 className="text-center fw-bold mb-4" style={title}>Frequently asked questions</h2>{faqs.map(([q, a]) => <details className="p-3 mb-2 bg-white border rounded" key={q}><summary className="fw-bold" style={title}>{q}</summary><p className="mt-3 mb-0" style={text}>{a}</p></details>)}</div></section>
    <section className="py-5 text-center" style={section}><div className="container"><h2 className="display-6 fw-bold" style={title}>Get a Vertical Transportation Solutions Quote</h2><p style={text}>Tell us about your building and elevator requirements. Our team responds within one business day.</p><p><a href="tel:+966579797607">+966 57 979 7607</a> · <a href="tel:+966114560555">+966 11 456 0555</a> · <a href="mailto:info@perfectartcontracting.com">info@perfectartcontracting.com</a></p><Link to="/quote" className="th-btn">Request a Proposal</Link></div></section>
  </main>;
}
