import { withPluginApi, decorateCooked } from 'discourse/lib/plugin-api';

export default {
  name: "image-gallery",
  initialize(container) {
    const siteSettings = container.lookup('site-settings:main');
    const gallerySettings = {
      dimensions: {
        width: parseInt(siteSettings.image_gallery_thumbnail_width),
        height: parseInt(siteSettings.image_gallery_thumbnail_height)
      },
      allowableChildren: siteSettings.image_gallery_allowable_children
    }

    const gallerizeWithSettings = ($elem) => {
      $('.image-gallery', $elem).removeClass('image-gallery').addClass('discourse-image-gallery').ImageGallery(gallerySettings);
    }

    const initializer = (api) => api.decorateCooked(gallerizeWithSettings);

    if (siteSettings.image_gallery_enabled) {
      withPluginApi('0.5', initializer, { noApi: () => decorateCooked(container, gallerizeWithSettings) });
    }
  }
};
