// components/page-head.tsx
"use client"; // Client component for dynamic usage

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageHeadProps {
  title?: string;
  description?: string;
}

const defaultTitle = "NEXBUY";
const defaultDescription = "Welcome to NEXBUY, your one-stop shop!";

const PageHead = ({ title, description }: PageHeadProps) => {
  const [pageTitle, setPageTitle] = useState(defaultTitle);
  const pathname = usePathname();

  useEffect(() => {
    if (title) {
      setPageTitle(`${defaultTitle} | ${title}`);
    } else {
      // Generate title based on path if not provided
      const pathNameCapitalized = pathname
        ? pathname
            .replace("/", "")
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")
        : "Home";
      setPageTitle(`${defaultTitle} | ${pathNameCapitalized}`);
    }
  }, [pathname, title]);

  return (
    <>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content={description || defaultDescription}
      />
    </>
  );
};

export default PageHead;
