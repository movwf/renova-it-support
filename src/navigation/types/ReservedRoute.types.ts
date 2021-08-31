export interface IReservedRoute {
  component: React.ElementType;
  path: string;
  reservedRoutes?: string[];
  redirect: string;
  [prop: string]: any;
}
