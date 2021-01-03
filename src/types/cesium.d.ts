export type Profile = {
  hash: string;
  signature: string;
  title: string;
  description: string;
  address: string;
  city: string;
  geoPoint: GeoPoint;
  socials: Social[];
  time: number;
  issuer: string;
  version: number;
  tags: string[];
  avatar: Avatar;
};

export type GeoPoint = {
  lat: number;
  lon: number;
};

export type Social = {
  type: string;
  url: string;
};

export interface Avatar {
  _content_type: string;
  _content: string;
}
