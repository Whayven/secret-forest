import { Link } from "@/components/ui/link";
import { Navbar, NavbarItem, NavbarSection } from "@/components/ui/navbar";

function Header({ params }: { params: { path: string } }) {
  return (
    <Navbar className="px-4 sm:px-6 lg:px-8 text-black dark:text-white bg-white dark:bg-black border-b border-zinc-950/10 dark:border-white/10">
      <NavbarSection>
        <NavbarItem href="/" current={params.path === "/"}>
          Home
        </NavbarItem>
        <NavbarItem
          href="/stories"
          current={params.path.startsWith("/stories")}
        >
          Stories
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}

export default Header;
