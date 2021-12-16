// 接口返回结构
export interface ResponseType {
  code: number;
  message: string;
  data?: any;
}

export interface ResponsePageInfoDataType {
  total: number;
  pageSize: number;
  pageNo: number;
}

// 列表数据 data 部分
export interface ResponseListDataType {
  total: number;
  pageSize: number;
  pageNo: number;
  rows: any[];
}

// 接口列表返回结构
export interface ResponseListType extends ResponseType {
  code: number;
  message: string;
  data?: ResponseListDataType;
}
