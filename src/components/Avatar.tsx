import { identicon } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

type AvatarProps = {
  seed: string;
  size?: "small" | "medium" | "large" | "text";
};

export const SIZES = {
  small: 24,
  medium: 32,
  large: 72,
  text: "1em",
};

export const Avatar = ({ seed, size = "small" }: AvatarProps) => {
  const avatar = createAvatar(identicon, {
    seed,
    radius: 99999,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    size: SIZES[size]!,
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: avatar.toString() }}
      className="rounded-full border border-white/20 p-2"
    />
  );
};
