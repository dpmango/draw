'use strict';

$(document).ready(function () {

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
      var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
      return mq && mq.matches || window.devicePixelRatio > 1;
    }
  }
  // isRetinaDisplay()
  var mobileDevice = isMobile();
  // detect mobile devices
  function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }

  if (mobileDevice) {
    $('body').addClass('is-mobile');
  }

  //////////
  // COMMON
  //////////

  // Prevent # behavior
  $('[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // Smoth scroll
  $('a[href^="#section"]').click(function () {
    var el = $(this).attr('href');
    $('body, html').animate({
      scrollTop: $(el).offset().top }, 1000);
    return false;
  });

  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  if ($('.header-static').length == 0) {
    _window.scrolled(0, function () {
      // scrolled is a constructor for scroll delay listener
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var heroHeight = $('.welcome').outerHeight() - headerHeight;

      if (vScroll > headerHeight + 100) {
        header.addClass('header--transformed');
        $('.mobile-navi').addClass('mobile-navi--mind-scroll');
      } else {
        header.removeClass('header--transformed');
        $('.mobile-navi').removeClass('mobile-navi--mind-scroll');
      }

      if (vScroll > 700) {
        header.addClass('header--fixed');
      } else {
        header.removeClass('header--fixed');
      }
    });
  }

  // header hamburger
  $('.header__hamburger').on('click', function () {
    $(this).toggleClass('active');
    $('.header').toggleClass('header--showing-menu');
    $('.mobile-navi').toggleClass('active');
  });

  // SCROLLBARS
  // $('.scrollbar-dynamic').scrollbar();
  // $('.scrollbar-macosx').scrollbar();


  // HAMBURGER TOGGLER
  $('.hamburger').on('click', function () {
    $('.hamburger').toggleClass('active');
    $('.mobile-navi').toggleClass('active');
  });

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering
  // user .active for li instead
  $('.header__menu li').each(function (i, val) {
    if ($(val).find('a').attr('href') == window.location.pathname.split('/').pop()) {
      $(val).addClass('active');
    } else {
      $(val).removeClass('active');
    }
  });

  // VIDEO PLAY
  $('.video__player .icon-circle').on('click', function () {
    $(this).closest('.video__player').addClass('playing');
    if (!mobileDevice) {
      $(this).closest('.video__player').find('iframe').attr("src", $("iframe").attr("src").replace("autoplay=0", "autoplay=1"));
    }
  });

  // video reveal
  setTimeout(function () {
    $('.video--have-animation').addClass('animation-end');
  }, 1700);

  // HOMEPAGE INSTAGRAM FEED
  $('.instagram__wrapper').socialfeed({
    // INSTAGRAM
    instagram: {
      limit: 3,
      accounts: ['@rngc_golf'],
      client_id: '692fe9f9219d41c49870ad1265f00766',
      access_token: '5465603138.692fe9f.7387354608cc4a0c8747675104ac1830'
      // accounts: ['@khmelevskoy_s'], //Array: Specify a list of accounts from which to pull posts
      // limit: 3, //Integer: max number of posts to load
      // client_id: '2d4d0ad2bc4c4166b0661486fa190ea7', //String: Instagram client id (optional if using access token)
      // access_token: '5695707324.1677ed0.863a579f85214493b66bfbe5cb0ad123' //String: Instagram access token
    },
    template_html: '<div data-wow-delay="0.2s" class="instagram__image wow transformUp {{? !it.moderation_passed}}hidden{{?}}" data-social="{{=it.social_network}}"  dt-create="{{=it.dt_create}}" social-feed-id = "{{=it.id}}">\
				<a href="{{=it.link}}" target="_blank" class="news_{{=it.social_network}}">\
					<img src="{{=it.attachment}}">\
				</a>\
			</div>'
  });

  // var feed = new Instafeed({
  //   target: 'instaFeed',
  //   clientId: '7ca6e17df5dc4f8ebdc020c8102e94db',
  //   access_token: '5695707324.7ca6e17.cc5d8301165f4922829c0a7f4e9cc395',
  //   get: 'user',
  //   userId: '5695707324'
  // });
  // feed.run();


  //////////
  // SLIDERS
  //////////

  // homepage slider for testinmonials
  $('.testimonials__slider').slick({
    autoplay: false,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    responsive: [{
      breakpoint: 768,
      settings: {
        adaptiveHeight: true
      }
    }]
  });

  // slick pagination
  $('.testimonials__slide__nav .icon-slide-next, .testimonials__slide__nav--single').on('click', function () {
    $('.testimonials__slider').slick('slickNext');
  });
  $('.testimonials__slide__nav .icon-slide-prev').on('click', function () {
    $('.testimonials__slider').slick('slickPrev');
  });

  // THUMBS SLIDER
  var _thumbsSlick = $('.slider-thumbs__slider');
  var _thumbsSlickOptions = {
    autoplay: false,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    cssEase: 'linear',
    adaptiveHeight: true,
    fade: true,
    responsive: [{
      breakpoint: 414,
      settings: "unslick"
    }]
  };
  _thumbsSlick.slick(_thumbsSlickOptions);

  _window.resized(100, function (e) {
    if (_window.width() < 414) {
      if (_thumbsSlick.hasClass('slick-initialized')) {
        _thumbsSlick.slick('unslick');
      }
      return;
    }
    if (!_thumbsSlick.hasClass('slick-initialized')) {
      return _thumbsSlick.slick(_thumbsSlickOptions);
    }
  });

  // thumbs
  $('.slider-thumbs__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var thumbs = slick.$slider.parent().find('.slider-thumbs__thumb');
    thumbs.each(function (i, val) {

      if ($(val).data('slide') - 1 == nextSlide) {
        $(val).siblings().removeClass('active');
        $(val).addClass('active');
      }
    });
  });
  // clicking thumbs
  $('.slider-thumbs__thumb').on('click', function () {
    $('.slider-thumbs__slider').slick('slickGoTo', $(this).data('slide') - 1);
  });

  ////////////
  // SALES PAGE
  ////////////
  $('.js-toggleProgramCourses').on('click', function () {
    var toggableObjects = $(this).closest('.course-program__wrapper').find('.course-program__item[data-visible="0"]');
    if ($(this).data('action') == "open") {
      toggableObjects.slideDown();
      $(this).data('action', 'close');
      $(this).find('span').text('показать краткую программу');
    } else {
      toggableObjects.slideUp();
      $(this).data('action', 'open');
      $(this).find('span').text('развернуть всю программу');
    }
  });

  // UNIVERSAL TOGGLER
  var togglerSavedText;
  $('.js-togglerPluginTrigger').on('click', function () {
    var toggableObjects = $(this).closest('.js-togglerPlugin').find('div[data-visible="0"]');
    if ($(this).data('action') == "open") {
      toggableObjects.slideDown();
      $(this).data('action', 'close');
      togglerSavedText = $(this).find('span').text();
      $(this).find('span').text($(this).data('text'));
    } else {
      toggableObjects.slideUp();
      $(this).data('action', 'open');
      $(this).find('span').text(togglerSavedText);
    }
  });

  if ($('.course-fixed').length > 0) {
    _window.scrolled(10, function () {
      // scrolled is a constructor for scroll delay listener
      var vScroll = _window.scrollTop();
      var el = $('.course-fixed');

      if (vScroll > 700) {
        el.addClass('visible');
      } else {
        el.removeClass('visible');
      }
    });
  }

  // scroll CTA behaviour
  _window.scrolled(10, function () {
    if (_window.width() < 768) {
      var stickyEl = $('.course-fixed');
      var windowBottomScroll = _window.scrollTop() + _window.height();
      var stopPoint = _document.height() - $('.footer').outerHeight() + 60;

      if (windowBottomScroll >= stopPoint) {
        stickyEl.addClass('course-fixed--stop');
      } else if (windowBottomScroll < stopPoint) {
        stickyEl.removeClass('course-fixed--stop');
      }
    }
  });

  ////////////
  // LESSON
  ////////////

  // sidebar scroll
  if ($('.lesson__sidebar').length > 0) {
    _window.scrolled(20, function () {
      var vScroll = _window.scrollTop();

      if (_window.width() > 768 && _window.width() < 992 && vScroll > $('.header').height()) {
        $('.lesson__sidebar__content').css('top', '0px');
      } else {
        $('.lesson__sidebar__content').css('top', '120px');
      }
    });
  }

  // set active class - should be removed in production
  $('.lesson__roadmap__item').on('click', function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });

  // toggler
  var savedSidebarTogglerText;
  $('.lesson__sidebar__toggler').on('click', function () {
    $(this).parent().find('.lesson__sidebar__content').slideToggle();

    if ($(this).data('action') == 'show') {
      savedSidebarTogglerText = $(this).find('span').text();
      $(this).find('span').text($(this).data('text-hidden'));
      $(this).data('action', 'hide');
    } else {
      $(this).find('span').text(savedSidebarTogglerText);
      $(this).data('action', 'show');
    }
  });

  ////////////
  // Magnific Popup
  ////////////

  // var startWindowScroll = 0;
  $('.js-popup').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'popup-buble',
    callbacks: {
      beforeOpen: function beforeOpen() {
        // startWindowScroll = _window.scrollTop();
        // $('html').addClass('mfp-helper');
      },
      close: function close() {
        // $('html').removeClass('mfp-helper');
        // _window.scrollTop(startWindowScroll);
      }
    }
  });

  ////////////
  // UI
  ////////////

  // custom selects
  $('.ui-select__visible').on('click', function (e) {
    var that = this;
    // hide parents
    $(this).parent().parent().parent().find('.ui-select__visible').each(function (i, val) {
      if (!$(val).is(that)) {
        $(val).parent().removeClass('active');
      }
    });

    $(this).parent().toggleClass('active');
  });

  $('.ui-select__dropdown span').on('click', function () {
    // parse value and toggle active
    var value = $(this).data('val');
    var targetHref = $(this).data('href');
    if (targetHref) {
      window.location.href = targetHref;
    }
    if (value) {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      // set visible
      $(this).closest('.ui-select').removeClass('active');
      $(this).closest('.ui-select').find('input').val(value);

      $(this).closest('.ui-select').find('.ui-select__visible span').text(value);
    }
  });

  // handle outside click
  $(document).click(function (e) {
    var container = new Array();
    container.push($('.ui-select'));

    $.each(container, function (key, value) {
      if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
        $(value).removeClass('active');
      }
    });
  });

  // numeric input
  $('.ui-number span').on('click', function (e) {
    var element = $(this).parent().find('input');
    var currentValue = parseInt($(this).parent().find('input').val()) || 0;

    if ($(this).data('action') == 'minus') {
      if (currentValue <= 1) {
        return false;
      } else {
        element.val(currentValue - 1);
      }
    } else if ($(this).data('action') == 'plus') {
      if (currentValue >= 99) {
        return false;
      } else {
        element.val(currentValue + 1);
      }
    }
  });

  // toggler
  $('.ui__toggler__box').on('click', function () {
    var parentObj = $(this).parent();
    if (parentObj.is('.right')) {
      parentObj.removeClass('right').addClass('left');
      parentObj.find('input').val('0');
    } else if (parentObj.is('.left')) {
      parentObj.removeClass('left').addClass('right');
      parentObj.find('input').val('1');
    }
  });

  // emulate click
  $('.ui__toggler label').on('click', function () {
    $(this).parent().find('.ui__toggler__box').click();
  });

  // toggler populate inputs
  $('.ui__toggler').each(function (i, val) {
    if ($(val).is('.left')) {
      $(this).find('input').val('0');
    } else if ($(val).is('.right')) {
      $(this).find('input').val('1');
    }
  });

  // UI EDITABLE
  $('.ui-input--editable + .icon-edit').on('click', function () {
    if ($(this).prev().is('.allow-input')) {
      // kind of save ajax request ?
      $(this).prev().removeClass('allow-input');
      // show sucess message
      $(this).parent().find('.ui-group__sucess').fadeIn();
    } else {
      $(this).prev().focus().addClass('allow-input');
      // remove sucess message
      $(this).parent().find('.ui-group__sucess').fadeOut();
    }
  });

  // Masked input
  $(".js-dateMask").mask("99.99.9999");
  $(".js-dateMask2").mask("99.99.99", { placeholder: "ДД.ММ.ГГ" });
  $(".js-indexMask").mask("999 999");
  $("input[type='tel']").mask("+7 (000) 000-0000", { placeholder: "+7 (___) ___-____" });

  // UI FILE INPUT
  $('.ui-avatar-file input').on('change', function (e) {
    var fileName = e.currentTarget.files[0].name;
    $(this).parent().find('label span').text(fileName);
  });

  // INPUTS FOCUS

  // Codedrops based - pure javascript
  (function () {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function () {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call(document.querySelectorAll('.input--dynamic input')).forEach(function (inputEl) {
      // in case the input is already filled..
      if (inputEl.value.trim() !== '') {
        classie.add(inputEl.parentNode, 'input--focused');
      }

      // events:
      inputEl.addEventListener('focus', onInputFocus);
      inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
      classie.add(ev.target.parentNode, 'input--focused');
    }

    function onInputBlur(ev) {
      if (ev.target.value.trim() === '') {
        classie.remove(ev.target.parentNode, 'input--focused');
      }
    }
  })();

  // DROPZONE
  // information on server side implementation
  // http://www.dropzonejs.com/#server-side-implementation

  // Dropzone.autoDiscover = false;

  Dropzone.options.myAwesomeDropzone = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 2, // MB
    thumbnailWidth: 700,
    thumbnailHeight: 250,
    dictDefaultMessage: "Загрузите практическое задание",
    dictFileTooBig: "Файл слишком большой ({{filesize}}MiB). Максимальный размер файла: {{maxFilesize}}MiB.",
    dictInvalidFileType: "Запрещенный тип файла",
    dictResponseError: "Ошибка сервера. Попробуйте еще раз",
    dictCancelUpload: "Отменить загрузку",
    dictCancelUploadConfirmation: "Действительно отментиь загрузку этого файла?",
    dictRemoveFile: "Удалить файл?",
    dictMaxFilesExceeded: "Лимит по количеству файлов привышен",
    accept: function accept(file, done) {
      if (file.name == "justinbieber.jpg") {} else {
        done();
      }
    }
  };

  // WOW INIT
  var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true,
    callback: afterReveal
  });
  wow.init();

  function afterReveal(el) {
    el.addEventListener('animationend', function () {
      $(el).addClass('animation-end');
    });
  }

  ////////////
  // AJAX LOADING
  ///////////

  // load posts on scroll
  _window.scrolled(25, function () {
    if ($('.blog').length > 0) {
      var lastCard = $('.blog-card:last-child');
      var lastChildTop = lastCard.offset().top + lastCard.height();
      var windowPos = _window.scrollTop() + _window.height();
      var loadingOffset = 200;
      var loadingPostion = lastChildTop - loadingOffset;

      if (windowPos > loadingPostion) {
        loadBlogPosts($('.js-ajaxBlogContainer').data('offset'));
      }
    }
    // community
    if ($('.projects-list').length > 0) {
      var lastCard = $('.project:last-child');
      var lastChildTop = lastCard.offset().top + lastCard.height();
      var windowPos = _window.scrollTop() + _window.height();
      var loadingOffset = 200;
      var loadingPostion = lastChildTop - loadingOffset;

      if (windowPos > loadingPostion) {
        loadCommunityPosts($('.js-ajaxCommunityContainer').data('offset'));
      }
    }
  });

  var stopBlogPostAjaxBinding = false;

  function loadBlogPosts(offset) {
    // get the last blog card id
    var lastPost = $('.blog-card:last-child').data('id');
    if (!stopBlogPostAjaxBinding) {
      $.ajax({
        url: 'blog-ajax.html',
        type: 'get',
        data: {
          startFrom: lastPost,
          offset: offset
        },
        success: function success(data) {
          // this should return actual html to be appended
          // dummy function to emulate offset - remove for production
          var appendedData = [];
          var lastAjaxPost = $(data).last().data('id');
          if (lastPost >= lastAjaxPost - offset) {
            stopBlogPostAjaxBinding = true;
          }

          $(data).each(function (i, val) {
            var objectId = $(val).data('id');
            if (objectId && objectId > lastPost && objectId <= lastPost + offset) {
              appendedData.push($(val));
            }
          });

          // append just data object in production
          $(".js-ajaxBlogContainer").append(appendedData);
        }
      });
    }
  };

  // COMMUNITY AJAX
  var stopCommunityPostAjaxBinding = false;

  function loadCommunityPosts(offset) {
    // get the last blog card id
    var lastPost = $('.project:last-child').data('id');
    if (!stopCommunityPostAjaxBinding) {
      $.ajax({
        url: 'community-ajax.html',
        type: 'get',
        data: {
          startFrom: lastPost,
          offset: offset
        },
        success: function success(data) {
          // this should return actual html to be appended
          // dummy function to emulate offset - remove for production
          var appendedData = [];
          var lastAjaxPost = $(data).last().data('id');
          if (lastPost >= lastAjaxPost - offset) {
            stopCommunityPostAjaxBinding = true;
          }

          $(data).each(function (i, val) {
            var objectId = $(val).data('id');
            if (objectId && objectId > lastPost && objectId <= lastPost + offset) {
              appendedData.push($(val));
            }
          });

          // append just data object in production
          $(".js-ajaxCommunityContainer").append(appendedData);
        }
      });
    }
  };

  // LANDING CTA
  $.fn.digits = function () {
    return this.each(function () {
      $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    });
  };

  // .prop('Counter',0).animate({
  //     Counter: $(this).text()
  // }, {
  //     duration: 2000,
  //     easing: 'swing',
  //     step: function (now) {
  //         $(this).text(Math.ceil(now)).digits();
  //     }
  // });

  var ctaPriceObj = $('.js-form-landingCta').closest('form').find('.course-price__value');
  var savedPriceOnLoad = parseInt(ctaPriceObj.text().replace(' ', ''));
  $('.js-form-landingCta').on('change', function (e) {

    // change price
    var priceAdded = 0;
    var pricedCheckboxes = $(this).find('input[type="checkbox"]:checked');

    pricedCheckboxes.each(function (i, val) {
      var price = $(val).parent().data('price');
      if (price) {
        priceAdded = priceAdded + price;
      }
    });

    var priceAddedObj = savedPriceOnLoad + priceAdded;

    ctaPriceObj.text(priceAddedObj + ' Р');

    // set opt fields depending on options
    var toggaleChecboxes = $(this).find('[data-type]');
    if (toggaleChecboxes) {
      var covertArr = function covertArr(arr) {
        $.each(arr, function (ind, value) {
          checkboxData.push(value);
        });
      };

      // sort Array for doubles


      // check each checkbox
      var rawData = [];
      var checkboxData = [];
      toggaleChecboxes.each(function (i, val) {
        // if checked, parse array of all options
        if ($(val).find('input:checked').parent().data('type')) {
          rawData.push($(val).data('type').split(' '));
        }
      });

      // convert to single arr
      $.each(rawData, function (i, val) {
        covertArr(val);
      });

      var checkboxDataSorted = [];
      $.each(checkboxData, function (i, e) {
        if ($.inArray(e, checkboxDataSorted) == -1) checkboxDataSorted.push(e);
      });

      // set visibility
      $(this).find('.ui-group').each(function (ind, value) {
        if ($(value).data('for')) {
          if ($.inArray($(value).data('for'), checkboxDataSorted) == -1) {
            $(value).removeClass('active');
          } else {
            $(value).addClass('active');
          }
        }
      });
    }

    e.stopPropagation();
    e.preventDefault();
  });

  $('.js-form-landingCta input[type="checkbox"]').on('change', function () {
    // Change button status

    var _that = $(this);
    // find attached checkbox
    var attachedBtn;
    $('.js-btnAddForm').each(function (i, val) {
      if ($(val).data('checkbox') == _that.attr("id")) {
        attachedBtn = $(val);
        toggleButton($(val));
      }
    });
  });

  // CHECK CHECKBOX ON BTN CLICK
  $('.js-btnAddForm').on('click', function () {

    if ($(this).data('checkbox')) {
      toggleButton($(this));
      $('.course-cta').find('form').change();
    }
  });

  function toggleButton(that) {
    var getCheckox = that.data('checkbox');

    if (that.is('.disabled')) {
      that.removeClass('disabled');
      that.find('span').text('добавить к заказу');
      $('.course-cta input#' + getCheckox + '').prop('checked', false);
    } else {
      that.addClass('disabled');
      that.find('span').text('добавлено к заказу');
      $('.course-cta input#' + getCheckox + '').prop('checked', true);
    }
  }

  // SHOW SELECTED IMAGE
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.js-pasteSelected').attr('src', e.target.result);
        $('.js-pasteSelected').addClass('showing');
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $('.js-showSelectedImage').on('change', function () {
    readURL(this);
  });

  $('.js-uploadImage').on('change', function () {
    readURL(this);
  });
});

//SCROLL TO TOP ON PAGE REFRESH
// $(window).on('beforeunload', function() {
//     $(window).scrollTop(0);
// });