import { BiSearch } from 'react-icons/bi';
import { Input } from '../ui/input';

const Search = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="relative flex items-center min-h-[45px] grow gap-1 rounded-sm px-4">
        <div className="w-full border-b border-black/30 dark:border-white/50 flex items-center">
          <Input
            type="text"
            placeholder="Search..."
            // value=""
            className="paragraph-regular placholder border-none shadow-none outline-none no-focus"
          />
          <BiSearch className="cursor pointer dark:fill-white" />
        </div>
      </div>
    </div>
  );
};

export default Search;
