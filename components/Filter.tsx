'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { searchQuery } from '@/lib/query';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterProps {
  options: { name: string; value: string }[];
  containerClasses?: string;
  addOnClasses: string;
}

const Filter = ({ options, containerClasses, addOnClasses }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get('filter');

  const handleOptionChange = (item: string) => {
    const newUrl = searchQuery({
      params: searchParams.toString(),
      key: 'filter',
      value: item,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`${containerClasses} relative px-4 md:px-0`}>
      <Select
        onValueChange={(value) => handleOptionChange(value)}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger
          className={`${addOnClasses} border-black/20 text-black/50 dark:border-white/30 dark:text-white`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Filter Selection" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-black dark:text-white dark:border-white/20">
          <SelectGroup>
            {options.map((item, idx) => {
              const { name, value } = item;
              return (
                <SelectItem
                  key={idx}
                  value={value}
                  className="focus:bg-black/90 focus:text-white dark:focus:bg-white dark:focus:text-black cursor-pointer "
                >
                  {name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
