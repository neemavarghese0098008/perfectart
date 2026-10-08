import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API_BASE_URL } from '../utils/apiConfig';

const categoryNames = (row) => {
  const raw = row.vendorCategories ?? row.vendorCategory ?? row.vendor_categories;
  let categories = Array.isArray(raw) ? raw : [];
  if (typeof raw === 'string' && raw.trim()) {
    try { const parsed = JSON.parse(raw); categories = Array.isArray(parsed) ? parsed : [String(parsed)]; }
    catch { categories = [raw.trim()]; }
  }
  const custom = row.other_vendor_category || row.otherVendorCategory || '';
  return categories.map((category) => category === 'Other' && custom ? `Other — ${custom}` : category).join(', ') || '—';
};

export default function VendorRegistrationsPage() {
  const { token } = useAuth(); const api = API_BASE_URL;
  const [rows,setRows]=useState([]); const [selected,setSelected]=useState(null); const [error,setError]=useState('');
  const load=useCallback(async()=>{try{const r=await fetch(`${api}/vendor-registrations`,{headers:{Authorization:`Bearer ${token}`}});const d=await r.json();if(!r.ok)throw new Error(d.message);setRows(d.data);}catch(e){setError(e.message);}},[api,token]);
  useEffect(()=>{load();},[load]);
  const setStatus=async(id,status)=>{try{const r=await fetch(`${api}/vendor-registrations/${id}`,{method:'PATCH',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({status})});const d=await r.json();if(!r.ok)throw new Error(d.message);await load();if(selected?.id===id)setSelected({...selected,status});}catch(e){setError(e.message);}};
  const deleteRecord=async(row)=>{if(!window.confirm(`Delete the vendor application from ${row.company_name}?`))return;try{const r=await fetch(`${api}/vendor-registrations/${row.id}`,{method:'DELETE',headers:{Authorization:`Bearer ${token}`}});const d=await r.json();if(!r.ok)throw new Error(d.message);setSelected(null);await load();}catch(e){setError(e.message);}};
  const downloadDocument=async(kind)=>{try{const r=await fetch(`${api}/vendor-registrations/${selected.id}/documents/${kind}`,{headers:{Authorization:`Bearer ${token}`}});if(!r.ok)throw new Error('Unable to download document.');const blob=await r.blob();const name=r.headers.get('content-disposition')?.match(/filename="?([^";]+)"?/i)?.[1]||`vendor-${selected.id}-${kind}`;const url=URL.createObjectURL(blob);const a=window.document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}catch(e){setError(e.message);}};
  const columns=[{key:'company_name',label:'Company Name',render:(v,row)=><strong>{v}</strong>},{key:'contact_person_name',label:'Contact Person'},{key:'vendorCategories',label:'Vendor Category',render:(_,row)=><span title={categoryNames(row)} style={{display:'inline-block',minWidth:180,whiteSpace:'normal'}}>{categoryNames(row)}</span>},{key:'country',label:'Country'},{key:'email',label:'Email'},{key:'phone',label:'Phone'},{key:'years_in_business',label:'Years in Business'},{key:'created_at',label:'Submitted Date',render:(v)=>new Date(v).toLocaleDateString()},{key:'status',label:'Status',render:(v,row)=><select aria-label="Vendor status" value={v} onChange={(e)=>setStatus(row.id,e.target.value)} className="admin-form-control"><option>New</option><option>Reviewed</option><option>Contacted</option></select>},{key:'actions',label:'Actions',sortable:false,render:(_,row)=><div className="d-flex gap-2"><button className="admin-page-btn active" onClick={()=>setSelected(row)}>View</button><button className="admin-page-btn" onClick={()=>deleteRecord(row)}>Delete</button></div>}];
  const docLink=(kind,label,exists)=><p>{label}: {exists?<button type="button" className="admin-page-btn" onClick={()=>downloadDocument(kind)}>View / Download</button>:'Not provided'}</p>;
  return <div><div className="admin-page-header"><div><h1>Vendor Registrations</h1><p>Review vendor applications and attached documents.</p></div></div>{error&&<div className="alert alert-danger">{error}</div>}<DataTable columns={columns} data={rows} searchKeys={['company_name','contact_person_name','vendorCategories','other_vendor_category','email','country']} defaultSortKey="created_at" defaultSortOrder="desc" emptyMessage="No vendor applications yet."/>
    <Modal isOpen={!!selected} onClose={()=>setSelected(null)} title="Vendor Application" size="xl">{selected&&<div className="row g-3"><section className="col-12"><h3>Company &amp; Contact Information</h3><p><b>Company:</b> {selected.company_name}</p><p><b>Contact:</b> {selected.contact_person_name}</p><p><b>Category:</b> {categoryNames(selected)}</p><p><b>Job title:</b> {selected.job_title} · <b>Country:</b> {selected.country}</p><p><b>Email:</b> {selected.email} · <b>Phone:</b> {selected.phone}</p><p><b>Registration:</b> {selected.registration_number} · <b>Years in business:</b> {selected.years_in_business}</p></section><section className="col-12"><h3>Products &amp; Services</h3><p style={{whiteSpace:'pre-wrap'}}>{selected.products_services}</p></section><section className="col-12"><h3>Certifications</h3><p style={{whiteSpace:'pre-wrap'}}>{selected.certifications||'None provided'}</p></section><section className="col-12"><h3>Documentation</h3>{docLink('company-profile','Company Profile / Product Catalog',selected.companyProfileDocument)}{docLink('registration','Business / Commercial Registration',selected.registrationDocument)}</section><section className="col-12"><h3>References</h3><p style={{whiteSpace:'pre-wrap'}}>{selected.references_text||'None provided'}</p><h3>Additional Notes</h3><p style={{whiteSpace:'pre-wrap'}}>{selected.additional_notes||'None provided'}</p></section></div>}</Modal>
  </div>;
}
