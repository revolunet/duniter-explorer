export interface Certifications {
  pubkey: string;
  uid: string;
  sigDate: string;
  isMember: boolean;
  certifications: Certification[];
}

export interface Certification {
  pubkey: string;
  uid: string;
  isMember: boolean;
  wasMember: boolean;
  cert_time: CertTime;
  sigDate: string;
  written: Written;
  signature: string;
}

export interface CertTime {
  block: number;
  medianTime: number;
}

export interface Written {
  number: number;
  hash: string;
}

export interface WotMembers {
  results: WotMember[];
}

export interface WotMember {
  pubkey: string;
  uid: string;
}
