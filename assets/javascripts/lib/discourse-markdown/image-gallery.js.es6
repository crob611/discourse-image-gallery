import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features['image-gallery'] = siteSettings.image_gallery_enabled;
});

function insertGallery(_, gallery) {
  return `<div class='image-gallery'>${gallery}</div>`;
}

function buildImageGallery(text = "") {
  while (text !== (text = text.replace(/\[gallery\]((?:(?!\[gallery\]|\[\/gallery\])[\S\s])*)\[\/gallery\]/ig, insertGallery)));
  return text;
}

export function setup(helper) {
  helper.whiteList([ 'div.image-gallery' ]);
  helper.addPreProcessor(buildImageGallery);
}
