import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const CATEGORY_IMAGES: Record<string, string> = {
  skincare: "https://tse2.mm.bing.net/th/id/OIP.cntgUyxCNQlM95YsTr1GgwHaLG?pid=Api&P=0&h=180",
  haircare: "https://tse4.mm.bing.net/th/id/OIP.QHEuykfIIKZD9V3Vu3XmyQHaHa?pid=Api&P=0&h=180",
  makeup: "https://png.pngtree.com/png-clipart/20241024/original/pngtree-geset-of-luxury-beauty-cosmetic-makeup-bdifferent-png-image_16480004.png",
  personalcare: "https://tse4.mm.bing.net/th/id/OIP.HRc0zsEPLQIctlehtsfYlgHaEy?pid=Api&P=0&h=180",
  "personal care": "https://tse4.mm.bing.net/th/id/OIP.HRc0zsEPLQIctlehtsfYlgHaEy?pid=Api&P=0&h=180",
  fragrance: "https://tse4.mm.bing.net/th/id/OIP.3tGGzpgzth43MHurPMXcngHaEK?pid=Api&P=0&h=180",
  "gifts & combos": "https://tse2.mm.bing.net/th/id/OIP.y2oIdWOMywPW9YVZifwAXgHaHa?pid=Api&P=0&h=180",
  giftscombos: "https://tse2.mm.bing.net/th/id/OIP.y2oIdWOMywPW9YVZifwAXgHaHa?pid=Api&P=0&h=180",
  dailyneeds: "https://image.cdn.shpy.in/354690/DailyNeedsMiddleClassShopping-1736514383170.png?format=webp",
  "daily needs": "https://image.cdn.shpy.in/354690/DailyNeedsMiddleClassShopping-1736514383170.png?format=webp",
  jwellery: "https://tse4.mm.bing.net/th/id/OIP.CALPUnfG61BefL0vDRIoKwHaJ4?pid=Api&P=0&h=180",
  jewellery: "https://tse4.mm.bing.net/th/id/OIP.CALPUnfG61BefL0vDRIoKwHaJ4?pid=Api&P=0&h=180",
};

function normalize(value: string = "") {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getCategoryImage(cat: any) {
  const raw = cat?.iconUrl || cat?.imageUrl || "";
  if (raw) return raw;

  const key = normalize(cat?.slug || cat?.name || "");
  return CATEGORY_IMAGES[key] || CATEGORY_IMAGES[(cat?.name || "").toLowerCase()] || "";
}

function getInitials(name: string = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export function Categories() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .order("sortOrder", { ascending: true })
      .then(({ data }) => setCategories(data ?? []));
  }, []);

  if (!categories.length) return null;

  return (
    <section style={{ padding: "56px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c9a84c", margin: "0 0 6px" }}>
            Explore
          </p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 600, color: "#1a1a1a", margin: "0 0 10px" }}>
            Shop by Category
          </h2>
          <div style={{ width: 48, height: 3, background: "#c9a84c", margin: "0 auto", borderRadius: 2 }} />
        </div>

        <div className="cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {categories.map((cat: any) => {
            const imageUrl = getCategoryImage(cat);
            const initials = getInitials(cat?.name || "Category");

            return (
              <a
                key={cat.id}
                href={`/products?categoryId=${cat.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #f2eee6",
                    borderRadius: 18,
                    padding: "24px 12px 20px",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    cursor: "pointer",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 14px 30px -10px rgba(201,168,76,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.03)";
                  }}
                >
                  <div
                    style={{
                      width: 74,
                      height: 74,
                      borderRadius: "50%",
                      margin: "0 auto 14px",
                      overflow: "hidden",
                      background: "linear-gradient(145deg, #fff7ea, #f3e6c8)",
                      border: "2px solid #f0e1bf",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={cat?.name || "Category"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: 18, fontWeight: 700, color: "#9c7a2f" }}>
                        {initials}
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1a1a1a",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {cat.name}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .cat-grid > a > div {
            padding: 18px 10px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Categories;
