"use client";

import {
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  closeOnOverlay?: boolean;
  className?: string;
}

function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  closeOnOverlay = true,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => dialogRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-xl bg-white shadow-xl",
          "border border-zinc-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          className,
        )}
        style={{
          animation: open ? "modal-enter 200ms ease-out" : undefined,
        }}
      >
        <style>{`
          @keyframes modal-enter {
            from { opacity: 0; transform: scale(0.95) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
        <div className="flex items-start justify-between px-6 pt-6 pb-2">
          <div className="space-y-1">
            {title && (
              <h2 className="text-lg font-semibold text-zinc-900">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-zinc-500">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className={cn(
              "p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100",
              "motion-safe:transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics",
            )}
          >
            <X size={18} />
          </button>
        </div>
        {children && <div className="px-6 py-2">{children}</div>}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export { Modal };
export type { ModalProps };
