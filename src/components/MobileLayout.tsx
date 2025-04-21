
import React from "react";

/**
 * MobileLayout component
 * 
 * A responsive wrapper for all screens in the GetItAll mobile app
 * Provides consistent padding and maximum width across the app
 */
interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-white px-4 py-6">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
