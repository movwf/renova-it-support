export interface IValueText {
  style?: {
    [key: string]: string;
  };
  propertyWidth?: string;
  propertyText: string;
  valueText?: string;
  children?: JSX.Element;
}
