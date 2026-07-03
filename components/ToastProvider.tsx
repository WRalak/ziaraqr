"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

interface ToastContextValue {
  toast: (msg: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((m: string) => {
    setMsg(m);
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 1800);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className={`fixed bottom-10 left-1/2 z-[200] -translate-x-1/2 whitespace-nowrap rounded-full border border-gold-line bg-card-2 px-5 py-3 font-cond text-[13.5px] text-text transition-all duration-300 pointer-events-none ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {msg}
      </div>
    </ToastContext.Provider>
  );
}

/** Helper for links that don't go anywhere in the prototype (external app / socials). */
export function fakeLinkHandler(toast: (m: string) => void, label: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    toast(`Opening ${label}…`);
  };
}
