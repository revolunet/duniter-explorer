import type { Profile } from "../types/cesium";

const G1_DATA_NODE_URL =
  process.env.G1_DATA_NODE_URL || `https://g1.data.le-sou.org`;

type EsProfile = {
  _source: Profile;
};

export const fetchProfile = (pubKey: string): Promise<EsProfile> =>
  fetch(`${G1_DATA_NODE_URL}/user/profile/${pubKey}`).then((r) => r.json());
