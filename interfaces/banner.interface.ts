export interface Banner {
  _id?: string;
  title: string;
  description: string;
  image_desktop: string;
  image_mobile: string;
  isActive?: boolean;
  type: string;
  ctaUrl: string;
}
