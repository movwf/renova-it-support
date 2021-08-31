export interface IFormObject {
  [key: string]: any;
}

export interface IFormData extends IFormObject {
  barIndex: number;
}

export interface IFormProvider {
  children: JSX.Element;
}
