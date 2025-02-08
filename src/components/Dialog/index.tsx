import React, { createContext, ReactNode, useContext, useEffect } from 'react';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface CommonPropsForDialogChildrenComponents {
  children: ReactNode;
  className?: string;
}

const DialogContext = createContext<DialogContextType>({ isOpen: false, setIsOpen: () => null });

export const useDialog = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Dialog components must be used in the Dialog Component');
  }

  return context;
};

export function Dialog({ children, isOpen, onClose }: DialogProps) {
  // handle outside click
  const handleBackDropClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        setIsOpen: (open) => !open && onClose(),
      }}
    >
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6"
        onClick={handleBackDropClick}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`relative w-full max-w-lg rounded-lg bg-white shadow-xl`}
          role="alertdialog"
          aria-labelledby="dialog-title"
        >
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );
}

export function DialogHeader({ children, className = '' }: CommonPropsForDialogChildrenComponents) {
  const { setIsOpen } = useDialog();

  return (
    <div className={`flex items-center justify-between border-b p-4 ${className}`}>
      <div className="text-lg font-semibold" id="dialog-title">
        {children}
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="text-gray-500 transition-colors hover:text-gray-700"
        aria-label="Close dialog"
      >
        Close
      </button>
    </div>
  );
}

// Dialog Content Component
export function DialogContent({ children, className = '' }: CommonPropsForDialogChildrenComponents) {
  return <div className={`max-h-[calc(100vh-16rem)] overflow-y-auto p-4 ${className}`}>{children}</div>;
}

// Dialog Footer Component
export function DialogFooter({ children, className = '' }: CommonPropsForDialogChildrenComponents) {
  return <div className={`flex justify-end gap-3 border-t p-4 ${className}`}>{children}</div>;
}
