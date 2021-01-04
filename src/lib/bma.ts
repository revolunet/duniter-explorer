// https://github.com/duniter/duniter-bma/blob/master/doc/API.md

import type { Certifications } from "../types/bma";

const BMA_ENDPOINT = process.env.BMA_ENDPOINT || "https://g1.cgeek.fr";

type FetchCertificationsArgs = {
  pubKey: string;
  direction: "received" | "sent";
};

export const fetchCertifications = ({
  pubKey,
  direction,
}: FetchCertificationsArgs): Promise<Certifications> => {
  const path = direction === "received" ? "certifiers-of" : "certified-by";
  return fetch(`${BMA_ENDPOINT}/wot/${path}/${pubKey}`)
    .then((r) => r.json())
    .then((r) => {
      if (r.ucode === 1002) {
        // return empty certifications on error
        return {
          certifications: [],
        };
      }
      return r;
    });
};
