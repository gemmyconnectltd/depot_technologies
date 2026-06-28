"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ShoppingCart,
  Search,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";

interface OrderItemData {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface OrderPayment {
  id: string;
  method: string;
  status: string;
  amount: number;
  reference: string | null;
}

interface OrderData {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  notes: string | null;
  customer: string;
  customerEmail: string | null;
  createdAt: string;
  itemCount: number;
  items: OrderItemData[];
  payment: OrderPayment | null;
}

interface OrderDetailData {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  notes: string | null;
  customer: string;
  customerEmail: string | null;
  customerPhone: string | null;
  organisation: string | null;
  createdAt: string;
  updatedAt: string;
  items: (OrderItemData & { productImage: string | null })[];
  payment: (OrderPayment & { paidAt: string | null }) | null;
  address: {
    id: string;
    label: string | null;
    line1: string;
    line2: string | null;
    city: string;
    state: string | null;
    country: string;
    postalCode: string | null;
  } | null;
}

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [selectedOrder, setSelectedOrder] = useState<OrderDetailData | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/admin/orders?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setOrders(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  async function viewOrderDetails(orderId: string) {
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch details");
      const json = await res.json();
      setSelectedOrder(json.data);
      setShowDetail(true);
    } catch {
      setError("Failed to load order details");
    } finally {
      setDetailLoading(false);
    }
  }

  async function handleUpdateStatus(orderId: string, newStatus: string) {
    setUpdateLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Failed to update");
      }
      setUpdatingOrder(null);
      setUpdatingStatus("");
      fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) =>
          prev ? { ...prev, status: newStatus } : prev
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update status"
      );
    } finally {
      setUpdateLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Orders</h1>
        <p className="text-sm text-zinc-500 mt-1">
          View and manage customer orders
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search by order number or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              "w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
            )}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={cn(
            "px-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
          )}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
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
            onClick={fetchOrders}
          >
            Retry
          </Button>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart
            size={40}
            className="mx-auto text-zinc-300 mb-4"
          />
          <p className="text-zinc-500">No orders found</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="text-left px-4 py-3 font-medium text-zinc-600">
                    Order
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-zinc-600">
                    Customer
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-zinc-600">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-600">
                    Total
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-zinc-600">
                    Date
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-50 motion-safe:transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-zinc-900">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      {order.customer}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={statusBadgeVariant(order.status)}
                        size="sm"
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-zinc-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 text-xs">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => viewOrderDetails(order.id)}
                          aria-label="View order details"
                          className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
                        >
                          <Eye size={14} />
                        </button>
                        {order.status !== "DELIVERED" &&
                          order.status !== "CANCELLED" && (
                            <button
                              onClick={() => {
                                setUpdatingOrder(order.id);
                                setUpdatingStatus(order.status);
                              }}
                              className="text-xs font-medium text-electronics hover:text-electronics-bar motion-safe:transition-colors"
                            >
                              Update
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {updatingOrder && (
        <Modal
          open
          onClose={() => {
            setUpdatingOrder(null);
            setUpdatingStatus("");
          }}
          title="Update Order Status"
          footer={
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setUpdatingOrder(null);
                  setUpdatingStatus("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  handleUpdateStatus(updatingOrder, updatingStatus)
                }
                isLoading={updateLoading}
              >
                Update
              </Button>
            </>
          }
        >
          <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-700">
              New Status
            </label>
            <select
              value={updatingStatus}
              onChange={(e) => setUpdatingStatus(e.target.value)}
              className={cn(
                "w-full px-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
              )}
            >
              {STATUS_OPTIONS.filter((o) => o.value).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </Modal>
      )}

      <Modal
        open={showDetail && !!selectedOrder}
        onClose={() => {
          setShowDetail(false);
          setSelectedOrder(null);
        }}
        title={`Order ${selectedOrder?.orderNumber ?? ""}`}
        className="max-w-2xl"
        footer={
          selectedOrder &&
          selectedOrder.status !== "DELIVERED" &&
          selectedOrder.status !== "CANCELLED" ? (
            <Button
              onClick={() => {
                setShowDetail(false);
                setUpdatingOrder(selectedOrder.id);
                setUpdatingStatus(selectedOrder.status);
              }}
            >
              Update Status
            </Button>
          ) : undefined
        }
      >
        {detailLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : selectedOrder ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-zinc-500">Status</p>
                <Badge
                  variant={statusBadgeVariant(selectedOrder.status)}
                  size="sm"
                  className="mt-1"
                >
                  {selectedOrder.status}
                </Badge>
              </div>
              <div>
                <p className="text-zinc-500">Date</p>
                <p className="font-medium text-zinc-900 mt-1">
                  {new Date(selectedOrder.createdAt).toLocaleDateString(
                    "en-RW",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              <div>
                <p className="text-zinc-500">Customer</p>
                <p className="font-medium text-zinc-900 mt-1">
                  {selectedOrder.customer}
                </p>
                {selectedOrder.customerEmail && (
                  <p className="text-zinc-500 text-xs">
                    {selectedOrder.customerEmail}
                  </p>
                )}
                {selectedOrder.customerPhone && (
                  <p className="text-zinc-500 text-xs">
                    {selectedOrder.customerPhone}
                  </p>
                )}
              </div>
              <div>
                <p className="text-zinc-500">Organisation</p>
                <p className="font-medium text-zinc-900 mt-1">
                  {selectedOrder.organisation ?? "N/A"}
                </p>
              </div>
            </div>

            {selectedOrder.address && (
              <div className="text-sm">
                <p className="text-zinc-500 mb-1">Shipping Address</p>
                <p className="text-zinc-900">
                  {selectedOrder.address.line1}
                  {selectedOrder.address.line2 &&
                    `, ${selectedOrder.address.line2}`}
                  <br />
                  {selectedOrder.address.city}
                  {selectedOrder.address.state &&
                    `, ${selectedOrder.address.state}`}
                  <br />
                  {selectedOrder.address.country}
                  {selectedOrder.address.postalCode &&
                    ` - ${selectedOrder.address.postalCode}`}
                </p>
              </div>
            )}

            <div>
              <p className="text-sm text-zinc-500 mb-2">Items</p>
              <div className="border border-zinc-200 rounded-lg divide-y divide-zinc-100">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-4 py-2.5 text-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-zinc-900 truncate">
                        {item.productName}
                      </p>
                      <p className="text-zinc-500 text-xs">
                        Qty: {item.quantity} ×{" "}
                        {formatPrice(item.unitPrice)}
                      </p>
                    </div>
                    <p className="font-medium text-zinc-900 shrink-0 ml-4">
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {selectedOrder.payment && (
              <div className="text-sm">
                <p className="text-zinc-500 mb-1">Payment</p>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-zinc-900">
                    Method: {selectedOrder.payment.method.replace("_", " ")}
                  </p>
                  <p className="text-zinc-900">
                    Status: {selectedOrder.payment.status}
                  </p>
                  {selectedOrder.payment.reference && (
                    <p className="text-zinc-900 col-span-2">
                      Reference: {selectedOrder.payment.reference}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="border-t border-zinc-200 pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span>{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Tax</span>
                <span>{formatPrice(selectedOrder.tax)}</span>
              </div>
              <div className="flex justify-between font-semibold text-zinc-900 pt-1 border-t border-zinc-200">
                <span>Total</span>
                <span>{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            {selectedOrder.notes && (
              <div className="text-sm">
                <p className="text-zinc-500 mb-1">Notes</p>
                <p className="text-zinc-700 bg-zinc-50 rounded-lg px-3 py-2">
                  {selectedOrder.notes}
                </p>
              </div>
            )}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
