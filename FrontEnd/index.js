/* eslint-disable linebreak-style */
async function works() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const worksData = await response.json();
    return worksData;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des données : ", error);
    return []; // Retourner un tableau vide en cas d'erreur pour éviter des problèmes ultérieurs
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const filterButtons = document.querySelectorAll('.button-filter');
  const galleryContainer = document.querySelector('.gallery');

  // Appeler la fonction works pour récupérer les données
  const dataFromAPI = await works();

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const { category } = button.dataset;

      dataFromAPI.forEach((item) => {
        const shouldDisplay = category === 'Tous' || item.category.name === category;
        const element = galleryContainer.querySelector(`[data-id="${item.id}"]`);

        if (shouldDisplay) {
          element.style.display = 'block'; // Afficher l'élément correspondant à la catégorie
        } else {
          element.style.display = 'none'; // Masquer les autres éléments
        }
      });
    });
  });

  // Générer le contenu HTML basé sur les données récupérées
  dataFromAPI.forEach((item) => {
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
});
