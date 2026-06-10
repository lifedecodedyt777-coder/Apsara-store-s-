import React, { useState } from "react";
const msgs = ["🎁 FREE DELIVERY on orders above ₹499","✅ 100% Authentic Products","📱 WhatsApp: +91 99609 98672","🕐 Open 9AM–9PM Daily","🌸 Shindkheda Most Trusted Beauty Store"];
export default function AnnouncementBar() {
  const [v, setV] = useState(true);
  if (!v) return null;
  const all = [...msgs, ...msgs];
  return (
    <div style={{background:"#1a1a1a",color:"#f5e6c8",fontSize:12,fontWeight:500,letterSpacing:"0.04em",padding:"8px 36px 8px 0",overflow:"hidden",position:"relative",zIndex:100}}>
      <div style={{overflow:"hidden",whiteSpace:"nowrap"}}>
        <span style={{display:"inline-block",animation:"marquee 28s linear infinite"}}>
          {all.map((m,i)=><span key={i} style={{padding:"0 20px"}}>{m} <span style={{opacity:0.3}}>|</span></span>)}
        </span>
      </div>
      <button onClick={()=>setV(false)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:16}}>✕</button>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
