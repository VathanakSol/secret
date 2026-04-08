import { Home, DollarSign } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home", icon: Home },
];

export default function Navbar() {
  return (
    <>
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4">
          <nav className="flex items-center justify-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm sm:text-base font-medium text-foreground/70 hover:text-foreground transition-colors group"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
