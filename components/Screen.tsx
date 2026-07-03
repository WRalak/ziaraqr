import { ReactNode } from "react";

export default function Screen({
  children,
  className = "",
  containerClassName = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  wide?: boolean;
}) {
  return (
    <section className={`screen-enter flex-1 bg-bg ${className}`}>
      <div
        className={`mx-auto w-full px-6 py-10 sm:px-10 lg:px-12 ${
          wide ? "max-w-6xl" : "max-w-2xl"
        } ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
