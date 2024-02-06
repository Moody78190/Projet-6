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

let image, title, category


const Modal = () => {
    image = fileUpload.files[0]; // Suppose you have a file input for the image
    title = formTitle.value; // Suppose you have an input for the title
    category = formCategory.value; // Suppose you have an input for the category

    const checkFormIsValid = () => {
        image = fileUpload.files[0]; // Suppose you have a file input for the image
        title = formTitle.value; // Suppose you have an input for the title
        category = formCategory.value; // Suppose you have an input for the category

        if (image && (title.length > 0) && category) {
            submitButton.removeAttribute('disabled')
            submitButton.style.background = "#1D6154"
        } else {
            submitButton.setAttribute('disabled', true)
            submitButton.style.background = "#A7A7A7"
        }

        console.log(`
          image: ${image}
          title: ${title}
          category: ${category}
        `)
    }

    // Modal listener
    aOpenModal.addEventListener('click', () => openFirstModal());
    closeModal.addEventListener('click', () => closeModals());
    btnOpenSecondModal.addEventListener('click', () => openSecondModal());
    secondModalClose.addEventListener('click', () => closeModals());
    backArrow.addEventListener('click', () => openFirstModal());
    customFileUpload.addEventListener('click', () => openFrame());
    fileUpload.addEventListener('change', () => {
        const [file] = fileUpload.files
        // const file = fileUpload.files[0]
        frame.src = URL.createObjectURL(file)
        checkFormIsValid()
    });

    formTitle.addEventListener('input', () => checkFormIsValid())

    formCategory.addEventListener('change', () => checkFormIsValid())

    //Event listenner //
    formAddPhoto.addEventListener('submit', e => {
        e.preventDefault()

        // Get data from the form fields 
        image = fileUpload.files[0]; // Suppose you have a file input for the image
        title = formTitle.value; // Suppose you have an input for the title
        category = formCategory.value; // Suppose you have an input for the category

        // Check if the data is valid before sending
        if (image && title && category) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('category', category);

            // Send data to addWork function
            addWork(formData)
                .then(response => {
                    // Handle the response if necessary
                    console.log('Server response:', response);
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error sending data:', error);
                });
        } else {
            // Show an error message if required fields are empty
            alert('Please fill in all required fields.');
        }
    });

}
export default Modal;
