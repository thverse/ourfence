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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import PostBox from "../PostBox";

const user = {
  name: "기마디",
  username: "kim",
  profileImage: "/tb.png",
};

const LeftSideBar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 p-4 sticky top-0 h-screen">
      {/* LEFT-HEADER */}
      <div className="flex justify-center items-center flex-col border-b-2">
        <div className="text-3xl font-bold pb-10">Ourfence</div>
        <div className="flex flex-col justify-center items-center">
          <Avatar>
            <AvatarImage
              src={user.profileImage}
              alt={user.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="font-bold pt-2">{user.name}</div>
        </div>
        <div className="flex justify-between items-center pt-5 pb-5 w-full">
          <div className="flex flex-col items-center">
            <div className="font-bold text-xl">1</div>
            <div>post</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-bold text-xl">1</div>
            <div>followers</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-bold text-xl">1</div>
            <div>following</div>
          </div>
        </div>
      </div>
      {/* LEFT-NAVBAR */}
      <nav className="flex flex-col gap-8 p-5 items-start">
        <Link href="/">
          <Button variant="ghost" className="flex gap-2 text-2xl">
            <Home size={20} /> HOME
          </Button>
        </Link>
        <Button variant="ghost" className="flex gap-2 text-2xl">
          <Search size={20} /> EXPORE
        </Button>
        <Link href="/notification">
          <Button variant="ghost" className="flex gap-2 text-2xl">
            <Bell size={20} /> NOTIFICATION
          </Button>
        </Link>
        <Button variant="ghost" className="flex gap-2 text-2xl">
          <MessageSquare size={20} /> MESSAGE
        </Button>
        <Link href="/about">
          <Button variant="ghost" className="flex gap-2 text-2xl">
            <User size={20} /> PROFILE
          </Button>
        </Link>
      </nav>
      <PostBox />
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
