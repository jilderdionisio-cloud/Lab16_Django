import { Film, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { CartSheet } from "@/components/cart/cart-sheet";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Movies",
    href: "/movies",
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3 font-semibold tracking-tight"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/25 transition-transform group-hover:scale-105">
            <Film className="h-5 w-5 text-white" />
          </span>

          <span className="text-lg">
            Cine<span className="text-blue-400">SpoilerS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/4 p-1 md:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `
                rounded-full
                px-4
                py-2
                text-sm
                font-medium
                transition-colors
                hover:bg-white/8
                hover:text-accent-foreground
                ${isActive ? "bg-blue-600/15 text-blue-300" : "text-muted-foreground"}
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <CartSheet />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) => `
                      rounded-md
                      px-3
                      py-2
                      text-sm
                      font-medium
                      transition-colors
                      hover:bg-accent
                      hover:text-accent-foreground
                      ${isActive ? "text-blue-600" : "text-muted-foreground"}
                    `}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
