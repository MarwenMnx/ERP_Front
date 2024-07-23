export type NavigationItem =
  | NavigationLink
  | NavigationDropdown
  | NavigationSubheading
  | null;

export interface NavigationLink {
  type: 'link';
  id?: string | any;
  route: string | any;
  fragment?: string;
  label: string;
  icon?: string;
  routerLinkActiveOptions?: { exact: boolean };
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
}

export interface NavigationDropdown {
  type: 'dropdown';
  id?: string;
  label: string;
  icon?: string;
  children: Array<NavigationLink | NavigationDropdown | null>;
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
}

export interface NavigationSubheading {
  type: 'subheading';
  label: string;
  children: Array<NavigationLink | NavigationDropdown | null>;
}
