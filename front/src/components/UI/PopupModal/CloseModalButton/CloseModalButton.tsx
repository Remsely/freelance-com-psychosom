type CloseModalProps = {
    setIsOpen: (isOpen: boolean) => void;
};

export default function CloseModalButton({setIsOpen}: CloseModalProps) {
    return (
        <svg onClick={() => setIsOpen(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24"
             fill="none" stroke="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    )
}