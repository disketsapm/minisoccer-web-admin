export interface Field {
  _id?: string;
  yardName: string;
  yardSize: string;
  yardDesc: string;
  yardCapacity: string;
  yardFacilities: string[];
  yardLocationUrl: string;
  assets?: {
    image: string;
    heroImage: string;
    showcase: string;
  }[];
}
