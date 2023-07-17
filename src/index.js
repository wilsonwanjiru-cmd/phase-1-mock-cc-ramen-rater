document.addEventListener('DOMContentLoaded', () => {
  const fetchRamensAndDisplayImages = async () => {
    try {
      const response = await fetch('http://localhost:3000/ramens');
      const ramens = await response.json();

      const ramenMenu = document.getElementById('ramen-menu');
      ramens.forEach((ramen) => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        ramenMenu.appendChild(img);
      });
    } catch (error) {
      console.error('Error fetching ramens:', error);
    }
  };

  const displayRamenDetails = (ramen) => {
    const detailImage = document.querySelector('.detail-image');
    const name = document.querySelector('.name');
    const restaurant = document.querySelector('.restaurant');
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');

    detailImage.src = ramen.image;
    detailImage.alt = ramen.name;
    name.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;
  };

  const handleNewRamenSubmit = async (event) => {
    event.preventDefault();

    const newName = document.getElementById('new-name').value;
    const newRestaurant = document.getElementById('new-restaurant').value;
    const newImage = document.getElementById('new-image').value;
    const newRating = document.getElementById('new-rating').value;
    const newComment = document.getElementById('new-comment').value;

    const newRamen = {
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment,
    };

    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    ramenMenu.appendChild(img);

    document.getElementById('new-name').value = '';
    document.getElementById('new-restaurant').value = '';
    document.getElementById('new-image').value = '';
    document.getElementById('new-rating').value = '';
    document.getElementById('new-comment').value = '';
  };

  const ramenMenu = document.getElementById('ramen-menu');
  ramenMenu.addEventListener('click', async (event) => {
    if (event.target.tagName === 'IMG') {
      const ramenName = event.target.alt;

      try {
        const response = await fetch(`http://localhost:3000/ramens?name=${ramenName}`);
        const [ramen] = await response.json();

        displayRamenDetails(ramen);
      } catch (error) {
        console.error('Error fetching ramen details:', error);
      }
    }
  });

  const newRamenForm = document.getElementById('new-ramen');
  newRamenForm.addEventListener('submit', handleNewRamenSubmit);

  fetchRamensAndDisplayImages();
});

