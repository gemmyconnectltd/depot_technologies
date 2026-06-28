"use client";

import { useEffect, useState } from "react";
import {
  Package,
  ShoppingCart,
  DollarSign,
  FileText,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";

interface RecentOrder {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  customer: string;
  createdAt: string;
  itemCount: number;
}

interface LowStockItem {
  productId: string;
  productName: string;
  sku: string;
  category: string;
  quantity: number;
  threshold: number;
}

interface DashboardData {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingRfqs: number;
  recentOrders: RecentOrder[];
  lowStockItems: LowStockItem[];
}

function formatPrice(amount: number): string {
  return `RWF ${amount.toLocaleString("en-RW")}`;
}

function statusBadgeVariant(
  status: string
): "success" | "warning" | "danger" | "info" | "default" {
  switch (status) {
    case "DELIVERED":
      return "success";
    case "SHIPPED":
    case "CONFIRMED":
    case "PROCESSING":
      return "info";
    case "PENDING":
      return "warning";
    case "CANCELLED":
      return "danger";
    default:
      return "default";
  }
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center gap-4">
        <div className={cn("p-2.5 rounded-lg", bg)}>
          <Icon size={20} className={color} />
        </div>
        <div>
          <p className="text-sm text-zinc-500">{label}</p>
          <p className="text-xl font-bold text-zinc-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500">
          {error ?? "No data available"}
        </p>
      </div>
    );
  }

  const cards = [
    {
      label: "Total Products",
      value: data.totalProducts,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Orders",
      value: data.totalOrders,
      icon: ShoppingCart,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      label: "Total Revenue",
      value: formatPrice(data.totalRevenue),
      icon: DollarSign,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      label: "Pending RFQs",
      value: data.pendingRfqs,
      icon: FileText,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Overview of your store
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
            <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
              <TrendingUp size={16} className="text-zinc-400" />
              Recent Orders
            </h2>
          </div>
          {data.recentOrders.length === 0 ? (
            <p className="text-sm text-zinc-500 p-5">No orders yet</p>
          ) : (
            <div className="divide-y divide-zinc-100">
              {data.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between px-5 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {order.orderNumber}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {order.customer}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant={statusBadgeVariant(order.status)}
                      size="sm"
                    >
                      {order.status}
                    </Badge>
                    <span className="text-sm font-medium text-zinc-900">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
            <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              Low Stock Alerts
            </h2>
          </div>
          {data.lowStockItems.length === 0 ? (
            <p className="text-sm text-zinc-500 p-5">
              All items well stocked
            </p>
          ) : (
            <div className="divide-y divide-zinc-100">
              {data.lowStockItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between px-5 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-zinc-500">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        item.quantity === 0
                          ? "text-red-600"
                          : "text-amber-600"
                      )}
                    >
                      {item.quantity} left
                    </p>
                    <p className="text-xs text-zinc-400">
                      Threshold: {item.threshold}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
