export interface Field {
  _id?: string;
  yardName: string;
  yardSize: string;
  yardCapacity: string;
  yardLocationUrl: string;
  yardFacilities: {
    iconId: string;
    name: string;
  }[];
}
