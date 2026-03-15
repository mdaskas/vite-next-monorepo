"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Package, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@repo/ui/components/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/collapsible"

const navItems = [
  {
    title: "Products",
    icon: Package,
    href: "/products",
    children: [
      { title: "Products", href: "/products" },
      { title: "Product Categories", href: "/product-categories" },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    href: "/customers",
    children: [
      { title: "Customers", href: "/customers" },
      { title: "Billing Terms", href: "/billing-terms" },
      { title: "Shipping Terms", href: "/shipping-terms" },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      navItems.map((item) => [
        item.title,
        pathname === item.href ||
          item.children.some((c) => pathname.startsWith(c.href)),
      ])
    )
  )

  useEffect(() => {
    setOpenItems((prev) => {
      const updates: Record<string, boolean> = {}
      for (const item of navItems) {
        const shouldBeOpen =
          pathname === item.href ||
          item.children.some((c) => pathname.startsWith(c.href))
        if (shouldBeOpen && !prev[item.title]) {
          updates[item.title] = true
        }
      }
      return Object.keys(updates).length > 0 ? { ...prev, ...updates } : prev
    })
  }, [pathname])

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Package className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Next App</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <Collapsible
                key={item.title}
                open={openItems[item.title]}
                onOpenChange={(open) =>
                  setOpenItems((prev) => ({ ...prev, [item.title]: open }))
                }
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={
                          pathname === item.href ||
                          pathname.startsWith(item.href + "/")
                        }
                      />
                    }
                  >
                    <item.icon />
                    <span className="flex-1">{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="pl-6">
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.href}>
                          <SidebarMenuSubButton
                            render={<Link href={child.href} />}
                            isActive={pathname.startsWith(child.href)}
                          >
                            {child.title}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
