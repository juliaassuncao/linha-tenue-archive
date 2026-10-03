import type { MediaAssetProps, SocialAccountProps } from "@/constants/props";

export interface SocialProfileProps {
  account: SocialAccountProps;
  avatar: MediaAssetProps;
  banner: MediaAssetProps;
}