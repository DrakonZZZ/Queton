import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterProps {
  options: { name: string; value: string }[];
  containerClasses?: string;
  addOnClasses: string;
}

const Filter = ({ options, containerClasses, addOnClasses }: FilterProps) => {
  return (
    <div className={`${containerClasses} relative px-4 md:px-0`}>
      <Select>
        <SelectTrigger
          className={`${addOnClasses} border-black/20 text-black/50 dark:border-white/30 dark:text-white`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Filter Selection" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((item, idx) => {
              const { name, value } = item;
              return (
                <SelectItem key={idx} value={value}>
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
