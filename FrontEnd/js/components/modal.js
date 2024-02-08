import {
    aOpenModal, modal, secondModal, closeModal, secondModalClose, btnOpenSecondModal, backArrow,
    customFileUpload, fileUpload, frame, fa_Image, uploadContent, submitButton, formTitle, formCategory,
    formAddPhoto
} from "./domLinker.js";
import { addWork } from "./api.js";

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
    submitButton.setAttribute('disabled', true)

    // TODO reset affichage
};

const openFrame = () => {
    frame.style.display = "flex";
    customFileUpload.style.display = "none";
    fa_Image.style.display = "none";
    uploadContent.style.display = "none";
};

let image, title, category;

const Modal = () => {
    const resetForm = () => {
       formAddPhoto.reset();
        submitButton.setAttribute('disabled', true);
        submitButton.style.background = "#A7A7A7";
    };

    const checkFormIsValid = () => {
        image = fileUpload.files[0]; 
        title = formTitle.value; 
        category = formCategory.value;

        if (image && (title.length > 0) && category) {
            if (image.size > 4 * 1024 * 1024) { 
                alert('La taille du fichier dépasse 4 Mo. Veuillez sélectionner un fichier plus petit.');
                submitButton.setAttribute('disabled', true);
                submitButton.style.background = "#A7A7A7";
            } else {
                submitButton.removeAttribute('disabled');
                submitButton.style.background = "#1D6154";
            }
        } else {
            submitButton.setAttribute('disabled', true);
            submitButton.style.background = "#A7A7A7";
        }
    };
    
    // Modal listener
    aOpenModal.addEventListener('click', openFirstModal);
    closeModal.addEventListener('click', closeModals);
    btnOpenSecondModal.addEventListener('click', openSecondModal);
    secondModalClose.addEventListener('click', closeModals);
    backArrow.addEventListener('click', openFirstModal);
    customFileUpload.addEventListener('click', openFrame);
    fileUpload.addEventListener('change', () => {
        const [file] = fileUpload.files
        frame.src = URL.createObjectURL(file)
        checkFormIsValid();
    });

    formTitle.addEventListener('input', checkFormIsValid);
    formCategory.addEventListener('change', checkFormIsValid);

    // Event listener
    formAddPhoto.addEventListener('submit', e => {
        e.preventDefault();

        image = fileUpload.files[0];
        title = formTitle.value;
        category = formCategory.value;

        if (image && title && category) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('category', category);

            addWork(formData)
                .then(response => {
                    console.log('Server response:', response);
                    resetForm(); 
                })
                .catch(error => {
                    console.error('Error sending data:', error);
                });
        } else {
            alert('Please fill in all required fields.');
        }
    });
};

export default Modal;
