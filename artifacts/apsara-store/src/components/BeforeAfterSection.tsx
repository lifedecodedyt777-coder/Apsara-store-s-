import { supabase } from '../lib/supabase';
import React, { useState, useEffect } from "react";
import BeforeAfterSlider, { BAItem } from "./BeforeAfterSlider";
const FB: BAItem[] = [
  {id:1,label:"Acne",concern:"Acne & Blemishes",beforeImage:"https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80",afterImage:"https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80",durationWeeks:4,productUsed:"Niacinamide 10% Serum + Salicylic Cleanser"},
  {id:2,label:"Glow",concern:"Dullness & Glow",beforeImage:"https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=80",afterImage:"https://images.unsplash.com/photo-1571781565036-d3f759be73e4?w=400&q=80",durationWeeks:3,productUsed:"Vitamin C Serum + Glow Moisturiser"},
  {id:3,label:"Hair Fall",concern:"Hair Fall",beforeImage:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",afterImage:"https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80",durationWeeks:6,productUsed:"Onion Hair Oil + Biotin Shampoo"},
];
export default function BeforeAfterSection() {
  const [items, setItems] = useState<BAItem[]>([]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    supabase.from('before_after_results').select('*').eq('visible',true).order('sort_order').then(({data})=>{if(data&&data.length>0){setItems(data.map((d:any)=>({id:d.id,label:d.concern,concern:d.concern,beforeImage:d.before_image,afterImage:d.after_image,durationWeeks:d.duration_weeks,productUsed:d.product_used})));}else{setItems(FB);}});
  }, []);
  if (!items.length) return null;
  return (
    <section style={{padding:"60px 0",background:"#faf8f5"}}>
      <div style={{maxWidth:480,margin:"0 auto",padding:"0 20px"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#c9a84c",margin:"0 0 8px"}}>Real Results</p>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:32,fontWeight:600,color:"#1a1a1a",margin:"0 0 8px",lineHeight:1.2}}>Before &amp; After</h2>
          <p style={{fontSize:14,color:"#777",margin:0,lineHeight:1.6}}>Genuine results from our Shindkheda customers.<br/>Drag the slider to see the difference.</p>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
          {items.map((item,i)=>(
            <button key={item.id} onClick={()=>setIdx(i)} style={{background:i===idx?"#c9a84c":"#f0ebe3",color:i===idx?"#fff":"#555",border:"none",borderRadius:20,padding:"7px 16px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{item.concern}</button>
          ))}
        </div>
        <div style={{marginBottom:16}}><BeforeAfterSlider item={items[idx]}/></div>
        <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:28}}>
          {items.map((_,i)=><button key={i} onClick={()=>setIdx(i)} style={{width:8,height:8,borderRadius:"50%",border:"none",cursor:"pointer",padding:0,background:i===idx?"#c9a84c":"#d4c8b8",transform:i===idx?"scale(1.3)":"scale(1)"}}/>)}
        </div>
        <div style={{textAlign:"center",padding:"22px 18px",background:"#fff",borderRadius:16,border:"1px solid #f0ebe3"}}>
          <p style={{fontSize:14,color:"#555",margin:"0 0 14px"}}>Want similar results? Get free personalised advice.</p>
          <a href="https://wa.me/919960998672?text=I want personalized product recommendations" target="_blank" rel="noopener noreferrer"
            style={{display:"inline-block",padding:"12px 24px",background:"#1a1a1a",color:"#fff",borderRadius:8,fontSize:14,fontWeight:600,textDecoration:"none"}}>Get Free Consultation on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

