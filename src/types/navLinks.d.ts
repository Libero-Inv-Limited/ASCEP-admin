interface NavLinkType {
  title: string;
  path: string;
  Icon?: JSX.Element;
  module?: string;
  privilege?: string;
}

interface Breadcrumb {
  label: string;
  link?: string;
}
