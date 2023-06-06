import { IconChevronRight } from "@tabler/icons-react";
import classNames from "classnames";
import Link from "next/link";

type ButtonVariant = "text" | "filled";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
};

export const ButtonLink = ({
  children,
  href,
  variant = "filled",
}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={classNames(
        "flex items-center rounded-full px-4 py-2 pr-2 text-xs font-semibold uppercase tracking-wide",
        {
          "bg-purple-800/80 text-white/80": variant === "filled",
        }
      )}
    >
      {children}

      <IconChevronRight className="m-0 select-none" />
    </Link>
  );
};
