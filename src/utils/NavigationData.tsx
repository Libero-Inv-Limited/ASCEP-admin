import {
  TrendUp,
  Messages1,
  Profile2User,
  Setting2,
  TickSquare,
  Facebook,
  Youtube,
  User,
} from "iconsax-react";

export const DemocracyLinks: NavLinkType[] = [
  {
    title: "Debates",
    path: "/democracy/debates",
  },
  {
    title: "Initiatives",
    path: "/democracy/initiatives",
  },
  {
    title: "Proposals",
    path: "/democracy/proposals",
  },
  {
    title: "Voting",
    path: "#",
  },
  {
    title: "Participatory Budgeting",
    path: "#",
  },
  {
    title: "SDG",
    path: "/democracy/sdg",
  },
];
export const FooterLinks: NavLinkType[] = [
  {
    title: "About us",
    path: "#",
  },
  {
    title: "Contact us",
    path: "#",
  },
  {
    title: "Services",
    path: "#",
  },
  {
    title: "F.A.Qs",
    path: "#",
  },
];

// DO NOT CHANGE WITHOUT CAREFUL REVIEW
export const sidebarLinks: NavLinkType[] = [
  {
    title: "Main",
    Icon: <TrendUp size={25} />,
    path: "/main",
    module: "main",
    privilege: 'access dashboard module',
  },
  {
    title: "Users",
    Icon: <User size={25} />,
    path: "/users",
    module: "users",
    privilege: 'access users module'
  },
  {
    title: "Updates",
    Icon: <Messages1 size={25} />,
    path: "/response",
    module: "response",
    privilege: 'access updates module'
  },
  {
    title: "Dialogue",
    Icon: <Profile2User size={25} />,
    path: "/dialogue",
    module: "dialogue",
    privilege: 'access dialogue module'
  },
  {
    title: "Governance",
    Icon: <TickSquare size={25} />,
    path: "/democracy",
    module: "democracy",
    privilege: 'access governance module'
  },
  {
    title: "Settings",
    Icon: <Setting2 size={25} />,
    path: "/settings",
    module: "settings",
    privilege: 'access settings module'
  },
];
export const SocialLinks: NavLinkType[] = [
  {
    title: "Facebook",
    path: "#",
    Icon: <Facebook />,
  },
  {
    title: "X",
    path: "#",
    Icon: <Facebook />,
  },
  {
    title: "Youtube",
    path: "#",
    Icon: <Youtube />,
  },
  {
    title: "Linkedin",
    path: "#",
    Icon: <Facebook />,
  },
];
