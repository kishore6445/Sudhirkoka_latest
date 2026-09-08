import {
    createContext,
    useContext,
    useState,
} from "react";

const ContactContext = createContext(null);

export function ContactProvider({ children }) {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <ContactContext.Provider
            value={{
                isOpen,
                openModal,
                closeModal,
            }}
        >
            {children}
        </ContactContext.Provider>
    );
}

export function useContact() {

    const context = useContext(ContactContext);

    if (!context) {
        throw new Error(
            "useContact must be used inside ContactProvider."
        );
    }

    return context;
}