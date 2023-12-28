import { LEVEL_RANGE } from '@/constants/filters';

export interface SidebarLink {
  route: string;
  label: string;
  icon: React.ReactNode;
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface ParamsProps {
  params: { id: string };
}

export interface LevelRange {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export type LevelRangeType = keyof typeof LEVEL_RANGE;
