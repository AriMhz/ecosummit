import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: React.ReactNode;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 z-50 pt-2 px-4 sm:px-6 lg:px-8 pointer-events-auto"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1380px] mx-auto bg-white border border-[#EBEBEB] shadow-[0_25px_70px_-12px_rgba(16,41,66,0.18)] rounded-3xl overflow-hidden p-6 lg:p-7"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
