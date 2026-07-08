"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Copy, Download, RefreshCw, Sparkles, X } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { ArenaBackground } from "@/components/ArenaBackground";
import { CategoryTabs } from "@/components/CategoryTabs";
import { TechniqueCardView } from "@/components/TechniqueCardView";
import { techniqueCards } from "@/data/cards";
import { cardCategories, type CardCategory } from "@/types/card";

const DRAW_DURATION = 1500;

function pickRandomIndex(length: number, previousIndex: number) {
  if (length <= 1) return 0;
  let next = Math.floor(Math.random() * length);
  while (next === previousIndex) next = Math.floor(Math.random() * length);
  return next;
}

export default function Home() {
  const [category, setCategory] = useState<CardCategory>(cardCategories[0]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isRecordingMode, setIsRecordingMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [rollingTitle, setRollingTitle] = useState("今日宜杀球");
  const [notice, setNotice] = useState("");
  const stageRef = useRef<HTMLDivElement>(null);

  const currentDeck = useMemo(() => techniqueCards.filter((card) => card.category === category), [category]);
  const currentCard = currentDeck[Math.min(cardIndex, currentDeck.length - 1)];

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 1800);
  };

  const drawCard = () => {
    if (isDrawing || currentDeck.length === 0) return;
    setIsDrawing(true);
    const titles = currentDeck.map((card) => card.title);
    let tick = 0;
    const interval = window.setInterval(() => {
      tick += 1;
      setRollingTitle(titles[tick % titles.length]);
    }, 80);

    window.setTimeout(() => {
      window.clearInterval(interval);
      const nextIndex = pickRandomIndex(currentDeck.length, cardIndex);
      setCardIndex(nextIndex);
      setRollingTitle(currentDeck[nextIndex].title);
      setHasDrawn(true);
      setIsDrawing(false);
    }, DRAW_DURATION);
  };

  const handleCategoryChange = (nextCategory: CardCategory) => {
    setCategory(nextCategory);
    setCardIndex(0);
    setHasDrawn(false);
    setRollingTitle(techniqueCards.find((card) => card.category === nextCategory)?.title ?? "");
  };

  const copyTitle = async () => {
    const title = currentCard.videoHook || `抽到这张卡，今天必须练${currentCard.title.replace("今日宜", "")}`;
    try {
      await navigator.clipboard.writeText(title);
      showNotice("视频标题已复制");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = title;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showNotice("视频标题已复制");
    }
  };

  const saveStage = async () => {
    if (!stageRef.current) return;
    const wasRecording = isRecordingMode;
    setIsExporting(true);
    setIsRecordingMode(true);
    await new Promise<void>((resolve) => window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve())));

    const html2canvas = (await import("html2canvas")).default;
    const rect = stageRef.current.getBoundingClientRect();
    const scale = 1080 / rect.width;
    try {
      const canvas = await html2canvas(stageRef.current, {
        backgroundColor: null,
        scale,
        useCORS: true,
        windowWidth: Math.round(rect.width),
        windowHeight: Math.round(rect.height)
      });
      const link = document.createElement("a");
      link.download = `羽毛球今日技术卡-${currentCard.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      showNotice("PNG 已保存");
    } finally {
      setIsRecordingMode(wasRecording);
      setIsExporting(false);
    }
  };

  return (
    <main className="flex min-h-svh items-center justify-center bg-court-950 text-white">
      <section
        className="recording-stage relative isolate overflow-hidden shadow-[0_0_90px_rgba(0,0,0,0.65)]"
        onClick={() => {
          if (isRecordingMode) drawCard();
        }}
        ref={stageRef}
      >
        <ArenaBackground isDrawing={isDrawing} />
        <div className="relative z-10 flex h-full flex-col">
          <AnimatePresence>
            {!isRecordingMode && (
              <motion.header className="px-5 pt-8 text-center" data-html2canvas-ignore="true" exit={{ opacity: 0, y: -20 }} initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-[32px] font-black leading-tight text-white drop-shadow-[0_0_24px_rgba(248,201,91,0.32)]">今日羽毛球技术卡</h1>
                <p className="mt-2 text-sm font-bold text-cyanfire/90">抽一张，决定今天练什么</p>
              </motion.header>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isRecordingMode && (
              <motion.div className="mt-3" data-html2canvas-ignore="true" exit={{ opacity: 0, y: -12 }} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                <CategoryTabs disabled={isDrawing} onChange={handleCategoryChange} value={category} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`flex flex-1 items-center ${isRecordingMode ? "pb-12 pt-16" : "pb-4 pt-4"}`}>
            <TechniqueCardView card={currentCard} isDrawing={isDrawing} rollingTitle={rollingTitle} />
          </div>

          <AnimatePresence>
            {!isRecordingMode && (
              <motion.div className="px-5 pb-6" data-html2canvas-ignore="true" exit={{ opacity: 0, y: 24 }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
                <ActionButton className="mb-3 w-full text-base" disabled={isDrawing} icon={hasDrawn ? <RefreshCw size={18} strokeWidth={3} /> : <Sparkles size={18} strokeWidth={3} />} onClick={drawCard} variant="primary">
                  {hasDrawn ? "重新抽一张" : "开始抽卡"}
                </ActionButton>
                <div className="grid grid-cols-3 gap-2">
                  <ActionButton icon={<Camera size={16} strokeWidth={3} />} onClick={() => setIsRecordingMode(true)}>拍摄模式</ActionButton>
                  <ActionButton icon={<Download size={16} strokeWidth={3} />} onClick={saveStage}>保存图片</ActionButton>
                  <ActionButton icon={<Copy size={16} strokeWidth={3} />} onClick={copyTitle}>复制标题</ActionButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isRecordingMode && !isExporting && (
            <button aria-label="退出拍摄模式" className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/80 backdrop-blur-md" data-html2canvas-ignore="true" onClick={(event) => { event.stopPropagation(); setIsRecordingMode(false); }} type="button">
              <X size={18} />
            </button>
          )}

          <AnimatePresence>
            {notice && (
              <motion.div className="absolute bottom-24 left-1/2 z-30 -translate-x-1/2 rounded-full border border-gold-300/40 bg-black/55 px-4 py-2 text-sm font-black text-gold-300 backdrop-blur-md" data-html2canvas-ignore="true" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
                {notice}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
