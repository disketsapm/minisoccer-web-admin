export type SelectOption = {
  label: string;
  value: any;
};

export type SelectOptions = SelectOption[];

export interface BaseResponse<T> {
  results: T;
}
