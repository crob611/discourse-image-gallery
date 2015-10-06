/**
  Apply image gallery when the app boots
**/
import { decorateCooked } from 'discourse/lib/plugin-api';

export default {
  name: "image-gallery",
  initialize: function(container) {
    let dimensions = function() {
      return {
        width: parseInt(Discourse.SiteSettings.image_gallery_thumbnail_width, 10),
        height: parseInt(Discourse.SiteSettings.image_gallery_thumbnail_height, 10)  
      }
    };

    let allowableChildren = function() {
      return Discourse.SiteSettings.image_gallery_allowable_children;
    };

    decorateCooked(container, function($elem) {
      let settings = Discourse.SiteSettings.image
      if($('.discourse-image-gallery:not(.built)', $elem).length) {
        $('.discourse-image-gallery:not(.built)', $elem)
          .addClass('built')
          .DiscourseImageGallery({
            dimensions: dimensions(),
            allowableChildren: allowableChildren()
          });
      }
    });
  }
};