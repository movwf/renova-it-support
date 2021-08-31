// =====>  RequestTable

export interface IRowData {
  id: string;
  product: string;
  requestId: string;
  time: string;
  status: string;
}

export interface IHeaderData {
  key: string;
  header: string;
}

export interface IRequestTable {
  rowData: IRowData[];
}

// =====> Edit Modal

export interface IEditModal {
  open: boolean;
  show: React.Dispatch<React.SetStateAction<boolean>>;
  id: String | null;
}
