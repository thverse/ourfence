"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LeftSideBarMenuSection from "../leftSideBar/LeftSideBarMenuSection";
import LeftSideBarHeader from "../leftSideBar/LeftSideBarHeader";

const user = {
  name: "기마디",
  username: "kim",
  profileImage: "/tb.png",
};

const LeftSideBar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 p-4 sticky top-0 h-screen">
      {/* LEFT-HEADER */}
      <LeftSideBarHeader />
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
