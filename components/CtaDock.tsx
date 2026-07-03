import { ReactNode } from "react";

export default function CtaDock({
  children,
  fine,
  wide = false,
  sticky = true,
}: {
  children: ReactNode;
  fine?: string;
  wide?: boolean;
  sticky?: boolean;
}) {
  return (
    <div
      className={`${sticky ? "sticky bottom-0" : ""} z-20 border-t border-line bg-bg/90 backdrop-blur-md`}
    >
      <div
        className={`mx-auto w-full px-6 py-4 sm:px-10 lg:px-12 ${
          wide ? "max-w-6xl" : "max-w-2xl"
        }`}
        style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {children}
        </div>
        {fine && (
          <div className="mt-2.5 text-center font-cond text-xs tracking-[0.03em] text-text-faint">
            {fine}
          </div>
        )}
      </div>
    </div>
  );
}
