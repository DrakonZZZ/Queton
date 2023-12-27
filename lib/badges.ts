import { LEVEL_RANGE } from '@/constants/filters';
import { LevelRange } from '@/types';

interface BadgeProps {
  range: {
    type: keyof typeof LEVEL_RANGE;
    count: number;
  }[];
}

const assignBadges = (params: BadgeProps) => {
  const levelTypeCount: LevelRange = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { range } = params;

  range.forEach((item) => {
    const { type, count } = item;
    const levelCategory: any = LEVEL_RANGE[type];

    Object.keys(levelCategory).forEach((lvl: any) => {
      if (count >= levelCategory[lvl]) {
        levelTypeCount[lvl as keyof LevelRange] += 1;
      }
    });
  });

  return levelTypeCount;
};

export default assignBadges;
