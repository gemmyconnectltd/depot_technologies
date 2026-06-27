"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Package,
  Search,
  Plus,
  Pencil,
  Archive,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Spinner } from "@/components/ui/Spinner";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  brand: string | null;
  retailPrice: number;
  bulkPrice: number | null;
  bulkMinQty: number | null;
  stockStatus: string;
  active: boolean;
  featured: boolean;
  createdAt: string;
  image: string | null;
  quantity: number;
  lowThreshold: number;
}

type ProductFormData = {
  name: string;
  description: string;
  category: string;
  brand: string;
  sku: string;
  retailPrice: string;
  bulkPrice: string;
  bulkMinQty: string;
  stockQuantity: string;
  lowThreshold: string;
  featured: boolean;
};

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  category: "STATIONERY",
  brand: "",
  sku: "",
  retailPrice: "",
  bulkPrice: "",
  bulkMinQty: "",
  stockQuantity: "0",
  lowThreshold: "10",
  featured: false,
};

const CATEGORY_OPTIONS = [
  { value: "STATIONERY", label: "Stationery" },
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "SOFTWARE", label: "Software" },
];

function formatPrice(amount: number): string {
  return `RWF ${amount.toLocaleString("en-RW")}`;
}

function stockBadgeVariant(
  status: string
): "success" | "warning" | "danger" | "default" {
  switch (status) {
    case "IN_STOCK":
      return "success";
    case "LOW_STOCK":
      return "warning";
    case "OUT_OF_STOCK":
      return "danger";
    default:
      return "default";
  }
}

function ProductForm({
  data,
  onChange,
  errors,
}: {
  data: ProductFormData;
  onChange: (data: ProductFormData) => void;
  errors: Partial<Record<keyof ProductFormData, string>>;
}) {
  const set = (field: keyof ProductFormData, value: string | boolean) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-4">
      <Input
        label="Name"
        value={data.name}
        onChange={(e) => set("name", e.target.value)}
        error={errors.name}
      />
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-zinc-700">
          Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          className={cn(
            "w-full px-4 py-2 text-sm rounded-lg border bg-white text-zinc-900",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics",
            errors.description
              ? "border-red-500"
              : "border-zinc-300"
          )}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Category"
          options={CATEGORY_OPTIONS}
          value={data.category}
          onChange={(e) => set("category", e.target.value)}
        />
        <Input
          label="Brand"
          value={data.brand}
          onChange={(e) => set("brand", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="SKU"
          value={data.sku}
          onChange={(e) => set("sku", e.target.value)}
          error={errors.sku}
        />
        <Input
          label="Retail Price"
          type="number"
          value={data.retailPrice}
          onChange={(e) => set("retailPrice", e.target.value)}
          error={errors.retailPrice}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Bulk Price"
          type="number"
          value={data.bulkPrice}
          onChange={(e) => set("bulkPrice", e.target.value)}
        />
        <Input
          label="Bulk Min Qty"
          type="number"
          value={data.bulkMinQty}
          onChange={(e) => set("bulkMinQty", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Stock Quantity"
          type="number"
          value={data.stockQuantity}
          onChange={(e) => set("stockQuantity", e.target.value)}
        />
        <Input
          label="Low Threshold"
          type="number"
          value={data.lowThreshold}
          onChange={(e) => set("lowThreshold", e.target.value)}
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={data.featured}
          onChange={(e) => set("featured", e.target.checked)}
          className="rounded border-zinc-300 text-electronics focus:ring-electronics"
        />
        <span className="text-zinc-700">Featured product</span>
      </label>
    </div>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [archivingProduct, setArchivingProduct] = useState<ProductItem | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});
  const [saving, setSaving] = useState(false);
  const [archiving, setArchiving] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ includeInactive: "true" });
      if (search) params.set("search", search);
      if (categoryFilter) params.set("category", categoryFilter);
      const res = await fetch(`/api/admin/products?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setProducts(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function resetForm() {
    setFormData(emptyForm);
    setFormErrors({});
  }

  function openCreate() {
    resetForm();
    setEditingProduct(null);
    setShowCreate(true);
  }

  function openEdit(product: ProductItem) {
    setFormData({
      name: product.name,
      description: "",
      category: product.category,
      brand: product.brand ?? "",
      sku: product.sku,
      retailPrice: String(product.retailPrice),
      bulkPrice: product.bulkPrice ? String(product.bulkPrice) : "",
      bulkMinQty: product.bulkMinQty ? String(product.bulkMinQty) : "",
      stockQuantity: String(product.quantity),
      lowThreshold: String(product.lowThreshold),
      featured: product.featured,
    });
    setFormErrors({});
    setEditingProduct(product);
    setShowCreate(true);
  }

  async function handleSave() {
    const errors: Partial<Record<keyof ProductFormData, string>> = {};
    if (!formData.name.trim()) errors.name = "Required";
    if (!formData.description.trim()) errors.description = "Required";
    if (!formData.sku.trim()) errors.sku = "Required";
    if (!formData.retailPrice || Number(formData.retailPrice) <= 0)
      errors.retailPrice = "Must be positive";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        brand: formData.brand || undefined,
        sku: formData.sku,
        retailPrice: Number(formData.retailPrice),
        bulkPrice: formData.bulkPrice ? Number(formData.bulkPrice) : undefined,
        bulkMinQty: formData.bulkMinQty ? Number(formData.bulkMinQty) : undefined,
        stockQuantity: Number(formData.stockQuantity),
        lowThreshold: Number(formData.lowThreshold),
        featured: formData.featured,
      };

      if (editingProduct) {
        const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const json = await res.json();
          throw new Error(json.error ?? "Failed to update");
        }
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const json = await res.json();
          throw new Error(json.error ?? "Failed to create");
        }
      }

      setShowCreate(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      setFormErrors({
        name: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleArchive(product: ProductItem) {
    setArchiving(true);
    try {
      const action = product.active ? "archive" : "restore";
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error("Failed");
      setArchivingProduct(null);
      fetchProducts();
    } catch {
      setError("Failed to update product");
    } finally {
      setArchiving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Products</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage your product catalog
          </p>
        </div>
        <Button onClick={openCreate} leftIcon={<Plus size={16} />}>
          Add Product
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              "w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
            )}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={cn(
            "px-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
          )}
        >
          <option value="">All Categories</option>
          <option value="STATIONERY">Stationery</option>
          <option value="ELECTRONICS">Electronics</option>
          <option value="SOFTWARE">Software</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-zinc-500">{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={fetchProducts}
          >
            Retry
          </Button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <Package size={40} className="mx-auto text-zinc-300 mb-4" />
          <p className="text-zinc-500">No products found</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="text-left px-4 py-3 font-medium text-zinc-600">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-zinc-600">
                    SKU
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-zinc-600">
                    Category
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-600">
                    Price
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-zinc-600">
                    Stock
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-zinc-600">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={cn(
                      "hover:bg-zinc-50 motion-safe:transition-colors",
                      !product.active && "opacity-60"
                    )}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-zinc-900 truncate max-w-[200px]">
                        {product.name}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 font-mono text-xs">
                      {product.sku}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="default" size="sm">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-zinc-900">
                      {formatPrice(product.retailPrice)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={cn(
                          "text-sm",
                          product.quantity <= product.lowThreshold
                            ? "text-amber-600 font-semibold"
                            : "text-zinc-600"
                        )}
                      >
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge
                        variant={stockBadgeVariant(product.stockStatus)}
                        size="sm"
                      >
                        {product.active
                          ? product.stockStatus.replace(/_/g, " ")
                          : "ARCHIVED"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(product)}
                          aria-label="Edit product"
                          className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setArchivingProduct(product)}
                          aria-label={
                            product.active ? "Archive product" : "Restore product"
                          }
                          className="p-1.5 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50"
                        >
                          {product.active ? (
                            <Archive size={14} />
                          ) : (
                            <RefreshCw size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          resetForm();
        }}
        title={editingProduct ? "Edit Product" : "Create Product"}
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreate(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} isLoading={saving}>
              {editingProduct ? "Save Changes" : "Create Product"}
            </Button>
          </>
        }
      >
        <ProductForm
          data={formData}
          onChange={setFormData}
          errors={formErrors}
        />
      </Modal>

      <Modal
        open={!!archivingProduct}
        onClose={() => setArchivingProduct(null)}
        title={
          archivingProduct?.active ? "Archive Product" : "Restore Product"
        }
        description={
          archivingProduct?.active
            ? `Are you sure you want to archive "${archivingProduct?.name}"? It will be hidden from the storefront.`
            : `Are you sure you want to restore "${archivingProduct?.name}"? It will be visible on the storefront again.`
        }
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setArchivingProduct(null)}
            >
              Cancel
            </Button>
            <Button
              variant={archivingProduct?.active ? "danger" : "primary"}
              isLoading={archiving}
              onClick={() => {
                if (archivingProduct) handleArchive(archivingProduct);
              }}
            >
              {archivingProduct?.active ? "Archive" : "Restore"}
            </Button>
          </>
        }
      />
    </div>
  );
}
