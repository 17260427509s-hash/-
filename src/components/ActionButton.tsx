import type { ButtonHTMLAttributes, ReactNode } from "react";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  variant?: "primary" | "secondary";
};

export function ActionButton({ icon, variant = "secondary", className = "", children, ...props }: ActionButtonProps) {
  const styles =
    variant === "primary"
      ? "border-gold-300/70 bg-gradient-to-r from-gold-400 via-gold-300 to-white text-court-950 shadow-glow"
      : "border-white/15 bg-white/[0.08] text-white shadow-cyan backdrop-blur-xl";

  return (
    <button
      className={`button-glow flex min-h-12 items-center justify-center gap-2 rounded-full border px-4 text-sm font-black transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 ${styles} ${className}`}
      type="button"
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
