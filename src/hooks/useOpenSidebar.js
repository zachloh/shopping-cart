import { useState } from 'react';

export const useOpenSidebar = () => {
  const [shouldSidebarOpen, setShouldSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setShouldSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setShouldSidebarOpen(false);
  };

  return { shouldSidebarOpen, handleOpenSidebar, handleCloseSidebar };
};
