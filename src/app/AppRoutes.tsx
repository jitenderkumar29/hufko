'use client';
import React, { Suspense, FC } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const NotFound: FC = () => <div>404 - Page Not Found</div>;

// Define type for route mapping
interface Page {
  Link: string;
  View: React.ComponentType;
}

// ✅ Use `dynamic()` instead of `lazy()`
const pages: Page[] = [
  {
    Link: '/',
    View: dynamic(() => import('@/components/HomePage/HomePage'), { ssr: false }),
  },
  {
    Link: '/all-grocery-tabwise-Page',
    View: dynamic(() => import('@/components/Grocery/GroceryAllTabWisePage/GroceryAllTabWisePage'), { ssr: false }),
  },

];

const AppRoutes: FC = () => {
  const [, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);
  const pathname = usePathname();
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  const matchedPage = pages.find((page) => page.Link === cleanPath);
  const View = matchedPage?.View ?? NotFound;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <View />
    </Suspense>
  );
};

export default AppRoutes;
