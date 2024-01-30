import { aOpenModal, modal, secondModal, closeModal, secondModalClose, btnOpenSecondModal, backArrow, customFileUpload, fileUpload, frame, fa_Image, uploadContent } from "./domLinker.js";


const openFirstModal = () => {
    modal.style.display = "flex";
    secondModal.style.display = "none";
};

const closeModals = () => {
    modal.style.display = "none";
    secondModal.style.display = "none";
};

const openSecondModal = () => {
    secondModal.style.display = "flex";
    modal.style.display = "none";
};

const openFrame = () => {
    frame.style.display = "flex";
    customFileUpload.style.display = "none";
    fa_Image.style.display = "none";
    uploadContent.style.display = "none";
};

const Modal = () => {

    // Modal listener
    aOpenModal.addEventListener('click', () => openFirstModal());
    closeModal.addEventListener('click', () => closeModals());
    btnOpenSecondModal.addEventListener('click', () => openSecondModal());
    secondModalClose.addEventListener('click', () => closeModals());
    backArrow.addEventListener('click', () => openFirstModal());
    customFileUpload.addEventListener('click', () => openFrame());
    fileUpload.addEventListener('change', () => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const fileContent = reader.result;
            document.getElementById('frame').style.backgroundImage = `url(${fileContent})`;
        });

        const selectedFile = fileUpload.files[0]; // Use files[0] to get the first selected file
        reader.readAsDataURL(selectedFile);
    });
    
}
export default Modal;
