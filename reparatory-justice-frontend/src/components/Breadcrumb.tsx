import React from 'react';
import Link from 'next/link';

interface BreadcrumbPath {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  paths: BreadcrumbPath[];
}

const Breadcrumb = ({ paths }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-2 text-xs md:text-sm font-medium py-6 px-6 max-w-7xl mx-auto">
      <Link 
        href="/" 
        className="text-slate-400 hover:text-[#001b3d] transition-colors uppercase tracking-wider"
      >
        Home
      </Link>
      
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          <span className="text-accent font-bold">/</span>
          <Link 
            href={path.href}
            className={`uppercase tracking-wider transition-colors ${
              index === paths.length - 1 
                ? "text-[#001b3d] cursor-default" 
                : "text-slate-400 hover:text-[#001b3d]"
            }`}
          >
            {path.name}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
