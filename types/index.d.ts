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
