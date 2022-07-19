// 接口返回结构
export interface ResponseBodyType {
  code: number;
  message: string;
  type?: string;
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

// 列表数据 data 部分
export interface ResponseDetailDataType {
  [key: string]: any;
}

// 接口列表返回结构
export interface ResponseListType extends ResponseBodyType {
  code: number;
  message: string;
  type?: string;
  data?: ResponseListDataType;
}

// 接口列表返回结构
export interface ResponseDetailType extends ResponseBodyType {
  code: number;
  message: string;
  type?: string;
  data?: ResponseDetailDataType;
}

export interface ResponseAllType extends ResponseBodyType {
  code: number;
  message: string;
  type?: string;
  data?: ResponseDetailDataType[];
}
