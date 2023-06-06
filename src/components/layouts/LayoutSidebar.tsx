import {
  IconCircleFilled,
  IconDiamondFilled,
  IconFlame,
  IconLogout,
  IconMoneybag,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ButtonLink } from "../Button";

type LayoutSidebarProps = {
  children: React.ReactNode;
};

const SidebarLink = ({
  icon,
  isActive,
  children,
  href,
}: {
  isActive: boolean;
  children: string;
  href: string;
  icon: React.ReactNode;
}) => (
  <li
    className={classNames({
      "font-bold text-green-600": isActive,
    })}
  >
    <ButtonLink
      href={href}
      variant="text"
      reverse
      icon={icon}
      className="text-xl"
    >
      <span className="text-base">{children}</span>
    </ButtonLink>
  </li>
);

const Sidebar = () => {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <aside
      className={classNames(
        "fixed bottom-0 left-0 top-0 w-48 px-2 py-4 text-white heropattern-topography-white/10"
      )}
    >
      <nav className="flex h-full flex-col justify-between">
        <ul className="m-0 flex flex-col items-start justify-center">
          <SidebarLink
            icon={<IconFlame size="2em" className="text-inherit" />}
            isActive={isActive("/")}
            href="/"
          >
            Buy
          </SidebarLink>

          <SidebarLink
            icon={<IconMoneybag size="2em" className="text-inherit" />}
            isActive={isActive("/sell")}
            href="/sell"
          >
            Sell
          </SidebarLink>

          <SidebarLink
            icon={<IconDiamondFilled size="2em" className="text-inherit" />}
            isActive={isActive("/my-items")}
            href="/my-items"
          >
            Owned
          </SidebarLink>
        </ul>

        <ul className="m-0 flex flex-col items-start justify-center">
          <SidebarLink
            icon={<IconUser size="2em" className="text-inherit" />}
            isActive={isActive("/settings")}
            href="/settings"
          >
            Profile
          </SidebarLink>

          <IconCircleFilled size="0.5em" className="mx-auto my-3 font-bold" />

          <SidebarLink
            icon={<IconSettings size="2em" className="text-inherit" />}
            isActive={isActive("/settings")}
            href="/settings"
          >
            Settings
          </SidebarLink>

          <SidebarLink
            href="/"
            isActive={isActive("/logout")}
            icon={<IconLogout size="2em" className="text-inherit" />}
          >
            Logout
          </SidebarLink>
        </ul>
      </nav>
    </aside>
  );
};

export const LayoutSidebar = ({ children }: LayoutSidebarProps) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <div className="flex">
        <Sidebar />
        <div className="w-48"></div>
        <div className="flex flex-grow flex-col overflow-hidden rounded-tl-3xl bg-black py-10">
          {children}
        </div>
      </div>
    </div>
  );
};
