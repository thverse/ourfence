"use client";

import { Bell, Home, MessageSquare, Search, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import PostDialog from "@/modules/posts/components/PostDialog";
import LeftSideBarMenuSection from "../leftSideBar/LeftSideBarMenuSection";

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
      <LeftSideBarMenuSection />
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
