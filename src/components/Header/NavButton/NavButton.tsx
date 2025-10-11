const NavButton = ({ href, name }: { href: string; name: string }) => {
  return (
    <a
      href={href}
      className="text-sm/6 font-semibold text-gray-900 dark:text-white bg-purple-400 dark:bg-purple-600 px-3 py-2 rounded-md hover:opacity-80 transition no-underline"
    >
      {name}
    </a>
  );
};

export default NavButton;
