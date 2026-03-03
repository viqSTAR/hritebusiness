import React, { createContext, useContext, useState, ReactNode } from 'react';
import ContactModal from '../components/UI/ContactModal';

interface ModalContextType {
    openContactModal: () => void;
    closeContactModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const openContactModal = () => setIsContactModalOpen(true);
    const closeContactModal = () => setIsContactModalOpen(false);

    return (
        <ModalContext.Provider value={{ openContactModal, closeContactModal }}>
            {children}
            <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
