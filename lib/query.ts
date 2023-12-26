import qs from 'query-string';

interface SearchQueryProps {
  params: string;
  key: string;
  value: string | null;
}

export const searchQuery = ({ params, key, value }: SearchQueryProps) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
};

interface RemoveQueryProps {
  params: string;
  removekeys: string[];
}

export const removeQueryKeys = ({ params, removekeys }: RemoveQueryProps) => {
  const currentUrl = qs.parse(params);
  removekeys.forEach((key) => delete currentUrl[key]);

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
};
