import Link from "next/link";

type NavItemProps = { href: string; title: string };
export function NavItem({ href, title }: NavItemProps) {
  return (
      <div className="items-center text-2xl font-semibold hover:text-sky-600/80 ">
        <Link href={href}>{title}</Link>
      </div>
  );
}
