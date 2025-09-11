export interface StatData {
  id: string;
  value: number;
  description: string;
  unit: string;
  startVal?: number;
  prefix?: string;
}

export interface Partner {
  name: string;
  desktopImage: string;
  mobileImage?: string;
  width: number;
  height: number;
  mobileWidth?: number;
  mobileHeight?: number;
  url?: string;
}

export interface LeadershipMember {
  name: string;
  position: string;
  description: string;
  imageSrc: string;
}
