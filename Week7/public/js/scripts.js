// public/js/scripts.js

/**
 * Renders an array of projects as Materialize cards
 */
function addCards(projects) {
  const $container = $('#projectContainer');
  projects.forEach(p => {
    $container.append(`
      <div class="col s4">
        <div class="card">
          <div class="card-image">
            <img
              src="${p.image}"
              alt="${p.title}"
              onerror="this.onerror=null; this.src='images/placeholder.jpg';"
            />
          </div>
          <div class="card-content">
            <span class="card-title">${p.title}</span>
            <p>${p.description}</p>
          </div>
          <div class="card-action">
            <a href="${p.link}" target="_blank">Visit</a>
          </div>
        </div>
      </div>
    `);
  });
}

/**
 * Fetches all projects from the API
 */
function getProjects() {
  $.get('/api/projects', response => {
    if (response.statusCode === 200) {
      addCards(response.data);
    }
  });
}

/**
 * Submits the form data to create a new project
 */
function submitForm() {
  const payload = {
    title:       $('#title').val(),
    image:       $('#image').val(),
    link:        $('#link').val(),
    description: $('#description').val()
  };

  $.ajax({
    url:         '/api/projects',
    method:      'POST',
    contentType: 'application/json',
    data:        JSON.stringify(payload),
    success: res => {
      if (res.statusCode === 201) {
        addCards([res.data]);
        $('#projectForm')[0].reset();
      }
    }
  });
}

$(document).ready(() => {
  $('.materialboxed').materialbox();
  $('.modal').modal();

  $('#projectForm').submit(e => {
    e.preventDefault();
    submitForm();
  });

  getProjects();
});

// ---- Socket.io ----
const socket = io();

socket.on('number', (msg) => {
  console.log('Random number:', msg);
  const el = document.getElementById('number');
  if (el) el.textContent = msg;
});
