const Modal = ({isOpen, handleClose, modalDetails}) => {

    const {header, body, footer} = modalDetails;

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-1/3 border border-black ml-2 p-2 flex flex-col">
                <div className="flex-1 border-b border-gray-300 p-2 font-bold">{header}</div>
                <div className="flex-1 p-2">{body}</div>
                <div className="flex-1 flex p-2">
                    <button className="bg-green-500 text-white font-bold border border-green-500 m-2 p-2 w-1/2" onClick={footer.yes.handler}>{footer.yes.message}</button>
                    <button className="border border-green-500 m-2 p-2 w-1/2 text-green-500 font-bold" onClick={footer.no.handler}>{footer.no.message}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;
