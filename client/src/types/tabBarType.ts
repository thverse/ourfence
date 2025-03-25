export interface TabBarItem {
  id: string;
  label: string;
}

export interface TabBarProps {
  items: TabBarItem[];
  initialActiveTab?: string;
  className?: string;
}
