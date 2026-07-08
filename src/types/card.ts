export const cardCategories = [
  "基础技术卡",
  "错误纠正卡",
  "训练任务卡",
  "双打战术卡",
  "单打战术卡",
  "发接发卡",
  "网前技术卡",
  "搞笑互动卡"
] as const;

export type CardCategory = (typeof cardCategories)[number];

export type TechniqueCard = {
  id: string;
  category: CardCategory;
  title: string;
  subtitle: string;
  skillPoint: string;
  mistake: string;
  task: string;
  videoHook: string;
};
