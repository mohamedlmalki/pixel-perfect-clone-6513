import { useState } from "react";
import { CheckCircle, FileText, Plus, Minus, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { title: "Single Verification", url: "/", icon: CheckCircle },
  { title: "Bulk Verification", url: "/bulk", icon: FileText },
];

const recentUsers = [
  { id: 1, name: "User 1", avatar: "" },
  { id: 2, name: "User 2", avatar: "" },
  { id: 3, name: "User 3", avatar: "" },
  { id: 4, name: "User 4", avatar: "" },
  { id: 5, name: "User 5", avatar: "" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent/50";

  return (
    <Sidebar
      className={state === "collapsed" ? "w-14" : "w-72"}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-semibold text-sidebar-foreground">
            {state === "expanded" && "Emailable Verify"}
          </h1>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-sm font-medium mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full justify-start">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-sm font-medium mb-2">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="bg-sidebar-accent rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sidebar-accent-foreground font-medium">Marketing Team</span>
                <div className="w-2 h-2 bg-success rounded-full"></div>
              </div>
              <div className="text-sidebar-foreground/70 text-sm mb-2">acct_7g3A</div>
              <div className="text-success text-sm mb-3">• Active</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
                  Remove Account
                </Button>
                <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary-muted">
                  Add New Account
                </Button>
              </div>
            </div>
            <div className="text-sidebar-accent-foreground text-sm mb-3 flex items-center">
              <CheckCircle className="w-3 h-3 text-success mr-2" />
              Connected
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Users */}
        {state === "expanded" && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/60 text-sm font-medium mb-2">
              Recent Users
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex space-x-2">
                {recentUsers.map((user) => (
                  <Avatar key={user.id} className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}