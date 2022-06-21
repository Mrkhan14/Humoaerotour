$(document).ready(function() {
  $(".send-file").change(function() {
    $(this).addClass("active");
    $(".sended-file-icon").addClass("d-block");
    var files = document.getElementById("send-file").files.length;

    for (var i = 0; i < files; i++) {
      $(".file-placeholder").append(`
        <div class="file-list">
          <span class="file-list__name">${event.target.files[i].name}</span>
          <span class="file-list__remove pointer">x</span>
        </div>
      `);
    }

    console.dir($("#send-file")[0].files);
  });

  $(".file-placeholder").on("click", ".file-list", function() {
    $(this).remove();
    if ($(".file-list").length === 0) {
      $(".send-file").removeClass("active");
      $(".sended-file-icon").removeClass("d-block");
    }
  });

  $('[data-toggle="menu"]').click(function() {
    $(".mobile-navigation-menu")
      .fadeIn()
      .addClass("active");
    $(".mobile-navigation-overlay").fadeIn();
  });

  $('[data-dismiss="menu"]').click(function() {
    $(".mobile-navigation-menu").removeClass("active");
    setTimeout(() => {
      $(".mobile-navigation-overlay, .mobile-navigation-menu").fadeOut();
    }, 500);
  });

  $(".datepicker-here").data("datepicker");

  $(".modal-button").click(function(e) {
    e.preventDefault();
    $("body").addClass("hidden");
    $(".modal-wrapper").fadeIn();
    setTimeout(() => {
      $(".modal-wrapper").addClass("active");
    }, 400);
  });

  $(".modal-wrapper__overlay").click(function() {
    $(".modal-wrapper").removeClass("active");
    $("body").removeClass("hidden");
    $(".modal-wrapper").fadeOut();
  });

  $(document).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $(".header").addClass("header-scroll");
    } else {
      $(".header").removeClass("header-scroll");
    }
  });

  $(".scroll-top").click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      600
    );
    return false;
  });

  TweenMax.staggerFromTo(
    ".features-list .card",
    0.7,
    {
      opacity: 0,
      y: 100
    },
    {
      opacity: 1,
      y: 0
    },
    0.3
  );

  TweenMax.staggerFrom(
    ".features-text",
    0.7,
    {
      opacity: 0,
      y: 100
    },
    0.3
  );

  var slideshowDuration = 4000;
  var slideshow = $(".main-content .slideshow");

  function slideshowSwitch(slideshow, index, auto) {
    if (slideshow.data("wait")) return;

    var slides = slideshow.find(".slide");
    var pages = slideshow.find(".pagination");
    var activeSlide = slides.filter(".is-active");
    var activeSlideImage = activeSlide.find(".image-container");
    var newSlide = slides.eq(index);
    var newSlideImage = newSlide.find(".image-container");
    var newSlideContent = newSlide.find(".slide-content");
    var newSlideElements = newSlide.find(".caption > *");
    if (newSlide.is(activeSlide)) return;

    newSlide.addClass("is-new");
    var timeout = slideshow.data("timeout");
    clearTimeout(timeout);
    slideshow.data("wait", true);
    var transition = slideshow.attr("data-transition");
    if (transition == "fade") {
      newSlide.css({
        display: "block",
        zIndex: 2
      });
      newSlideImage.css({
        opacity: 0
      });

      TweenMax.to(newSlideImage, 1, {
        alpha: 1,
        onComplete: function() {
          newSlide.addClass("is-active").removeClass("is-new");
          activeSlide.removeClass("is-active");
          newSlide.css({
            display: "",
            zIndex: ""
          });
          newSlideImage.css({
            opacity: ""
          });
          slideshow.find(".pagination").trigger("check");
          slideshow.data("wait", false);
          if (auto) {
            timeout = setTimeout(function() {
              slideshowNext(slideshow, false, true);
            }, slideshowDuration);
            slideshow.data("timeout", timeout);
          }
        }
      });
    } else {
      if (newSlide.index() > activeSlide.index()) {
        var newSlideRight = 0;
        var newSlideLeft = "auto";
        var newSlideImageRight = -slideshow.width() / 8;
        var newSlideImageLeft = "auto";
        var newSlideImageToRight = 0;
        var newSlideImageToLeft = "auto";
        var newSlideContentLeft = "auto";
        var newSlideContentRight = 0;
        var activeSlideImageLeft = -slideshow.width() / 4;
      } else {
        var newSlideRight = "";
        var newSlideLeft = 0;
        var newSlideImageRight = "auto";
        var newSlideImageLeft = -slideshow.width() / 8;
        var newSlideImageToRight = "";
        var newSlideImageToLeft = 0;
        var newSlideContentLeft = 0;
        var newSlideContentRight = "auto";
        var activeSlideImageLeft = slideshow.width() / 4;
      }

      newSlide.css({
        display: "block",
        width: 0,
        right: newSlideRight,
        left: newSlideLeft,
        zIndex: 2
      });

      newSlideImage.css({
        width: slideshow.width(),
        right: newSlideImageRight,
        left: newSlideImageLeft
      });

      newSlideContent.css({
        width: slideshow.width(),
        left: newSlideContentLeft,
        right: newSlideContentRight
      });

      activeSlideImage.css({
        left: 0
      });

      TweenMax.set(newSlideElements, {
        y: 20,
        force3D: true
      });
      TweenMax.to(activeSlideImage, 1, {
        left: activeSlideImageLeft,
        ease: Power3.easeInOut
      });

      TweenMax.to(newSlide, 1, {
        width: slideshow.width(),
        ease: Power3.easeInOut
      });

      TweenMax.to(newSlideImage, 1, {
        right: newSlideImageToRight,
        left: newSlideImageToLeft,
        ease: Power3.easeInOut
      });

      TweenMax.staggerFromTo(
        newSlideElements,
        0.8,
        {
          alpha: 0,
          y: 60
        },
        {
          alpha: 1,
          y: 0,
          ease: Power3.easeOut,
          force3D: true,
          delay: 0.6
        },
        0.1,
        function() {
          newSlide.addClass("is-active").removeClass("is-new");
          activeSlide.removeClass("is-active");
          newSlide.css({
            display: "",
            width: "",
            left: "",
            zIndex: ""
          });

          newSlideImage.css({
            width: "",
            right: "",
            left: ""
          });

          newSlideContent.css({
            width: "",
            left: ""
          });

          newSlideElements.css({
            opacity: "",
            transform: ""
          });

          activeSlideImage.css({
            left: ""
          });

          slideshow.find(".pagination").trigger("check");
          slideshow.data("wait", false);
          if (auto) {
            timeout = setTimeout(function() {
              slideshowNext(slideshow, false, true);
            }, slideshowDuration);
            slideshow.data("timeout", timeout);
          }
        }
      );
    }
  }

  function slideshowNext(slideshow, previous, auto) {
    var slides = slideshow.find(".slide");
    var activeSlide = slides.filter(".is-active");
    var newSlide = null;
    if (previous) {
      newSlide = activeSlide.prev(".slide");
      if (newSlide.length === 0) {
        newSlide = slides.last();
      }
    } else {
      newSlide = activeSlide.next(".slide");
      if (newSlide.length == 0) newSlide = slides.filter(".slide").first();
    }

    slideshowSwitch(slideshow, newSlide.index(), auto);
  }

  function homeSlideshowParallax() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > $(window).height()) return;
    var inner = slideshow.find(".slideshow-inner");
    var newHeight = $(window).height() - scrollTop / 2;
    var newTop = scrollTop * 0.8;

    inner.css({
      transform: "translateY(" + newTop + "px)",
      height: newHeight
    });
  }

  $(document).ready(function() {
    $(".slide").addClass("is-loaded");

    $(".slideshow .arrows .arrow").on("click", function() {
      slideshowNext($(this).closest(".slideshow"), $(this).hasClass("prev"));
    });

    $(".slideshow .pagination .item").on("click", function() {
      slideshowSwitch($(this).closest(".slideshow"), $(this).index());
    });

    $(".slideshow .pagination").on("check", function() {
      var slideshow = $(this).closest(".slideshow");
      var pages = $(this).find(".item");
      var index = slideshow.find(".slides .is-active").index();
      pages.removeClass("is-active");
      pages.eq(index).addClass("is-active");
    });

    var timeout = setTimeout(function() {
      slideshowNext(slideshow, false, true);
    }, slideshowDuration);

    slideshow.data("timeout", timeout);
  });

  if ($(".main-content .slideshow").length > 1) {
    $(window).on("scroll", homeSlideshowParallax);
  }

  var timerId,
    i,
    slide = 1;
  var all_slide = $(".slider_main_block > .slider__items");
  var navi = document.createElement("div");

  for (
    navi.className = "navi", $(".slider_main_block").append(navi), i = 0;
    i < all_slide.length;
    i++
  ) {
    var dots = document.createElement("div");
    (dots.className = "dots_" + (i + 1)), $(".navi").append(dots);
  }

  var all_dots = $(".navi>div");

  $(".slider_main_block").removeClass("start");
  $(".slider_main_block>div:first-child").addClass("is-active");
  $(".navi>div:first-child").addClass("is-active");

  Animated();

  setTimeout(function() {
    $(".slider_main_block")
      .removeAttr("style")
      .css("background-color", "#aaa");
  }, 3e3);

  $(all_dots).click(function() {
    (slide = $(this).index()),
      clearInterval(timerId),
      slide < all_slide.length &&
        ((slide += 1),
        $(all_slide).removeClass("is-active"),
        $(all_slide[slide - 1]).addClass("is-active"),
        $(all_dots).removeClass("is-active"),
        $(all_dots[slide - 1]).addClass("is-active")),
      slide == all_slide.length &&
        ($(all_slide).removeClass("is-active"),
        $(all_slide[slide - 1]).addClass("is-active"),
        $(all_dots).removeClass("is-active"),
        $(all_dots[slide - 1]).addClass("is-active"),
        (slide = 0)),
      $(this)
        .parent()
        .parent()
        .addClass("is-stoped");
  });

  function Animated() {
    timerId = setInterval(function() {
      slide < all_slide.length &&
        ((slide += 1),
        $(all_slide).removeClass("is-active"),
        $(all_slide[slide - 1]).addClass("is-active"),
        $(all_dots).removeClass("is-active"),
        $(all_dots[slide - 1]).addClass("is-active")),
        slide == all_slide.length &&
          ($(all_slide).removeClass("is-active"),
          $(all_slide[slide - 1]).addClass("is-active"),
          $(all_dots).removeClass("is-active"),
          $(all_dots[slide - 1]).addClass("is-active"),
          (slide = 0));
    }, 5e3);
  }

  function swipeSlider() {
    clearInterval(timerId),
      slide < all_slide.length &&
        0 < slide &&
        ($(all_slide).removeClass("is-active"),
        $(all_slide[slide - 1]).addClass("is-active"),
        $(all_dots).removeClass("is-active"),
        $(all_dots[slide - 1]).addClass("is-active")),
      slide >= all_slide.length &&
        ($(all_slide).removeClass("is-active"),
        $(all_slide[slide - 1]).addClass("is-active"),
        $(all_dots).removeClass("is-active"),
        $(all_dots[slide - 1]).addClass("is-active"),
        (slide = 0)),
      slide < 0 &&
        ((slide = all_slide.length),
        $(all_slide).removeClass("is-active"),
        $(all_slide[slide - 1]).addClass("is-active"),
        $(all_dots).removeClass("is-active"),
        $(all_dots[slide - 1]).addClass("is-active")),
      $(swipe).removeClass("is-stoped"),
      Animated();
  }
});
