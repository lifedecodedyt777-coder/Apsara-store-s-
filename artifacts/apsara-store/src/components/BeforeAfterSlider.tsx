import React, { useRef, useState, useCallback, useEffect } from "react";
export interface BAItem { id:number; label:string; concern:string; beforeImage:string; afterImage:string; durationWeeks:number; productUsed:string; }
export default function BeforeAfterSlider({ item }:{ item:BAItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const calc = useCallback((x:number) => {
    if (!ref.current) return 50;
    const r = ref.current.getBoundingClientRect();
    return Math.max(2, Math.min(98, ((x - r.left) / r.width) * 100));
  }, []);
  useEffect(() => {
    if (!drag) return;
    const mm = (e:MouseEvent) => setPos(calc(e.clientX));
    const tm = (e:TouchEvent) => { e.preventDefault(); setPos(calc(e.touches[0].clientX)); };
    const up = () => setDrag(false);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", tm, { passive:false });
    window.addEventListener("touchend", up);
    return () => { window.removeEventListener("mousemove",mm); window.removeEventListener("mouseup",up); window.removeEventListener("touchmove",tm); window.removeEventListener("touchend",up); };
  }, [drag, calc]);
  const img: React.CSSProperties = { position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",pointerEvents:"none",display:"block",userSelect:"none" };
  return (
    <div style={{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 20px rgba(0,0,0,0.08)",border:"1px solid #f0ebe3"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid #f5f0ea"}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#c9a84c",background:"#fdf6e3",padding:"3px 10px",borderRadius:20}}>{item.concern}</span>
        <span style={{fontSize:12,color:"#888",fontStyle:"italic"}}>Results in {item.durationWeeks} weeks</span>
      </div>
      <div ref={ref} onMouseDown={e=>{e.preventDefault();setDrag(true);setPos(calc(e.clientX));}} onTouchStart={e=>{setDrag(true);setPos(calc(e.touches[0].clientX));}}
        style={{position:"relative",width:"100%",aspectRatio:"3/4",overflow:"hidden",cursor:drag?"grabbing":"grab",background:"#f5f0ea",userSelect:"none"}}>
        <div style={{position:"absolute",inset:0}}>
          <img src={item.afterImage} alt="After" style={img}/>
          <span style={{position:"absolute",top:10,right:10,fontSize:10,fontWeight:800,letterSpacing:"0.15em",padding:"4px 10px",borderRadius:20,color:"#fff",background:"rgba(201,168,76,0.9)"}}>AFTER</span>
        </div>
        <div style={{position:"absolute",inset:0,clipPath:`inset(0 ${100-pos}% 0 0)`}}>
          <img src={item.beforeImage} alt="Before" style={img}/>
          <span style={{position:"absolute",top:10,left:10,fontSize:10,fontWeight:800,letterSpacing:"0.15em",padding:"4px 10px",borderRadius:20,color:"#fff",background:"rgba(0,0,0,0.55)"}}>BEFORE</span>
        </div>
        <div style={{position:"absolute",top:0,bottom:0,left:`${pos}%`,width:2,background:"#fff",transform:"translateX(-50%)",pointerEvents:"none",boxShadow:"0 0 8px rgba(0,0,0,0.3)"}}>
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:40,height:40,background:"#c9a84c",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.25)",border:"2px solid #fff"}}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M7 4l-4 6 4 6M13 4l4 6-4 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",gap:10}}>
        <span style={{fontSize:12,color:"#555",flex:1}}>✨ {item.productUsed}</span>
        <a href={`https://wa.me/919960998672?text=Tell me about ${encodeURIComponent(item.productUsed)}`} target="_blank" rel="noopener noreferrer"
          style={{flexShrink:0,padding:"7px 14px",background:"#1a1a1a",color:"#fff",borderRadius:8,fontSize:12,fontWeight:600,textDecoration:"none",whiteSpace:"nowrap"}}>Ask on WhatsApp</a>
      </div>
    </div>
  );
}
