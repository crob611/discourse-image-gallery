(function() {
  var buildImageGallery = function($gallery, opts) {
    console.log($gallery[0].innerHTML);
    stripNonImages($gallery, opts.allowableChildren);
    $gallery.find("img").wrap('<div class="image-wrapper"></div>');
    $gallery.find(".image-wrapper").css({
      height: opts.dimensions.height,
      width: opts.dimensions.width
    })

    $gallery.find("img").each(function() {
      var $this = $(this);
      scaleImage($this, opts.dimensions);
      centerImage($this, opts.dimensions);
    });
  }

  var stripNonImages = function($element, allowableChildrenSelector) {
    $element.find(" > :not(" + allowableChildrenSelector + ")").remove();
  }

  var scaleImage = function($image, dimensions) {
    var height = 0, width = 0, heightRatio = 1, widthRatio = 1, ratio = 1;

    height = parseInt($image.attr("height"), 10);
    width = parseInt($image.attr("width"), 10);

    if(isNaN(height)) {
      height = $image.height();
    }
    if(isNaN(width)) {
      width = $image.width();
    }

    heightRatio  = Math.min(dimensions.height / height, 1);
    widthRatio = Math.min(dimensions.width / width, 1);

    ratio = Math.max(heightRatio, widthRatio);

    $image.attr("height", parseInt(height * ratio));
    $image.attr("width", parseInt(width * ratio));
  }

  var centerImage = function($image, dimensions) {
    var height = $image.attr("height"), 
        width = $image.attr("width");


    var heightOffset = parseInt((height - dimensions.height) / 2);
    var widthOffset = parseInt((width - dimensions.width) / 2);

    $image.css({
      top: -1 * heightOffset,
      left: -1 * widthOffset
    });
  }

  $.fn.DiscourseImageGallery = function(options) {
    var defaults = { dimensions: {width: 200, height: 200}, allowableChildren: "img" },
        opts = $.extend(defaults, options || {});

    return this.each(function() {
      buildImageGallery($(this), opts);
    });
  };
})();
