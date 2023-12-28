'use client';

import { BiSearch } from 'react-icons/bi';
import { Input } from '../ui/input';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { removeQueryKeys, searchQuery } from '@/lib/query';
import GlobalSearchResult from '../GlobalSearchResult';

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [search, setSearch] = useState(query || '');
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const searchContainerClose = (e: any) => {
      if (
        searchContainerRef.current && // @ts-ignore
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSearch('');
      }
    };

    setIsOpen(false);

    document.addEventListener('click', searchContainerClose);

    return () => document.removeEventListener('click', searchContainerClose);
  }, [pathname]);

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      if (search) {
        const urlChange = searchQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search,
        });

        router.push(urlChange, { scroll: false });
      } else {
        if (query) {
          const urlUpdate = removeQueryKeys({
            params: searchParams.toString(),
            removekeys: ['global', 'type'],
          });

          router.push(urlUpdate, { scroll: false });
        }
      }
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [search, searchParams, router, pathname, query]);
  return (
    <div
      ref={searchContainerRef}
      className="relative w-full max-w-[600px] max-lg:hidden"
    >
      <div className="relative flex items-center min-h-[45px] grow gap-1 rounded-sm px-4">
        <div className="w-full border-b border-black/30 dark:border-white/50 dark:text-white flex items-center">
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!isOpen) setIsOpen(true);
              if (e.target.value === '' && isOpen) {
                setIsOpen(false);
              }
            }}
            className="paragraph-regular placholder border-none shadow-none outline-none no-focus"
          />
          <BiSearch className="cursor pointer dark:fill-white" />
        </div>
      </div>
      {isOpen && <GlobalSearchResult />}
    </div>
  );
};

export default Search;
