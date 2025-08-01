// Alert helper triggered by the click-me button
const clickMe = () => {
  alert("Thank you for reviewing my work/page 😁!");
};

$(document).ready(function () {
  // Initialize Materialize carousel component
  $('.carousel').carousel();

  // Attach click handler to the button with ID clickMeButton
  $('#clickMeButton').click(() => {
    clickMe();
  });

  // Lightbox implementation that overlays an image on top of everything
  function openLightbox(src, alt) {
    // Remove any existing lightbox before creating a new one
    $('.custom-lightbox').remove();

    // Construct the overlay DOM
    const overlay = $(`
      <div class="custom-lightbox">
        <div class="close-btn">&times;</div>
        <img src="${src}" alt="${alt || ''}">
      </div>
    `);
    $('body').append(overlay);

    // Trigger the fade-in transition
    requestAnimationFrame(() => {
      overlay.addClass('visible');
    });

    // Cleanup function to hide and remove the overlay
    function cleanup() {
      overlay.removeClass('visible');
      setTimeout(() => overlay.remove(), 200);
      $(document).off('keyup.lightbox');
    }

    // Close when clicking outside the image or on the close button
    overlay.on('click', function (e) {
      if ($(e.target).is('.custom-lightbox') || $(e.target).is('.close-btn')) {
        cleanup();
      }
    });

    // Close on Escape key
    $(document).on('keyup.lightbox', function (e) {
      if (e.key === 'Escape') {
        cleanup();
      }
    });
  }

  // Delegate click for any image with class .zoomable to open in lightbox
  $(document).on('click', 'img.zoomable', function (e) {
    e.preventDefault();
    const src = $(this).attr('src');
    const alt = $(this).attr('alt') || '';
    openLightbox(src, alt);
  });

  // Delegate click for links with .image-link to open their href target in lightbox
  $(document).on('click', '.image-link', function (e) {
    e.preventDefault();
    const src = $(this).attr('href');
    const alt = $(this).data('alt') || '';
    openLightbox(src, alt);
  });
});
