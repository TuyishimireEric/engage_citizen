export function NavLink({
  href,
  children,
  isActive = false,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <a
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? "text-green-500 dark:text-green-400"
          : "text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {children}
    </a>
  );
}
