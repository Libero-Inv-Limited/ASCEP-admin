interface SDGData {
  id: number;
  title: string;
  description: string;
  official_link: string;
  banner: string;
  sdgTarget: SdgTarget[];
}

interface SdgTarget {
  id: number;
  code: string;
  description: string;
  sdgs_id: number;
}

interface SelectOption {
  value: string;
  label: string;
}

interface CollectionData {
  id: number;
  name: string;
  description: string;
  type: string;
}

interface MultiSelectData {
  id: number | string;
  name: string;
}

interface SelectedImage {
  image: File;
  byteArray: ArrayBuffer | string | null;
}

interface MetaDataType {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: any;
  previous_page_url: any;
}

interface CategoryType {
  id: number;
  name: string;
  description: string;
  type: string;
}
