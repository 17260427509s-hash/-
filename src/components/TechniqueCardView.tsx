import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import type { TechniqueCard } from "@/types/card";

type TechniqueCardViewProps = {
  card: TechniqueCard;
  isDrawing: boolean;
  rollingTitle: string;
};

function DetailBlock({ label, value, tone }: { label: string; value: string; tone: "gold" | "cyan" | "red" }) {
  const color = { gold: "text-gold-300", cyan: "text-cyanfire", red: "text-dangerline" }[tone];
  return (
    <div className="rounded-xl border border-white/10 bg-court-950/35 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <p className={`mb-1 text-[11px] font-black ${color}`}>{label}</p>
      <p className="text-[13px] font-bold leading-relaxed text-white/88">{value}</p>
    </div>
  );
}

export function TechniqueCardView({ card, isDrawing, rollingTitle }: TechniqueCardViewProps) {
  const displayTitle = isDrawing ? rollingTitle : card.title;
  return (
    <div className="perspective-card relative w-full px-5">
      <motion.article
        animate={isDrawing ? { rotateY: [0, 180, 360, 540, 720], rotateZ: [0, -2, 2, -1, 0], scale: [1, 1.04, 0.98, 1.02, 1] } : { rotateY: 0, rotateZ: 0, scale: 1 }}
        className="glass-panel preserve-3d relative mx-auto min-h-[520px] overflow-hidden rounded-[28px] p-5 shadow-card"
        transition={{ duration: isDrawing ? 1.5 : 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.20),transparent_18%,transparent_64%,rgba(248,201,91,0.12))]" />
        <div className="absolute -right-16 -top-14 h-36 w-36 rounded-full bg-cyanfire/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden opacity-45">
          <span className="absolute left-[-40%] top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan" />
        </div>
        <div className="relative z-10 flex min-h-[480px] flex-col">
          <div className="mb-5 flex items-center justify-between">
            <span className="rounded-full border border-gold-300/50 bg-gold-300/15 px-3 py-1 text-[11px] font-black text-gold-300">{card.category}</span>
            <span className="flex items-center gap-1 text-[11px] font-black text-cyanfire"><Zap size={14} strokeWidth={3} />TODAY DRILL</span>
          </div>
          <div className="mb-5">
            <motion.h2
              className="text-balance text-[46px] font-black leading-[0.98] text-white drop-shadow-[0_0_22px_rgba(248,201,91,0.24)]"
              key={displayTitle}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.18 }}
            >
              {displayTitle}
            </motion.h2>
            <p className="mt-3 text-lg font-black text-gold-300">{card.subtitle}</p>
          </div>
          <div className="grid flex-1 gap-3">
            <DetailBlock label="技术重点" tone="gold" value={card.skillPoint} />
            <DetailBlock label="常见错误" tone="red" value={card.mistake} />
            <DetailBlock label="今日训练任务" tone="cyan" value={card.task} />
          </div>
          <div className="mt-5 rounded-2xl border border-gold-300/30 bg-gradient-to-r from-gold-300/18 to-cyanfire/10 p-4">
            <p className="text-[11px] font-black text-gold-300">开场钩子</p>
            <p className="mt-1 text-base font-black leading-snug text-white">{card.videoHook}</p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
