import { identicon } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

type AvatarProps = {
  seed: string;
  size?: "small" | "medium" | "large";
};

const SIZES = {
  small: 24,
  medium: 32,
  large: 48,
};

export const Avatar = ({ seed, size = "small" }: AvatarProps) => {
  const avatar = createAvatar(identicon, {
    seed,
    radius: SIZES[size] * 2,
    size: SIZES[size],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: avatar.toString() }}
      className="rounded-full border border-white/20 p-2"
    />
  );
};
