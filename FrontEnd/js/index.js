import { galleryContainer, filterContainer } from '../components/domLinker.js';
import { getWorks, getCategories, } from '../components/api.js';

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
const createGallery = (data) => {
  galleryContainer.innerHTML = '';

  data.forEach((item) => {
    const figure = document.createElement('figure');
    figure.setAttribute('data-id', item.id);

    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = item.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    galleryContainer.appendChild(figure);
  });
};

getCategories().then((data) => createCategories(data));
getWorks().then((data) => createGallery(data));

