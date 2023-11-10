import { Input } from './ui/input';

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
  return (
    <div
      className={`${addOnClasses} flex relative min-h-[56px] grow w-full items-center gap-4`}
    >
      <div className="relative flex items-center min-h-[45px] grow gap-1 rounded-sm px-4">
        <div className="w-full border border-black/20 dark:border-white/30 flex items-center rounded-md">
          <Input
            type="text"
            placeholder={placeHolder}
            // value=""
            className="paragraph-regular placholder border-none shadow-none outline-none no-focus dark:text-white"
          />
          {icontype}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
