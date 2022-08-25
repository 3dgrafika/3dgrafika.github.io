$(document).ready(function() {

  'use strict';

  // =====================
  // Homepage Layout
  // =====================

  $('.is-home .js-post-card-wrap:nth-of-type(2) .c-post-card').addClass('c-post-card--half');

  // =====================
  // Responsive videos
  // =====================

  $('.c-content').fitVids({
    'customSelector': ['iframe[src*="ted.com"]', 'iframe[src*="player.twitch.tv"]']
  });

  // =====================
  // Toggle Disqus
  // =====================

  $('.js-load-disqus').click(function() {
    $('.js-disqus').toggle();
  });

  // =====================
  // Images zoom
  // =====================

  $('.c-post img').attr('data-action', 'zoom');

  // If the image is inside a link, remove zoom
  $('.c-post a img').removeAttr('data-action');

  // =====================
  // Off Canvas menu
  // =====================

  $('.js-off-canvas-toggle').click(function(e) {
    e.preventDefault();
    $('.js-off-canvas-toggle').toggleClass('is-active');
    $('.js-off-canvas-container').toggleClass('is-active');
  });

  // =====================
  // Post Card Images Fade
  // =====================

  $('.js-fadein').viewportChecker({
    classToAdd: 'is-inview', // Class to add to the elements when they are visible
    offset: 100,
    removeClassAfterAnimation: true
  });

  // =====================
  // Search
  // =====================

  var search_field = $('.js-search-input'),
      search_results = $('.js-search-results'),
      toggle_search = $('.js-search-toggle'),
      search_result_template = "\
      <a href='{{link}}' class='c-search-result'>\
        <div class='c-search-result__content'>\
          <h3 class='c-search-result__title'>{{title}}</h3>\
          <time class='c-search-result__date'>{{pubDate}}</time>\
        </div>\
      </a>";

  toggle_search.click(function(e) {
    e.preventDefault();
    $('.js-search').addClass('is-active');

    // If off-canvas is active, just disable it
    $('.js-off-canvas-container').removeClass('is-active');

    setTimeout(function() {
      search_field.focus();
    }, 500);
  });

  $('.c-search, .js-search-close, .js-search-close .icon').on('click keyup', function(event) {
    if (event.target == this || event.target.className == 'js-search-close' || event.target.className == 'icon' || event.keyCode == 27) {
      $('.c-search').removeClass('is-active');
    }
  });

  search_field.ghostHunter({
    results: search_results,
    onKeyUp: true,
    rss: base_url + '/feed.xml',
    result_template : search_result_template,
    zeroResultsInfo : false,
    displaySearchInfo: false,
    includepages : true,
    before: function() {
      search_results.fadeIn();
    }
  });

  // =====================
  // Ajax Load More
  // =====================

  var $load_posts_button = $('.js-load-posts');

  $load_posts_button.click(function(e) {
    e.preventDefault();

    var request_next_link = pagination_next_url.split('/page')[0] + '/page' + pagination_next_page_number + '/';

    $.ajax({
      url: request_next_link,
      beforeSend: function() {
        $load_posts_button.text('Loading');
        $load_posts_button.addClass('c-btn--loading');
      }
    }).done(function(data) {
      var posts = $('.js-post-card-wrap', data);

      $('.js-grid').append(posts);

      $('.js-fadein').viewportChecker({
        classToAdd: 'is-inview', // Class to add to the elements when they are visible
        offset: 100,
        removeClassAfterAnimation: true
      });

      $load_posts_button.text('More Stories');
      $load_posts_button.removeClass('c-btn--loading');

      pagination_next_page_number++;

      // If you are on the last pagination page, hide the load more button
      if (pagination_next_page_number > pagination_available_pages_number) {
        $load_posts_button.addClass('c-btn--disabled').attr('disabled', true);
      }
    });
  });

  // ==============================================================================================
  // Instagram Feed
  // Get your userId and accessToken from the following URLs, then replace the new values with the
  // the current ones.
  // userId: https://smashballoon.com/instagram-feed/find-instagram-user-id/
  // accessToken: http://instagram.pixelunion.net/
  // ==============================================================================================

  var instagramFeed = new Instafeed({
    get: 'user',
    limit: 6,
    resolution: 'thumbnail',
    userId: '441902919',
    accessToken: '441902919.1677ed0.ab9040eff64249dcbfb19b6d48b4e909',
    template:
      '<div class="c-widget-instagram__item"><a href="{{link}}" title="{{caption}}" aria-label="{{caption}}" target="_blank"><img src="{{image}}"></a></div>'
  });

  if ($('#instafeed').length) {
    instagramFeed.run();
  }
});
