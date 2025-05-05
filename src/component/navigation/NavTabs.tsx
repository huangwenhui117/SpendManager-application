import React, { act } from "react";
import Link from 'next/link';
interface NavTabsProps {
  
}

const NavTabs: React.FC<NavTabsProps> = () => {
  const appName = 'Spend Manager';
  const tabsMap = [{name: 'Home', href: '/', active: true}, {name: 'Dashboard', href: '/dashboard', active: false}, {name: 'Dashboard', href: '/dashboard', active: true}];
  return (
    <div className="flex items-center space-x-8">
      <div className="text-xl font-bold">{appName}</div>
      <div className="space-x-4">
      {tabsMap.filter((tab) => tab.active).map((tab) => (
        <Link key={tab.href} href={tab.href} className="hover:underline">
          {tab.name}
        </Link>
      ))}
      </div>
  </div>
  );
};

export default NavTabs;