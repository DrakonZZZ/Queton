'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { removeQueryKeys, searchQuery } from '@/lib/query';

interface SearchbarProps {
  route: string;
  addOnClasses: string;
  iconCord: string;
  placeHolder: string;
  icontype: React.ReactNode;
}

const Searchbar = ({
  route,
  addOnClasses,
  iconCord,
  placeHolder,
  icontype,
}: SearchbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [search, setSearch] = useState(query || '');

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      if (search) {
        const urlChange = searchQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search,
        });

        router.push(urlChange, { scroll: false });
      } else {
        if (pathname === route) {
          const urlUpdate = removeQueryKeys({
            params: searchParams.toString(),
            removekeys: ['q'],
          });

          router.push(urlUpdate, { scroll: false });
        }
      }
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [search, searchParams, router, pathname, query]);

  return (
    <div
      className={`${addOnClasses} flex relative min-h-[56px] grow w-full items-center gap-4`}
    >
      <div className="relative flex items-center min-h-[45px] grow gap-1 rounded-sm px-4">
        <div className="w-full border border-black/20 dark:border-white/30 flex items-center rounded-md">
          <Input
            type="text"
            placeholder={placeHolder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="paragraph-regular placholder border-none shadow-none outline-none no-focus dark:text-white"
          />
          {icontype}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
