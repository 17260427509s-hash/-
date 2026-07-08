import { cardCategories, type CardCategory } from "@/types/card";

type CategoryTabsProps = {
  value: CardCategory;
  onChange: (category: CardCategory) => void;
  disabled?: boolean;
};

export function CategoryTabs({ value, onChange, disabled }: CategoryTabsProps) {
  return (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto px-5 py-2" data-html2canvas-ignore="true">
      {cardCategories.map((category) => {
        const isActive = category === value;
        return (
          <button
            className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-black transition ${
              isActive ? "border-gold-300 bg-gold-300 text-court-950 shadow-glow" : "border-white/12 bg-white/[0.07] text-white/72"
            }`}
            disabled={disabled}
            key={category}
            onClick={() => onChange(category)}
            type="button"
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
