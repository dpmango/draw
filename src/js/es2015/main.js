$(document).ready(function(){

  //////////
  // Global variables
  //////////

  const _window = $(window);
  const _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }
  // isRetinaDisplay()


  //////////
  // COMMON
  //////////

 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Smoth scroll
	$('a[href^="#section"]').click( function() {
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  if ( $('.header-static').length == 0 ){
    _window.scrolled(0, function() { // scrolled is a constructor for scroll delay listener
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var heroHeight = $('.welcome').outerHeight() - headerHeight;

      if ( vScroll > headerHeight + 100 ){
        header.addClass('header--transformed');
        $('.mobile-navi').addClass('mobile-navi--mind-scroll')
      } else {
        header.removeClass('header--transformed');
        $('.mobile-navi').removeClass('mobile-navi--mind-scroll');
      }

      if ( vScroll > 700 ){
        header.addClass('header--fixed');
      } else {
        header.removeClass('header--fixed');
      }
    });
  }

  // header hamburger
  $('.header__hamburger').on('click', function(){
    $(this).toggleClass('active');
    $('.header').toggleClass('header--showing-menu');
    $('.mobile-navi').toggleClass('active');
  });

  // SCROLLBARS
  $('.scrollbar-dynamic').scrollbar();
  $('.scrollbar-macosx').scrollbar();


  // HAMBURGER TOGGLER
  $('.hamburger').on('click', function(){
    $('.hamburger').toggleClass('active');
    $('.mobile-navi').toggleClass('active');
  });

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering
  // user .active for li instead
  $('.header__menu li').each(function(i,val){
    if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
      $(val).addClass('active');
    } else {
      $(val).removeClass('active')
    }
  });


  // VIDEO PLAY
  $('.video__player .icon-circle').on('click', function(){
    $(this).closest('.video__player').toggleClass('playing');
    $(this).closest('.video__player').find('iframe').attr("src", $("iframe").attr("src").replace("autoplay=0", "autoplay=1"));
  });

  // video reveal
  setTimeout(function(){
    $('.video--have-animation').addClass('animation-end');
  },1700);


  // HOMEPAGE INSTAGRAM FEED

  $('.instagram__wrapper').socialfeed({
      // INSTAGRAM
      instagram:{
          accounts: ['#khmelevskoy_s'],  //Array: Specify a list of accounts from which to pull posts
          limit: 3,                                    //Integer: max number of posts to load
          client_id: 'd3e33bddb97d4f15ac8988b8179f407a',       //String: Instagram client id (optional if using access token)
          access_token: '2d4d0ad2bc4c4166b0661486fa190ea7' //String: Instagram access token
      },

      // GENERAL SETTINGS
      length: 400,                                      //Integer: For posts with text longer than this length, show an ellipsis.
      template: "components/social-feed/template.html"
      // template_html:                                  //String: HTML used for each post. This overrides the 'template' filename option
      //   '<article class="twitter-post"> \
      //   <h4>{{=it.author_name}}</h4><p>{{=it.text}}  \
      //   <a href="{{=it.link}}" target="_blank">read more</a> \
      //   </p> \
      //   </article>',
  });

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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          adaptiveHeight: true
        }
      }
    ]
  });

  // slick pagination
  $('.testimonials__slide__nav .icon-slide-next').on('click', function(){
    $('.testimonials__slider').slick('slickNext');
  });
  $('.testimonials__slide__nav .icon-slide-prev').on('click', function(){
    $('.testimonials__slider').slick('slickPrev');
  });

  // simulate click
  $('.testimonials__slide__nav--single').on('click', function(){
    $(this).find('.icon').click();
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
    responsive: [
      {
        breakpoint: 414,
        settings: "unslick"
      }
    ]
  }
  _thumbsSlick.slick(_thumbsSlickOptions);

  _window.resized(100, function(e){
    if ( _window.width() < 414 ) {
      if (_thumbsSlick.hasClass('slick-initialized')) {
        _thumbsSlick.slick('unslick');
      }
      return
    }
    if (!_thumbsSlick.hasClass('slick-initialized')) {
      return _thumbsSlick.slick(_thumbsSlickOptions);
    }
  });

  // thumbs
  $('.slider-thumbs__slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var thumbs = slick.$slider.parent().find('.slider-thumbs__thumb');
    thumbs.each(function(i,val){
      console.log( $(val).data('slide') );
      console.log(nextSlide);
      if ( ( $(val).data('slide') - 1 ) == nextSlide ){
        $(val).siblings().removeClass('active');
        $(val).addClass('active');
      }
    });
  });
  // clicking thumbs
  $('.slider-thumbs__thumb').on('click', function(){
    $('.slider-thumbs__slider').slick('slickGoTo', $(this).data('slide') - 1);
  });





  //////////
  // MODALS
  //////////
  // Custom modals
  // $('*[data-modal]').on('click', function(){
  //   // remove all active first
  //   $('.modal').removeClass('opened');
  //
  //   // find by id
  //   var target = $(this).data('modal');
  //   $('#'+target).addClass('opened');
  //
  //   window.location.hash = target;
  // });
  //
  // $('.modal__close').on('click', function(){
  //   $(this).closest('.modal').removeClass('opened');
  //   window.location.hash = "";
  // });
  //
  // // CHECK SAVED STATE
  // if(window.location.hash) {
  //   var hash = window.location.hash.substring(1);
  //   $('#'+hash).addClass('opened');
  // }
  //


  // Magnific Popup
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
      beforeOpen: function() {
        // startWindowScroll = _window.scrollTop();
        // $('html').addClass('mfp-helper');
      },
      close: function() {
        // $('html').removeClass('mfp-helper');
        // _window.scrollTop(startWindowScroll);
      }
    }
  });


  // $('.popup-with-move-anim').magnificPopup({
  //   type: 'inline',
  //   fixedContentPos: false,
  //   fixedBgPos: true,
  //   overflowY: 'auto',
  //   closeBtnInside: true,
  //   preloader: false,
  //   midClick: true,
  //   removalDelay: 300,
  //   mainClass: 'my-mfp-slide-bottom'
  // });
  //
  // $('.popup-gallery').magnificPopup({
	// 	delegate: 'a',
	// 	type: 'image',
	// 	tLoading: 'Loading image #%curr%...',
	// 	mainClass: 'mfp-img-mobile',
	// 	gallery: {
	// 		enabled: true,
	// 		navigateByImgClick: true,
	// 		preload: [0,1]
	// 	},
	// 	image: {
	// 		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
	// 	}
	// });

  ////////////
  // SALES PAGE
  ////////////
  $('.js-toggleProgramCourses').on('click', function(){
    var toggableObjects = $(this).closest('.course-program__wrapper').find('.course-program__item[data-visible="0"]');
    if ( $(this).data('action') == "open" ){
      toggableObjects.slideDown();
      $(this).data('action', 'close');
      $(this).find('span').text('показать краткую программу')
    } else {
      toggableObjects.slideUp();
      $(this).data('action', 'open');
      $(this).find('span').text('развернуть всю программу')
    }
  });

  // UNIVERSAL TOGGLER
  var togglerSavedText ;
  $('.js-togglerPluginTrigger').on('click', function(){
    var toggableObjects = $(this).closest('.js-togglerPlugin').find('div[data-visible="0"]');
    if ( $(this).data('action') == "open" ){
      toggableObjects.slideDown();
      $(this).data('action', 'close');
      togglerSavedText = $(this).find('span').text();
      $(this).find('span').text( $(this).data('text') )
    } else {
      toggableObjects.slideUp();
      $(this).data('action', 'open');
      $(this).find('span').text(togglerSavedText)
    }
  });


  if ( $('.course-fixed').length > 0 ){
    _window.scrolled(10, function() { // scrolled is a constructor for scroll delay listener
      var vScroll = _window.scrollTop();
      var el = $('.course-fixed');

      if ( vScroll > 700 ){
        el.addClass('visible');
      } else {
        el.removeClass('visible');
      }
    });
  }

  ////////////
  // LESSON
  ////////////

  // sidebar scroll
  if ( $('.lesson__sidebar').length > 0 ){
    _window.scrolled(20, function(){
      var vScroll = _window.scrollTop();

      if ( _window.width() > 768 && vScroll > $('.header').height()){
        $('.lesson__control').css('margin-top', '20px');
      } else {
        $('.lesson__control').css('margin-top', '140px');
      }
    });
  }

  // set active class - should be removed in production
  $('.lesson__roadmap__item').on('click', function(){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });

  // toggler
  var savedSidebarTogglerText
  $('.lesson__sidebar__toggler').on('click', function(){
    $(this).parent().find('.lesson__sidebar__content').slideToggle();

    if ( $(this).data('action') == 'show' ){
      savedSidebarTogglerText = $(this).find('span').text();
      $(this).find('span').text( $(this).data('text-hidden') );
      $(this).data('action', 'hide');
    } else {
      $(this).find('span').text( savedSidebarTogglerText );
      $(this).data('action', 'show');
    }

  });


  ////////////
  // UI
  ////////////

  // custom selects
  $('.ui-select__visible').on('click', function(e){
    var that = this
    // hide parents
    $(this).parent().parent().parent().find('.ui-select__visible').each(function(i,val){
      if ( !$(val).is($(that)) ){
        $(val).parent().removeClass('active')
      }
    });

    $(this).parent().toggleClass('active');
  });

  $('.ui-select__dropdown span').on('click', function(){
    // parse value and toggle active
    var value = $(this).data('val');
    if (value){
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

    $.each(container, function(key, value) {
        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
            $(value).removeClass('active');
        }
    });
  });

  // numeric input
  $('.ui-number span').on('click', function(e){
    var element = $(this).parent().find('input');
    var currentValue = parseInt($(this).parent().find('input').val()) || 0;

    if( $(this).data('action') == 'minus' ){
      if(currentValue <= 1){
        return false;
      }else{
        element.val( currentValue - 1 );
      }
    } else if( $(this).data('action') == 'plus' ){
      if(currentValue >= 99){
        return false;
      } else{
        element.val( currentValue + 1 );
      }
    }
  });


  // toggler
  $('.ui__toggler__box').on('click', function(){
    var parentObj = $(this).parent();
    if ( parentObj.is('.right') ){
      parentObj.removeClass('right').addClass('left');
      parentObj.find('input').val('0')
    } else if ( parentObj.is('.left') ){
      parentObj.removeClass('left').addClass('right');
      parentObj.find('input').val('1');
    }
  });

  // emulate click
  $('.ui__toggler label').on('click', function(){
    $(this).parent().find('.ui__toggler__box').click();
  });

  // toggler populate inputs
  $('.ui__toggler').each(function(i,val){
    if ( $(val).is('.left') ){
      $(this).find('input').val('0');
    } else if ( $(val).is('.right') ){
      $(this).find('input').val('1');
    }
  });


  // Masked input
  $(".js-dateMask").mask("99.99.9999");
  $(".js-dateMask2").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
  $(".js-indexMask").mask("999 999",{placeholder:"000 000"});
  $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});

  // DATEPICKER
  $('.js-datepicker').datepicker({
    language: 'en',
    range: true,
    multipleDatesSeparator: " - "
  });

  // RANGESLIDER
  var rangeSlider = document.querySelector('.js-rangeslider');

  if ( $('.js-rangeslider').length > 0 ){
    noUiSlider.create( rangeSlider, {
    	start: [ 90, 120 ],
      connect: true,
      tooltips: true,
      step: 1,
      // pips: { // Show a scale with the slider
    	// 	mode: 'steps',
    	// 	stepped: true,
    	// 	density: 4
    	// },
    	range: {
    		'min': [  80 ],
    		'max': [ 120 ]
    	}
    });

    // method to get current value
    // rangeSlider.noUiSlider.get();

    // docs on noUiSlider
    // https://refreshless.com/nouislider/slider-read-write/

  }


  // UI FILE INPUT
  $('.ui-avatar-file input').on('change', function(e){
    var fileName = e.currentTarget.files[0].name
    $(this).parent().find('label span').text(fileName)
  });

  // STICKY MAP RESULTS
  // _window.scrolled(10, function () {
  //   var stickyEl = $('.results__map');
  //   var windowBottomScroll = _window.scrollTop() + _window.height();
  //   var stopPoint = _document.height() - $('footer').outerHeight();
  //
  //   if (windowBottomScroll >= stopPoint) {
  //     stickyEl.addClass('results__map--stop');
  //   } else if (windowBottomScroll < stopPoint) {
  //     stickyEl.removeClass('results__map--stop');
  //   }
  // });

  // OPTIONAL
  // hero parallax on mousemove

  // var movementStrength = 50;
  // var height = movementStrength / _window.height();
  // var width = movementStrength / _window.width();
  // $(".hero").mousemove(function(e){
  //   var pageX = e.pageX - (_window.width() / 2);
  //   var pageY = e.pageY - (_window.height() / 2);
  //   var newvalueX = width * pageX * -1 - 25;
  //   var newvalueY = height * pageY * -1 - 50;
  //   $('.hero-bg').css("background-position", newvalueX+"px     "+newvalueY+"px");
  // });

  // INPUTS FOCUS

  // Codedrops based - pure javascript
  (function() {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call( document.querySelectorAll( '.input--dynamic input' ) ).forEach( function( inputEl ) {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--focused' );
      }

      // events:
      inputEl.addEventListener( 'focus', onInputFocus );
      inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
      classie.add( ev.target.parentNode, 'input--focused' );
    }

    function onInputBlur( ev ) {
      if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--focused' );
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
    accept: function(file, done) {
      if (file.name == "justinbieber.jpg") {

      } else {
        done();
      }
    },
    dictDefaultMessage: "Загрузите практическое задание",
    dictFileTooBig: "Файл слишком большой ({{filesize}}MiB). Максимальный размер файла: {{maxFilesize}}MiB.",
    dictInvalidFileType: "Запрещенный тип файла",
    dictResponseError: "Ошибка сервера. Попробуйте еще раз",
    dictCancelUpload: "Отменить загрузку",
    dictCancelUploadConfirmation: "Действительно отментиь загрузку этого файла?",
    dictRemoveFile: "Удалить файл?",
    dictMaxFilesExceeded: "Лимит по количеству файлов привышен"
  };

  // WOW INIT
  var wow = new WOW({
    boxClass:     'wow',
    animateClass: 'animated',
    offset:       0,
    mobile:       true,
    live:         true,
    callback: afterReveal
  });
  wow.init();

  function afterReveal (el) {
  	el.addEventListener('animationend', function () {
  		$(el).addClass('animation-end')
  	});
  }


  ////////////
  // AJAX LOADING
  ///////////

  // $('.js-loadBlogPosts').on('click', function(){
  //   var offset = $(this).data('offset');
  //   loadBlogPosts(offset);
  // });

  // load posts on scroll
  _window.scrolled(25, function(){
    if ( $('.blog').length > 0 ){
      var lastCard = $('.blog-card:last-child')
      var lastChildTop = lastCard.offset().top + lastCard.height();
      var windowPos = _window.scrollTop() + _window.height();
      var loadingOffset = 200;
      var loadingPostion = lastChildTop - loadingOffset;

      if ( windowPos > loadingPostion ){
        loadBlogPosts( $('.js-ajaxBlogContainer').data('offset') );
      }
    }
    // community
    if ( $('.projects-list').length > 0 ){
      var lastCard = $('.project:last-child')
      var lastChildTop = lastCard.offset().top + lastCard.height();
      var windowPos = _window.scrollTop() + _window.height();
      var loadingOffset = 200;
      var loadingPostion = lastChildTop - loadingOffset;

      if ( windowPos > loadingPostion ){
        loadCommunityPosts( $('.js-ajaxCommunityContainer').data('offset') );
      }
    }
  });

  var stopBlogPostAjaxBinding = false;

  function loadBlogPosts(offset){
    // get the last blog card id
    var lastPost = $('.blog-card:last-child').data('id');
    if ( !stopBlogPostAjaxBinding ){
      $.ajax({
        url: 'blog-ajax.html',
        type: 'get',
        data: {
          startFrom: lastPost,
          offset: offset
        },
        success : function (data) {
          // this should return actual html to be appended
          // dummy function to emulate offset - remove for production
          var appendedData = [];
          var lastAjaxPost = $(data).last().data('id');
          if (lastPost >= lastAjaxPost - offset ){
            stopBlogPostAjaxBinding = true;
          }

          $(data).each(function(i, val){
            var objectId = $(val).data('id');
            if ( objectId && objectId > lastPost && objectId <= lastPost + offset ){
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

  function loadCommunityPosts(offset){
    // get the last blog card id
    var lastPost = $('.project:last-child').data('id');
    if ( !stopCommunityPostAjaxBinding ){
      $.ajax({
        url: 'community-ajax.html',
        type: 'get',
        data: {
          startFrom: lastPost,
          offset: offset
        },
        success : function (data) {
          // this should return actual html to be appended
          // dummy function to emulate offset - remove for production
          var appendedData = [];
          var lastAjaxPost = $(data).last().data('id');
          if (lastPost >= lastAjaxPost - offset ){
            stopCommunityPostAjaxBinding = true;
          }

          $(data).each(function(i, val){
            var objectId = $(val).data('id');
            if ( objectId && objectId > lastPost && objectId <= lastPost + offset ){
              appendedData.push($(val));
            }
          });

          // append just data object in production
          $(".js-ajaxCommunityContainer").append(appendedData);
        }
      });
    }

  };


});


//SCROLL TO TOP ON PAGE REFRESH
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});
