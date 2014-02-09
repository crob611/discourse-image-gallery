(function() {
  
  Discourse.addInitializer(function () {
    var dimensions = function() {
      return {
        width: parseInt(Discourse.SiteSettings.image_gallery_thumbnail_width),
        height: parseInt(Discourse.SiteSettings.image_gallery_thumbnail_height)  
      }
    }

    var allowableChildren = function() {
      return Discourse.SiteSettings.image_gallery_allowable_children;
    }

    var buildImageGalleries = function($post) {
      var $target = $post ? $post : $("body");

      $target.find("div.discourse-image-gallery:not(.built)").ImageGallery(
          {
            dimensions: dimensions(),
            allowableChildren: allowableChildren()
          }
      ).addClass("built");
    };

    Em.run.next(function() {
      buildImageGalleries();

      Discourse.PostView.prototype.on("postViewInserted", buildImageGalleries);
      Discourse.ComposerView.prototype.on("previewRefreshed", buildImageGalleries);
    });
  });

})();

