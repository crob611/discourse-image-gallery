/**
  Apply image gallery when the app boots
  **/
  import { withPluginApi, decorateCooked } from 'discourse/lib/plugin-api';
  import ComposerController from 'discourse/controllers/composer';

  function spoil($elem) {
    let dimensions = function() {
      return {
        width: parseInt("200", 10),
        height: parseInt("200", 10)  
      }
    };

    let allowableChildren = function() {
      return ".lightbox-wrapper, img";
    };

    if($('.discourse-image-gallery:not(.built)', $elem).length) {
      $('.discourse-image-gallery:not(.built)', $elem)
      .addClass('built')
      .DiscourseImageGallery({
        dimensions: dimensions(),
        allowableChildren: allowableChildren()
      });
    }
    /*$('.spoiler', $elem).removeClass('spoiler').addClass('spoiled').spoil();*/
  }

  function initializeGallery(api) {  

    api.decorateCooked(spoil);

    api.addToolbarPopupMenuOptionsCallback(() => {
      return {
        action: 'insertGallery',
        icon: 'magic',
        label: 'gallery.title'
      };
    });

    ComposerController.reopen({
      actions: {
        insertGallery() {
          this.get("toolbarEvent").applySurround("[image-gallery]", "[/image-gallery]", "gallery_content");
        }
      }
    });
  }

  export default {
    name: "apply-gallery",
    initialize(container) {
      const siteSettings = container.lookup('site-settings:main');
      if (siteSettings.gallery_enabled) {
        withPluginApi('0.5', initializeGallery, { noApi: () => decorateCooked(container, spoil) });
      }
    }
  };
