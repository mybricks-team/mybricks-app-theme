
export type Data = {
  themeId: string;
  themeConfig: Record<string, string>;
};
export interface Theme {
  get: (val: string) => string;
  set: (id: string, val: string) => void;
  remove: (val: string) => void;
}
export interface ThemeConfig {
  id: string;
  title: string;
  isSeed?: boolean;
  desc?: string;
  colorListIndex?: number;
  items?: ThemeConfig[]
}

export type PluginProps = {
  data: Data;
  theme: Theme;
  pageStyle: any;
};

export interface ThemeValue {
  id: string;
  title?: string;
  value: Record<string, string>;
}