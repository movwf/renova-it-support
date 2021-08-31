export interface IProgressBar {
  stepData: {
    id: number;
    label: string;
    description: string;
    secondaryLabel: string;
  }[];
  currentIndex: number;
  vertical?: boolean;
}
