import { createContext, useContext, useState } from 'react';

const uiContext = createContext({
  snackBar: {
    isOpen: false,
    label: '',
    message: '',
    type: 'success',
  },
  openSnackBar: (alertObject: {
    label: string;
    message: string;
    type: string;
  }) => {},

  closeSnackBar: () => {},

  // Share Link Modal
  shareLink: {
    isModalOpen: false,
    link: '',
    message: '',
  },
  openShareModal: (link: string, message: string) => {},
  closeShareModal: () => {},
});

function useProvideUI() {
  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    label: '',
    message: '',
    type: 'success',
  });

  const [shareLink, setShareLink] = useState({
    isModalOpen: false,
    link: 'https://www.gamebig.in',
    message: '',
  });

  function openSnackBar(alertObject: {
    label: string;
    message: string;
    type: string;
  }) {
    setSnackBar({
      isOpen: true,
      label: alertObject.label,
      message: alertObject.message,
      type: alertObject.type,
    });
  }

  function closeSnackBar() {
    setSnackBar({
      isOpen: false,
      label: '',
      message: '',
      type: '',
    });
  }

  function openShareModal(link: string, message: string) {
    setShareLink({
      isModalOpen: true,
      link: link,
      message: message,
    });
  }

  function closeShareModal() {
    setShareLink({
      isModalOpen: false,
      link: 'https://www.gamebig.in',
      message: '',
    });
  }

  return {
    snackBar,
    openSnackBar,
    closeSnackBar,
    shareLink,
    openShareModal,
    closeShareModal,
  };
}

type contextProps = {
  children: React.ReactNode;
  snackBar?: {
    isOpen: boolean;
    label: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
  };
  openSnackBar?: (alertObject: {
    label: string;
    message: string;
    type: string;
  }) => void;
  closeSnackBar?: () => void;
  shareLink?: {
    isModalOpen: boolean;
    link: string;
    message: string;
  };
  openShareModal?: (link: string, message: string) => void;
  closeShareModal?: () => void;
};

export const UIProvider = ({ children }: contextProps) => {
  const uiStore = useProvideUI();
  return <uiContext.Provider value={uiStore}>{children}</uiContext.Provider>;
};

export const useUI = () => {
  return useContext(uiContext);
};
