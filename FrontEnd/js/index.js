import { galleryContainer, filterContainer, modalgalleryContainer, aLogin, bannerContainer, aOpenModal, selectContainer } from './components/domLinker.js';
import { getWorks, getCategories, deleteWorks } from './components/api.js';
import Modal from './components/modal.js';

const createCategories = (data) => {
  // Create the "All" button and set it as active by default
  const buttonAll = document.createElement('button');
  buttonAll.setAttribute('class', 'button-filter active'); // Add the active class
  const spanAll = document.createElement('span');
  spanAll.innerHTML = 'All';

  buttonAll.appendChild(spanAll);
  filterContainer.appendChild(buttonAll);

  let activeButton = buttonAll; // Keep track of the currently active button

  // Event listener for the "All" button
  buttonAll.addEventListener('click', () => {
    getWorks().then((data) => createGallery(data));
    setActiveButton(buttonAll); // Set this button as active
  });

  // Loop through categories to create buttons for each category
  data.forEach((category) => {
    const button = document.createElement('button');
    button.setAttribute('class', 'button-filter');
    const span = document.createElement('span');
    span.innerHTML = category.name;

    button.appendChild(span);
    filterContainer.appendChild(button);

    // Event listener for category buttons
    button.addEventListener('click', () => {
      getWorks()
        .then((works) => {
          const filteredData = works.filter((item) => item.categoryId === category.id);
          createGallery(filteredData);
        });
      setActiveButton(button); // Set this button as active
    });
  });

  // Function to set the active button
  function setActiveButton(button) {
    activeButton.classList.remove('active'); // Remove active class from the current button
    activeButton = button; // Set the new active button
    button.classList.add('active'); // Add active class to the clicked button
  }
};

/**
 * Generate HTML content based on retrieved data
 * @param {Array} data - data from api get /works
 */
const createGallery = (data, container = galleryContainer, isModal = false) => {
  container.innerHTML = '';

  data.forEach((item) => {
    const figure = document.createElement('figure');
    figure.setAttribute('data-id', item.id);

    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;

    figure.appendChild(img);

    if (!isModal) {
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = item.title;
      figure.appendChild(figcaption);
    } else {
      const icon = document.createElement('img');
      icon.src = `./assets/icons/trash-can-solid.svg`;
      icon.alt = "trashcan";
      icon.setAttribute('class', "trash-can");
      figure.appendChild(icon);

      icon.addEventListener('click', (e) => {
        deleteWorks(item.id).then(() => {
          getWorks().then((data) => {
            createGallery(data)
            createGallery(data, modalgalleryContainer, true)
          });
        });
      });
    }

    container.appendChild(figure);
  });
};

// Page Admin
if (localStorage.token) {
  console.log('le token existe :', localStorage.token);
  filterContainer.style.display = 'none';
  bannerContainer.style.display = 'flex';
  aLogin.innerHTML = 'Logout';
  aOpenModal.style.display = 'flex';
} else {
  bannerContainer.style.display = 'none';
};
aLogin.addEventListener('click', () => {
  localStorage.removeItem('token')
})

const createSelectMenu = (data, selectContainer) => {
  // Create the select element
  const selectElement = document.createElement('select');
  selectElement.id = 'categorySelect';
  
  // Add options using forEach
  data.forEach(category => {
      const option = document.createElement('option');
      option.setAttribute('class', 'select-option');
      option.value = category.id; 
      option.textContent = category.name;
      selectElement.appendChild(option); // Ajout de l'option à chaque itération
  });

  // Ajouter le select element à la page
  selectContainer.appendChild(selectElement);
};

// Fetch categories from API and create select menu
getCategories()
  .then(data => createSelectMenu(data, selectContainer))
  .catch(error => console.error('Error fetching categories:', error));

// Assurez-vous que getWorks() est défini ailleurs dans votre code
getCategories().then((data) => createCategories(data));



getWorks().then((data) => {
  createGallery(data);
  createGallery(data, modalgalleryContainer, true);
});

// Assurez-vous que Modal() est défini ailleurs dans votre code
Modal();
