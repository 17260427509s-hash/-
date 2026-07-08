import { motion } from "framer-motion";

type ArenaBackgroundProps = { isDrawing: boolean };

export function ArenaBackground({ isDrawing }: ArenaBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-court-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-8%,rgba(56,189,248,0.30),transparent_28%),radial-gradient(circle_at_28%_34%,rgba(248,201,91,0.18),transparent_24%),linear-gradient(180deg,#07162e_0%,#030711_45%,#02040b_100%)]" />
      <div className="absolute inset-x-[-12%] top-[13%] h-px bg-gradient-to-r from-transparent via-gold-300/80 to-transparent shadow-glow" />
      <div className="absolute inset-x-[-20%] top-[30%] h-[18%] -skew-y-6 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_34px,rgba(53,217,255,0.12)_35px,transparent_37px)] opacity-50" />
      <div className="absolute bottom-[8%] left-1/2 h-[44%] w-[118%] -translate-x-1/2 rounded-[50%] border border-cyanfire/20 bg-[radial-gradient(ellipse_at_center,rgba(15,45,82,0.42),transparent_64%)]" />
      <div className="absolute bottom-[7%] left-1/2 h-[34%] w-[92%] -translate-x-1/2 border-x border-t border-gold-400/20 opacity-70" />
      <div className="absolute bottom-[20%] left-1/2 h-px w-[88%] -translate-x-1/2 bg-cyanfire/20" />
      <div className="absolute bottom-[7%] left-1/2 h-[34%] w-px -translate-x-1/2 bg-gold-400/20" />
      <motion.div
        className="absolute left-[-20%] top-[24%] h-12 w-[78%] rotate-[-18deg] bg-gradient-to-r from-transparent via-cyanfire/65 to-transparent blur-sm"
        animate={{ x: isDrawing ? ["0%", "86%", "8%"] : ["0%", "18%", "0%"], opacity: isDrawing ? [0, 1, 0.25] : [0.25, 0.55, 0.25] }}
        transition={{ duration: isDrawing ? 0.55 : 4.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-24%] top-[18%] h-10 w-[72%] rotate-[22deg] bg-gradient-to-r from-transparent via-gold-300/70 to-transparent blur-sm"
        animate={{ x: isDrawing ? ["0%", "-70%", "0%"] : ["0%", "-12%", "0%"], opacity: isDrawing ? [0.15, 0.95, 0.2] : [0.2, 0.42, 0.2] }}
        transition={{ duration: isDrawing ? 0.62 : 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,transparent_42%,rgba(255,255,255,0.08)_44%,transparent_46%,transparent_100%)] opacity-70" />
      <motion.div
        className="absolute left-[8%] top-[38%] h-8 w-8 rounded-full border border-white/80 bg-white/80 shadow-[0_0_26px_rgba(255,255,255,0.55)]"
        animate={isDrawing ? { x: [0, 260], y: [0, -160], rotate: [0, 540], opacity: [0, 1, 0] } : { x: [0, 90, 0], y: [0, -56, 0], rotate: [0, 120, 0], opacity: [0.18, 0.52, 0.18] }}
        transition={{ duration: isDrawing ? 0.82 : 5.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute left-[-58px] top-1/2 h-px w-16 -translate-y-1/2 bg-gradient-to-l from-white/70 to-transparent" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgba(0,0,0,0.65)_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:36px_36px]" />
    </div>
  );
}
