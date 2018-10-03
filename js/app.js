$(document).foundation();

// ============
// TO TOP BUTTON
// ============
// Display the "to top" button only when the user has scrolled down the page 300px
window.onscroll = function() {
    displayToTopBtn();
};

function displayToTopBtn() {
    const toTheTopBtn = document.getElementById('top');
    // Check scroll position
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        toTheTopBtn.style.display = 'block';
    } else {
        toTheTopBtn.style.display = 'none';
    }
}

// ============
// HERO
// ============
// Typed library by https://mattboldt.com/demos/typed-js/
const typed = new Typed('#typed', {
  stringsElement: '#typed-strings',
  typeSpeed: 70,
  smartBackspace: true
});

// ============
// LOAD DATA
// ============
// Load contact information
$.getJSON( "../data/contact.json", function( data ) {
  $('span .phone').append('<a href="tel:' + data[0].phone + '" class="phone"> ' + data[0].phone + '</a>');
  $('span .email').append('<a href="mailto:' + data[0].email + '" class="email"> ' + data[0].email + '</a>');
});


// ===============
// LOAD PROJECTS
// ===============
// Display lightbox for Projects
const projectsContainer = document.querySelector('.projects-container');
const modalWrapper = document.querySelector('.modal');
const api = '../data/projects.json';

// Create a card for each project
function createCard(id, name, description, image, github, url){
  const cell = document.createElement('DIV');
  cell.classList.add('medium-6', 'large-4', 'cell');

  const card = document.createElement('DIV');
  card.classList.add('card');
  card.setAttribute('id', `card-${id}`);

  const lightbox = document.createElement('A');

  const projectImage = document.createElement('IMG');
  projectImage.setAttribute('src', image);
  projectImage.setAttribute('alt', name);

  const cardSection = document.createElement('DIV');
  cardSection.classList.add('card-section');

  const projectName = document.createElement('H3');
  projectName.classList.add('text-center');
  projectName.innerText = name;

  const divider = document.createElement('HR');

  const projectDesc = document.createElement('P');
  projectDesc.innerText = description.slice(0,103).concat('...');

  const linksContainer = document.createElement('DIV');
  linksContainer.classList.add('links');

  const githubLink = document.createElement('A');
  githubLink.setAttribute('href', github);
  githubLink.setAttribute('target', '_blank');
  githubLink.classList.add('button', 'primary', 'hollow');
  githubLink.innerText = 'See project files';

  const liveProject = document.createElement('A');
  liveProject.setAttribute('href', url);
  liveProject.setAttribute('target', '_blank');
  liveProject.classList.add('button', 'success', 'hollow');
  liveProject.innerText = 'See it live!';

  const openModal = document.createElement('BUTTON');
  openModal.classList.add('button', 'hollow', 'secondary');
  openModal.setAttribute('data-open', `project-${id}`);
  openModal.innerText = 'Open details';

  linksContainer.appendChild(githubLink);
  linksContainer.appendChild(liveProject);
  linksContainer.appendChild(openModal);

  cardSection.appendChild(projectName);
  cardSection.appendChild(divider);
  cardSection.appendChild(projectDesc);
  cardSection.appendChild(linksContainer);

  lightbox.appendChild(projectImage);

  card.appendChild(lightbox);
  card.appendChild(cardSection);

  cell.appendChild(card);

  projectsContainer.appendChild(cell);
}

// Create an overlay lightbox for each project
function createOverlay(id, name, description, skills, image, github, url){
  const modalContainer = document.createElement('DIV');
  modalContainer.classList.add('popup');
  modalContainer.setAttribute('id', `project-${id}`);

  const projectDetails = document.createElement('DIV');
  projectDetails.classList.add('project-details');

    const img = document.createElement('IMG');
    img.setAttribute('src', image);

    const moreDetails = document.createElement('DIV');
    moreDetails.classList.add('project-details--more');

      const projectName = document.createElement('H3');
      projectName.innerText = name;

      const divider = document.createElement('HR');

      const projectDesc = document.createElement('P');
      projectDesc.innerText = description;

      const skillsContainer = document.createElement('UL');

      skills.forEach( skill => {
        let skillItem = document.createElement('LI');
        skillItem.innerText = skill;
        skillsContainer.appendChild(skillItem);
      });

      const linksContainer = document.createElement('DIV');
      linksContainer.classList.add('links');

        const githubLink = document.createElement('A');
        githubLink.setAttribute('href', github);
        githubLink.setAttribute('target', '_blank');
        githubLink.classList.add('button', 'primary');
        githubLink.innerText = 'See project files';

        const liveProject = document.createElement('A');
        liveProject.setAttribute('href', url);
        liveProject.setAttribute('target', '_blank');
        liveProject.classList.add('button', 'success');
        liveProject.innerText = 'See it live!';

  const closeModalBtn = document.createElement('BUTTON');
  closeModalBtn.classList.add('close-button');
  closeModalBtn.setAttribute('data-close', '');
  closeModalBtn.setAttribute('aria-label', 'Close modal');
  closeModalBtn.setAttribute('type', 'button');

    const span = document.createElement('SPAN');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = 'X';

  linksContainer.appendChild(githubLink);
  linksContainer.appendChild(liveProject);

  moreDetails.appendChild(projectName);
  moreDetails.appendChild(divider);
  moreDetails.appendChild(projectDesc);
  moreDetails.appendChild(skillsContainer);
  moreDetails.appendChild(linksContainer);

  closeModalBtn.appendChild(span);

  projectDetails.appendChild(img);
  projectDetails.appendChild(moreDetails);

  modalContainer.appendChild(projectDetails);
  modalContainer.appendChild(closeModalBtn);

  modalWrapper.appendChild(modalContainer);

}

// =============================
// Connect to Projects JSON file
// =============================
const loading = document.querySelector('.loading');


// 1. Create new XHR object
const xhr = new XMLHttpRequest();

// 2. Callback function to run
xhr.onreadystatechange = function(){
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // Success - convert results to an object
      const results = JSON.parse(xhr.responseText);

      // Remove loading indicator
      loading.style.display = 'none';

      // Loop through the results and create a card for each project
      results.forEach( result => {
        createCard(result.id, result.name, result.description, result.image, result.github, result.url);
        createOverlay(result.id, result.name, result.description, result.skills, result.image, result.github, result.url);
      });

      // ==============
      // EVENTS:
      // When a project is clicked, open the modal for that project
      // Close the modal by clicking the close button or hitting escape on keyboard
      // ===============
            // Listen on the PARENT card for the click event
            $('.projects-container .card').on('click', function(e){
              // only open the card if the user clicks the open details button
              if (e.target.hasAttribute('data-open') || e.target.tagName === 'IMG') {
                  console.log(this);
                // Get the value of the employee #card-X
                var cardID = $(this).attr('id');
                var projectNumber = cardID.slice(5,7);

                // Display the modal overlay
                $('.modal').css('left', 0);

                // Find the project popup to shadow
                var projectToShow = document.getElementById('project-' + projectNumber);
                projectToShow.style.display = 'flex';
                projectToShow.classList.add('selected');

                // Close the Modal if user clicks the X
                $('.close-button').on('click', function(){
                  // Hide the overlay & card
                  $('.modal').css('left', '100%');
                  $('.modal .popup').css('display', 'none');
                  $('.modal .popup').removeClass('selected');
                });

                // OR - listen for a keydown event and close the modal when ESC key is pressed
                $(document).keydown(function(e) {
                  if (e.which === 27) {
                    // Hide the overlay & card
                    $('.modal').css('left', '100%');
                    $('.modal .popup').css('display', 'none');
                    $('.modal .popup').removeClass('selected');
                  }
                });

              }

            });
      // end status === 200
    } else {
      loading.style.display = 'block';
      loading.innerHTML = 'Sorry, something went wrong. Error: ' + xhr.status;
    }
  // end readyState 4
  } else {
    loading.style.display = 'block';
    loading.innerHTML = 'Unable to connect. Please try again later.' + xhr.status;
  }
};

// 3. Open the request
xhr.open('GET', api);

// 4. Send the request
xhr.send();
