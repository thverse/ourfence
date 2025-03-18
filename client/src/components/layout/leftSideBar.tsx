import {
  Bell,
  Calendar,
  Home,
  Inbox,
  MessageSquare,
  Search,
  Settings,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/about",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/",
    icon: Settings,
  },
];

const LeftSideBar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 p-4 sticky top-0 h-screen">
      <nav className="flex flex-col gap-8">
        <Button variant="ghost" className="flex gap-2 text-2xl">
          <Home size={20} /> HOME
        </Button>
        <Button variant="ghost" className="flex gap-2 text-2xl">
          <Search size={20} /> EXPORE
        </Button>
        <Button variant="ghost" className="flex gap-2 text-2xl">
          <Bell size={20} /> NOTIFICATION
        </Button>
        <Button variant="ghost" className="flex gap-2 text-2xl">
          <MessageSquare size={20} /> MESSAGE
        </Button>
        <Button variant="ghost" className="flex gap-2 text-2xl">
          <User size={20} /> PROFILE
        </Button>
      </nav>
    </aside>
  );
};
// const LeftSideBar = () => {
//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Ourfence</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// };

export default LeftSideBar;
