import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features['gallery-alert'] = !!siteSettings.gallery_enabled;
});

function insertGallery(_, cont) {
  return `<div class='discourse-image-gallery'>${cont}</div>`;
}

function replaceGallery(text) {
  text = text || "";
  while (text !== (text = text.replace(/\[image\-gallery\]((?:(?!\[image\-gallery\]|\[\/image\-gallery\])[\S\s])*)\[\/image\-gallery\]/ig, insertGallery)));
  return text;
}

export function setup(helper) {
  helper.whiteList([ 'div.discourse-image-gallery' ]);
  helper.addPreProcessor(replaceGallery);
}
