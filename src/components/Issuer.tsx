import React from "react";
import useSWR from "swr";
import Link from "next/link";
import { Image } from "react-bootstrap";

import { User as UserIcon } from "react-feather";

import { fetchProfile } from "@lib/cesium";

type IssuerPropTypes = {
  pubKey: string;
  imageWidth?: number;
};

export const Issuer: React.FC<IssuerPropTypes> = ({
  pubKey,
  imageWidth = 30,
}) => {
  const { data: profile, error } = useSWR(`profile-${pubKey}`, () =>
    fetchProfile(pubKey)
  );
  if (error || !profile || !profile._source) return null;

  const avatar = profile._source.avatar ? (
    <Image
      src={`data:${profile._source.avatar._content_type};base64,${profile._source.avatar._content}`}
      width={imageWidth}
      rounded
    />
  ) : (
    <UserIcon width={imageWidth} />
  );

  return (
    <Link href={`/pubkey/${profile._source.issuer}`}>
      <a>
        {avatar}&nbsp;{profile._source.title}
      </a>
    </Link>
  );
};
