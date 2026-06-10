import React, { useState, useEffect } from "react";
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [{label:"Products",href:"#products"},{label:"Concerns",href:"#concerns"},{label:"Offers",href:"#offers"},{label:"About",href:"#about"},{label:"Contact",href:"#contact"}];
  return (
    <>
      <header style={{position:"sticky",top:0,zIndex:90,background:"#faf8f5",borderBottom:"1px solid #e8e2d9",boxShadow:scrolled?"0 2px 12px rgba(0,0,0,0.08)":"none",transition:"box-shadow 0.2s"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",maxWidth:1200,margin:"0 auto"}}>
          <button onClick={()=>setOpen(!open)} style={{background:"none",border:"none",cursor:"pointer",padding:8,minWidth:40}}>
            <div style={{display:"flex",flexDirection:"column",gap:4,width:20}}>
              {[0,1,2].map(i=><span key={i} style={{display:"block",height:2,background:"#2c2c2c",borderRadius:2,width:i===2?"70%":"100%"}}/>)}
            </div>
          </button>
          <a href="#" style={{display:"flex",flexDirection:"column",alignItems:"center",textDecoration:"none",gap:2}}>
            <img src="/apsara-logo.png" alt="Apsara Store" style={{height:52,width:"auto",objectFit:"contain"}}/>
            <span style={{fontFamily:"Georgia,serif",fontSize:11,fontWeight:700,letterSpacing:"0.28em",textTransform:"uppercase",color:"#c9a84c"}}>Store</span>
          </a>
          <a href="https://wa.me/919960998672" target="_blank" rel="noopener noreferrer" style={{color:"#2c2c2c",minWidth:40,display:"flex",justifyContent:"flex-end",textDecoration:"none"}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
        <nav style={{display:"flex",justifyContent:"center",borderTop:"1px solid #f0ebe3",padding:"4px 16px"}}>
          {links.map(l=><a key={l.href} href={l.href} style={{padding:"6px 14px",fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#3a3a3a",textDecoration:"none"}}>{l.label}</a>)}
        </nav>
        {open&&<>
          <div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:200}}/>
          <nav style={{position:"fixed",top:0,left:0,bottom:0,width:270,background:"#fff",zIndex:201,display:"flex",flexDirection:"column",boxShadow:"4px 0 24px rgba(0,0,0,0.12)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderBottom:"1px solid #f0ebe3",background:"#faf8f5"}}>
              <img src="/apsara-logo.png" alt="Apsara" style={{height:44}}/>
              <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:"#555"}}>✕</button>
            </div>
            {links.map(l=><a key={l.href} href={l.href} onClick={()=>setOpen(false)} style={{display:"block",padding:"14px 22px",fontSize:15,fontWeight:500,color:"#2c2c2c",textDecoration:"none",borderBottom:"1px solid #f5f0ea"}}>{l.label}</a>)}
            <a href="https://wa.me/919960998672" target="_blank" rel="noopener noreferrer" style={{margin:"20px 16px 0",display:"block",padding:"12px 20px",background:"#25d366",color:"#fff",textAlign:"center",borderRadius:8,fontWeight:700,textDecoration:"none",fontSize:14}}>💬 Order on WhatsApp</a>
          </nav>
        </>}
      </header>
    </>
  );
}

export { Header };
export default Header;

