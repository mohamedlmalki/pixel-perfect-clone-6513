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
import { cn } from "@/lib/utils";

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
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25" 
      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground";

  return (
    <Sidebar
      className={cn(
        "transition-all duration-300 ease-in-out border-r border-sidebar-border/50",
        state === "collapsed" ? "w-14" : "w-72"
      )}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar/95 backdrop-blur-sm">
        {/* Enhanced Header */}
        <div className="p-6 border-b border-sidebar-border/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-muted rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            {state === "expanded" && (
              <div className="animate-fade-in">
                <h1 className="text-xl font-bold text-sidebar-foreground">Emailable</h1>
                <p className="text-xs text-sidebar-foreground/70">Verify</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Navigation */}
        <SidebarGroup className="px-3">
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-sm font-medium mb-3 px-3">
            {state === "expanded" ? "Navigation" : "Nav"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item, index) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="w-full justify-start p-0">
                      <NavLink 
                        to={item.url} 
                        end 
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative group",
                          getNavCls({ isActive: active }),
                          "hover:scale-[1.02] hover:shadow-md"
                        )}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {state === "expanded" && (
                          <span className="font-medium animate-fade-in">{item.title}</span>
                        )}
                        {active && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl animate-pulse-glow" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Enhanced Account Section */}
        <SidebarGroup className="px-3">
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-sm font-medium mb-3 px-3">
            {state === "expanded" ? "Account" : "Acc"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className={cn(
              "bg-gradient-to-br from-sidebar-accent/50 to-sidebar-accent/30 backdrop-blur-sm rounded-xl p-4 mb-4 transition-all duration-300 hover:shadow-lg group border border-sidebar-border/30",
              state === "collapsed" && "p-2"
            )}>
              {state === "expanded" ? (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sidebar-accent-foreground font-semibold">Marketing Team</span>
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-sidebar-foreground/70 text-sm mb-2 font-mono">acct_7g3A</div>
                  <div className="flex items-center gap-2 text-success text-sm mb-4">
                    <CheckCircle className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 bg-transparent border-sidebar-border/50 text-sidebar-foreground hover:bg-sidebar-accent hover:scale-105 transition-all duration-200"
                    >
                      Remove
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary-muted hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25"
                    >
                      Add New
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-muted rounded-md flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              )}
            </div>
            
            {state === "expanded" && (
              <div className="text-sidebar-accent-foreground text-sm mb-3 flex items-center gap-2 px-1 animate-fade-in">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Connected</span>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>


        {/* Floating Action Button for Collapsed State */}
        {state === "collapsed" && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce-in">
            <Button
              size="sm"
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary-muted shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}