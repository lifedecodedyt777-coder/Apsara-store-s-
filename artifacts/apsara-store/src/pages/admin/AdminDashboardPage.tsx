import { supabase } from '../../lib/supabase';
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";

import { useQueryClient } from "@tanstack/react-query";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Search,
  Eye,
  EyeOff,
  ExternalLink,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type ProductFormData = {
  name: string;
  shortDescription: string;
  description: string;
  price: string;
  comparePrice: string;
  categoryId: string;
  imageUrl: string;
  featured: boolean;
  bestSeller: boolean;
  inStock: boolean;
  visible: boolean;
  sortOrder: string;
};

const emptyProductForm: ProductFormData = {
  name: "",
  shortDescription: "",
  description: "",
  price: "",
  comparePrice: "",
  categoryId: "none",
  imageUrl: "",
  featured: false,
  bestSeller: false,
  inStock: true,
  visible: true,
  sortOrder: "0",
};

type CategoryFormData = {
  name: string;
  slug: string;
  description: string;
  sortOrder: string;
};
const emptyCategoryForm: CategoryFormData = { name: "", slug: "", description: "", sortOrder: "0" };

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function productToFormData(p: Product): ProductFormData {
  return {
    name: p.name,
    shortDescription: p.shortDescription,
    description: p.description,
    price: String(p.price),
    comparePrice: p.comparePrice ? String(p.comparePrice) : "",
    categoryId: p.categoryId ? String(p.categoryId) : "none",
    imageUrl: p.imageUrl ?? "",
    featured: p.featured,
    bestSeller: p.bestSeller,
    inStock: p.inStock,
    visible: p.visible,
    sortOrder: String(p.sortOrder),
  };
}

function categoryToFormData(c: Category): CategoryFormData {
  return {
    name: c.name,
    slug: c.slug,
    description: c.description ?? "",
    sortOrder: String(c.sortOrder),
  };
}

function ImageUploadField({
  imageUrl,
  onImageUrlChange,
}: {
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [urlMode, setUrlMode] = useState(!imageUrl || imageUrl.startsWith("http"));
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const token = localStorage.getItem("admin_token");
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/uploads", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = (await res.json()) as { url: string };
      onImageUrlChange(data.url);
      setUrlMode(false);
    } catch {
      setUploadError("Upload failed. Try again or paste a URL instead.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Product Image</Label>
        <button
          type="button"
          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          onClick={() => setUrlMode((v) => !v)}
        >
          {urlMode ? "Upload file instead" : "Paste URL instead"}
        </button>
      </div>

      {urlMode ? (
        <Input
          value={imageUrl}
          onChange={(e) => onImageUrlChange(e.target.value)}
          placeholder="https://example.com/product.jpg"
          data-testid="input-product-image-url"
        />
      ) : (
        <div
          className="relative border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent/60 hover:bg-muted/30 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
            data-testid="input-product-image-file"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Uploading…</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload <span className="font-medium text-foreground">JPG, PNG, WebP</span>
              </span>
              <span className="text-xs text-muted-foreground">Max 10 MB</span>
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <p className="text-xs text-red-600">{uploadError}</p>
      )}

      {imageUrl && (
        <div className="relative inline-block">
          <img
            src={imageUrl}
            alt="Preview"
            className="h-24 w-24 rounded-lg object-cover bg-muted border border-border"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={() => onImageUrlChange("")}
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80"
            aria-label="Remove image"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

export function AdminDashboardPage() {
  const { logout } = useAdminAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  useEffect(() => {
    supabase.from("products").select("*").order("sortOrder", { ascending: true })
      .then(({ data }) => { setProducts(data ?? []); setProductsLoading(false); });
  }, []);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  useEffect(() => {
    supabase.from("categories").select("*").order("sortOrder", { ascending: true })
      .then(({ data }) => { setCategories(data ?? []); setCategoriesLoading(false); });
  }, []);



  const [productSearch, setProductSearch] = useState("");
  const [productDialog, setProductDialog] = useState<"add" | "edit" | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<ProductFormData>(emptyProductForm);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  const [categoryDialog, setCategoryDialog] = useState<"add" | "edit" | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState<CategoryFormData>(emptyCategoryForm);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);

  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const categoryMap = new Map((Array.isArray(categories) ? categories : []).map((c) => [c.id, c.name]));

  const filteredProducts = (Array.isArray(products) ? products : []).filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()),
  );

  function handleLogout() {
    logout();
    setLocation("/admin");
  }

  function invalidateAll() {
    supabase.from('products').select('*').order('sortOrder',{ascending:true}).then(({data})=>setProducts(data??[]));
    supabase.from('categories').select('*').order('sortOrder',{ascending:true}).then(({data})=>setCategories(data??[]));
  }

  function openAddProduct() {
    setProductForm(emptyProductForm);
    setEditingProduct(null);
    setFormError("");
    setProductDialog("add");
  }

  function openEditProduct(p: Product) {
    setProductForm(productToFormData(p));
    setEditingProduct(p);
    setFormError("");
    setProductDialog("edit");
  }

  function buildProductInput(): ProductInput {
    return {
      name: productForm.name,
      shortDescription: productForm.shortDescription,
      description: productForm.description,
      price: Number(productForm.price) || 0,
      comparePrice: productForm.comparePrice ? Number(productForm.comparePrice) : null,
      categoryId: productForm.categoryId !== "none" ? Number(productForm.categoryId) : null,
      imageUrl: productForm.imageUrl || null,
      featured: productForm.featured,
      bestSeller: productForm.bestSeller,
      inStock: productForm.inStock,
      visible: productForm.visible,
      sortOrder: Number(productForm.sortOrder) || 0,
    };
  }

  async function saveProduct() {
    if (!productForm.name.trim()) {
      setFormError("Product name is required.");
      return;
    }
    if (!productForm.price || isNaN(Number(productForm.price))) {
      setFormError("Valid price is required.");
      return;
    }
    setFormError("");
    setIsSaving(true);

    const data = buildProductInput();

    if (productDialog === "add") {
      const { error } = await supabase.from('products').insert([data]);
      if (error) {
        setFormError("Failed to save: " + error.message);
        setIsSaving(false);
        return;
      }
      invalidateAll();
      setProductDialog(null);
      setIsSaving(false);
    } else if (editingProduct) {
      const { error: upErr } = await supabase.from('products').update(data).eq('id', editingProduct.id);
      if (upErr) { setFormError('Failed to save. Please try again.'); setIsSaving(false); return; }
      invalidateAll();
      setProductDialog(null);
      setIsSaving(false);
    }
  }

  async function confirmDeleteProduct() {
    if (!deleteProductId) return;
    await supabase.from('products').delete().eq('id', deleteProductId);
    invalidateAll();
    setDeleteProductId(null);
  }

  function openAddCategory() {
    setCategoryForm(emptyCategoryForm);
    setEditingCategory(null);
    setFormError("");
    setCategoryDialog("add");
  }

  function openEditCategory(c: Category) {
    setCategoryForm(categoryToFormData(c));
    setEditingCategory(c);
    setFormError("");
    setCategoryDialog("edit");
  }

  async function saveCategory() {
    if (!categoryForm.name.trim()) {
      setFormError("Category name is required.");
      return;
    }
    if (!categoryForm.slug.trim()) {
      setFormError("Slug is required.");
      return;
    }
    setFormError("");
    setIsSaving(true);

    const data: CategoryInput = {
      name: categoryForm.name,
      slug: categoryForm.slug,
      description: categoryForm.description || undefined,
      sortOrder: Number(categoryForm.sortOrder) || 0,
    };

    if (categoryDialog === "add") {
      const { error: catErr } = await supabase.from('categories').insert([data]);
      if (catErr) { setFormError('Failed to save. Please try again.'); setIsSaving(false); return; }
      invalidateAll();
      setCategoryDialog(null);
      setIsSaving(false);
    } else if (editingCategory) {
      const { error: catUpErr } = await supabase.from('categories').update(data).eq('id', editingCategory.id);
      if (catUpErr) { setFormError('Failed to save. Please try again.'); setIsSaving(false); return; }
      invalidateAll();
      setCategoryDialog(null);
      setIsSaving(false);
    }
  }

  async function confirmDeleteCategory() {
    if (!deleteCategoryId) return;
    await supabase.from('categories').delete().eq('id', deleteCategoryId);
    invalidateAll();
    setDeleteCategoryId(null);
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl font-semibold text-foreground">Apsara Store</span>
            <Badge variant="secondary" className="text-xs">
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-view-site"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Site
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-medium text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your products and categories.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Products", value: products?.length ?? 0 },
            { label: "Visible", value: (Array.isArray(products) ? products : []).filter((p) => p.visible).length ?? 0 },
            { label: "Featured", value: (Array.isArray(products) ? products : []).filter((p) => p.featured).length ?? 0 },
            { label: "Categories", value: categories?.length ?? 0 },
          ].map((stat) => (
            <div key={stat.label} className="bg-background rounded-xl border border-border p-5">
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products" data-testid="tab-products">
              Products
            </TabsTrigger>
            <TabsTrigger value="categories" data-testid="tab-categories">
              Categories
            </TabsTrigger>
          <TabsTrigger value="results" onClick={() => { window.location.href = "/admin/results"; }}>Before / After</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="bg-background rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="pl-9 h-9"
                    data-testid="input-admin-product-search"
                  />
                </div>
                <Button size="sm" onClick={openAddProduct} data-testid="button-add-product">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {productsLoading ? (
                <div className="p-6 space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <ImageIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="font-serif text-lg mb-1">No products yet</p>
                  <p className="text-sm">Click "Add Product" to get started.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                          Product
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                          Category
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                          Price
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                          Status
                        </th>
                        <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredProducts.map((product) => (
                        <tr
                          key={product.id}
                          className="hover:bg-muted/20 transition-colors"
                          data-testid={`row-product-${product.id}`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {product.imageUrl ? (
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="h-10 w-10 rounded-md object-cover bg-muted shrink-0"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-md bg-muted shrink-0 flex items-center justify-center">
                                  <ImageIcon className="h-4 w-4 text-muted-foreground/40" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-foreground leading-tight">
                                  {product.name}
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {product.shortDescription}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                            {product.categoryId ? categoryMap.get(product.categoryId) ?? "—" : "—"}
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className="font-semibold text-foreground">
                                ₹{product.price}
                              </span>
                              {product.comparePrice && (
                                <span className="ml-2 text-xs text-muted-foreground line-through">
                                  ₹{product.comparePrice}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {product.featured && (
                                <Badge className="text-xs bg-accent text-accent-foreground hover:bg-accent border-none">
                                  Featured
                                </Badge>
                              )}
                              {product.bestSeller && (
                                <Badge variant="secondary" className="text-xs">
                                  Best Seller
                                </Badge>
                              )}
                              {!product.inStock && (
                                <Badge variant="destructive" className="text-xs">
                                  Out of Stock
                                </Badge>
                              )}
                              {!product.visible && (
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                  <EyeOff className="h-3 w-3" /> Hidden
                                </span>
                              )}
                              {product.visible &&
                                product.inStock &&
                                !product.featured &&
                                !product.bestSeller && (
                                  <span className="inline-flex items-center gap-1 text-xs text-green-600">
                                    <Eye className="h-3 w-3" /> Visible
                                  </span>
                                )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => openEditProduct(product)}
                                data-testid={`button-edit-product-${product.id}`}
                                title="Edit product"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => setDeleteProductId(product.id)}
                                data-testid={`button-delete-product-${product.id}`}
                                title="Delete product"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="bg-background rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">
                  {categories?.length ?? 0} categories
                </p>
                <Button size="sm" onClick={openAddCategory} data-testid="button-add-category">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>

              {categoriesLoading ? (
                <div className="p-6 space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (Array.isArray(categories) ? categories : []).length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <p className="font-serif text-lg">No categories yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                          Name
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                          Slug
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                          Description
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                          Order
                        </th>
                        <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[...(Array.isArray(categories) ? categories : [])]
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((cat) => (
                          <tr
                            key={cat.id}
                            className="hover:bg-muted/20 transition-colors"
                            data-testid={`row-category-${cat.id}`}
                          >
                            <td className="px-4 py-3 font-medium text-foreground">{cat.name}</td>
                            <td className="px-4 py-3 text-muted-foreground font-mono text-xs hidden sm:table-cell">
                              {cat.slug}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                              {cat.description ?? "—"}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{cat.sortOrder}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => openEditCategory(cat)}
                                  data-testid={`button-edit-category-${cat.id}`}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() => setDeleteCategoryId(cat.id)}
                                  data-testid={`button-delete-category-${cat.id}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Product Dialog */}
      <Dialog
        open={productDialog !== null}
        onOpenChange={(open) => {
          if (!open) setProductDialog(null);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {productDialog === "add" ? "Add New Product" : "Edit Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pname">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pname"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Vitamin C Serum"
                  data-testid="input-product-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pcategory">Category</Label>
                <Select
                  value={productForm.categoryId}
                  onValueChange={(v) => setProductForm({ ...productForm, categoryId: v })}
                >
                  <SelectTrigger data-testid="select-product-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Category</SelectItem>
                    {(Array.isArray(categories) ? categories : []).map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pshortdesc">Short Description</Label>
              <Input
                id="pshortdesc"
                value={productForm.shortDescription}
                onChange={(e) =>
                  setProductForm({ ...productForm, shortDescription: e.target.value })
                }
                placeholder="One-line benefit description"
                data-testid="input-product-short-desc"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdesc">Full Description</Label>
              <Textarea
                id="pdesc"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="Detailed product information..."
                rows={3}
                data-testid="input-product-desc"
              />
            </div>

            {/* Price row */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pprice">
                  Selling Price (₹) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pprice"
                  type="number"
                  min="0"
                  step="1"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  placeholder="299"
                  data-testid="input-product-price"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pcompareprice">MRP / Compare Price (₹)</Label>
                <Input
                  id="pcompareprice"
                  type="number"
                  min="0"
                  step="1"
                  value={productForm.comparePrice}
                  onChange={(e) =>
                    setProductForm({ ...productForm, comparePrice: e.target.value })
                  }
                  placeholder="399"
                  data-testid="input-product-compare-price"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="psortorder">Sort Order</Label>
                <Input
                  id="psortorder"
                  type="number"
                  value={productForm.sortOrder}
                  onChange={(e) => setProductForm({ ...productForm, sortOrder: e.target.value })}
                  placeholder="0"
                  data-testid="input-product-sort"
                />
              </div>
            </div>

            {/* Image upload */}
            <ImageUploadField
              imageUrl={productForm.imageUrl}
              onImageUrlChange={(url) => setProductForm({ ...productForm, imageUrl: url })}
            />

            {/* Toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {(
                [
                  { key: "featured", label: "Featured" },
                  { key: "bestSeller", label: "Best Seller" },
                  { key: "inStock", label: "In Stock" },
                  { key: "visible", label: "Visible" },
                ] as const
              ).map(({ key, label }) => (
                <div
                  key={key}
                  className="flex flex-col items-start gap-2 p-3 rounded-lg border border-border bg-muted/20"
                >
                  <Label className="text-xs text-muted-foreground">{label}</Label>
                  <Switch
                    checked={productForm[key]}
                    onCheckedChange={(v) => setProductForm({ ...productForm, [key]: v })}
                    data-testid={`switch-product-${key}`}
                  />
                </div>
              ))}
            </div>

            {formError && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">{formError}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setProductDialog(null)}>
              Cancel
            </Button>
            <Button
              onClick={saveProduct}
              disabled={isSaving}
              data-testid="button-save-product"
            >
              {isSaving
                ? "Saving…"
                : productDialog === "add"
                  ? "Add Product"
                  : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog
        open={categoryDialog !== null}
        onOpenChange={(open) => {
          if (!open) setCategoryDialog(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {categoryDialog === "add" ? "Add Category" : "Edit Category"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="cname">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cname"
                value={categoryForm.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setCategoryForm({
                    ...categoryForm,
                    name,
                    slug: categoryDialog === "add" ? slugify(name) : categoryForm.slug,
                  });
                }}
                placeholder="e.g. Skincare"
                data-testid="input-category-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cslug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cslug"
                value={categoryForm.slug}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, slug: slugify(e.target.value) })
                }
                placeholder="e.g. skincare"
                className="font-mono text-sm"
                data-testid="input-category-slug"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cdesc">Description</Label>
              <Input
                id="cdesc"
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, description: e.target.value })
                }
                placeholder="Short description"
                data-testid="input-category-desc"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="csortorder">Sort Order</Label>
              <Input
                id="csortorder"
                type="number"
                value={categoryForm.sortOrder}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, sortOrder: e.target.value })
                }
                placeholder="0"
                data-testid="input-category-sort"
              />
            </div>

            {formError && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">{formError}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialog(null)}>
              Cancel
            </Button>
            <Button
              onClick={saveCategory}
              disabled={isSaving}
              data-testid="button-save-category"
            >
              {isSaving
                ? "Saving…"
                : categoryDialog === "add"
                  ? "Add Category"
                  : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Confirm */}
      <AlertDialog
        open={deleteProductId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteProductId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the product from your store. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProduct}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete-product"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Category Confirm */}
      <AlertDialog
        open={deleteCategoryId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteCategoryId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the category. Products in this category will not be
              deleted but will lose their category assignment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteCategory}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete-category"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}









