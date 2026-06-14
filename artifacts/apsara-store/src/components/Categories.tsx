import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type IconDef = { from: string; to: string; fg: string; svg: JSX.Element };

function getIcon(name: string): IconDef {
  const n = (name || "").toLowerCase();

  if (n.includes("skin")) return {
    from: "#FFF0F3", to: "#FCDCE4", fg: "#D6608A",
    svg: <path d="M12 2C12 2 5 10 5 14a7 7 0 0014 0c0-4-7-12-7-12z" />
  };
  if (n.includes("hair")) return {
    from: "#F0F9F1", to: "#D9EEDC", fg: "#5C9A6B",
    svg: <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </>
  };
  if (n.includes("makeup") || n.includes("cosmetic")) return {
    from: "#FDF1F2", to: "#FADDE1", fg: "#C9657A",
    svg: <>
      <path d="M9 2h6v5l-3 3-3-3V2z" />
      <rect x="8" y="10" width="8" height="11" rx="2" />
    </>
  };
  if (n.includes("fragrance") || n.includes("perfume") || n.includes("scent")) return {
    from: "#F7F2FC", to: "#E8DAF5", fg: "#9B7FC4",
    svg: <>
      <rect x="9" y="4" width="6" height="3" rx="1" />
      <path d="M12 2v2" />
      <path d="M8 7h8l1 13a2 2 0 01-2 2H9a2 2 0 01-2-2L8 7z" />
    </>
  };
  if (n.includes("gift") || n.includes("combo") || n.includes("set")) return {
    from: "#FDF6EC", to: "#F8E6C8", fg: "#D9A05B",
    svg: <>
      <rect x="3" y="8" width="18" height="13" rx="1.5" />
      <path d="M12 8v13" />
      <path d="M3 13h18" />
      <path d="M12 8c0 0-4 0-4-3a2 2 0 014 0 2 2 0 014 0c0 3-4 3-4 3z" />
    </>
  };
  if (n.includes("jewel")) return {
    from: "#FDFAEE", to: "#F5EAC0", fg: "#C7A445",
    svg: <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M11 3L8 9l4 12 4-12-3-6" />
      <path d="M2 9h20" />
    </>
  };
  if (n.includes("daily")) return {
    from: "#EEF9F9", to: "#D6EFEF", fg: "#5BA8A8",
    svg: <>
      <path d="M3 6h18l-2 13H5L3 6z" />
      <path d="M3 6l-1-3" />
      <path d="M9 6V4a3 3 0 016 0v2" />
    </>
  };
  if (n.includes("personal") || n.includes("hygiene") || n.includes("groom")) return {
    from: "#F0F4FC", to: "#DCE6F7", fg: "#7095C4",
    svg: <>
      <path d="M9 2h6v3a3 3 0 003 3v11a2 2 0 01-2 2H8a2 2 0 01-2-2V8a3 3 0 003-3V2z" />
    </>
  };

  return {
    from: "#F6F6F4", to: "#E9E8E2", fg: "#9C9A92",
    svg: <>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 01-8 0" />
    </>
  };
}

export function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("categories").select("*").order("sortOrder", { ascending: true })
      .then(({ data }) => setCategories(data ?? []));

    supabase.from("products").select("categoryId").eq("visible", true)
      .then(({ data }) => {
        const map: Record<string, number> = {};
        (data ?? []).forEach((p: any) => {
          if (p.categoryId) map[p.categoryId] = (map[p.categoryId] || 0) + 1;
        });
        setCounts(map);
      });
  }, []);

  if (categories.length === 0) return null;

  return (
    <section style={{ position: "relative", padding: "64px 0", background: "#fffdf9", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -90, right: -90, width: 260, height: 260, borderRadius: "50%", background: "#f3e6c2", opacity: 0.35, filter: "blur(70px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -110, left: -70, width: 240, height: 240, borderRadius: "50%", background: "#f6dcdc", opacity: 0.3, filter: "blur(70px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", margin: "0 0 8px" }}>
            Explore
          </p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 34, fontWeight: 600, color: "#1a1a1a", margin: "0 0 10px" }}>
            Shop by Category
          </h2>
          <div style={{ width: 52, height: 3, background: "linear-gradient(90deg, #c9a84c, #e6cd84)", margin: "0 auto", borderRadius: 2 }} />
        </div>

        <div className="cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
          {categories.map((cat: any) => {
            const { from, to, fg, svg } = getIcon(cat.name);
            const isHover = hovered === cat.id;
            const count = counts[cat.id];
            return (
              <a key={cat.id} className="cat-item" href={`/products?categoryId=${cat.id}`} style={{ textDecoration: "none" }} onMouseEnter={() => setHovered(cat.id)} onMouseLeave={() => setHovered(null)}>
                <div style={{
                  background: "#fff",
                  border: isHover ? "1px solid #ecdfc0" : "1px solid #f4f0e8",
                  borderRadius: 20,
                  padding: "26px 10px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  height: "100%",
                  boxSizing: "border-box",
                  transform: isHover ? "translateY(-8px)" : "translateY(0)",
                  boxShadow: isHover ? "0 18px 36px -14px rgba(201,168,76,0.4)" : "0 3px 14px rgba(0,0,0,0.04)",
                  transition: "all 0.3s cubic-bezier(.2,.8,.2,1)",
                }}>
                  <div style={{
                    width: 76, height: 76, borderRadius: "50%",
                    padding: 3,
                    background: isHover
                      ? `linear-gradient(135deg, ${fg}66, ${fg}22)`
                      : `linear-gradient(135deg, ${fg}33, ${fg}11)`,
                    transition: "all 0.3s ease",
                  }}>
                    <div style={{
                      width: "100%", height: "100%", borderRadius: "50%",
                      background: `linear-gradient(150deg, ${from}, ${to})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "inset 0 2px 5px rgba(255,255,255,0.7), inset 0 -2px 6px rgba(0,0,0,0.04)",
                      transform: isHover ? "scale(1.06) rotate(-4deg)" : "scale(1) rotate(0deg)",
                      transition: "all 0.3s ease",
                    }}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        {svg}
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: 14.5, fontWeight: 600, color: "#1a1a1a", margin: "0 0 2px", lineHeight: 1.3 }}>
                      {cat.name}
                    </p>
                    {count ? (
                      <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>
                        {count} {count === 1 ? "item" : "items"}
                      </p>
                    ) : null}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <a href="/products" style={{ display: "inline-block", padding: "11px 28px", border: "1px solid #e6dcc6", borderRadius: 30, fontSize: 13, fontWeight: 600, color: "#1a1a1a", textDecoration: "none", letterSpacing: "0.05em", transition: "all 0.2s ease" }}>
            View All Products
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cat-grid {
            display: flex !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 14px !important;
            padding-bottom: 6px;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .cat-grid::-webkit-scrollbar { display: none; }
          .cat-item {
            flex: 0 0 116px;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}

export default Categories;
