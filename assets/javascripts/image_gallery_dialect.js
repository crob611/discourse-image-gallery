(function() {
  function replaceImageGalery (text) {
    text.replace("[image-gallery]","<p><div class='discourse-image-gallery;'>".concat(contents.join('\n')));
    text.replace("[/image-gallery]","</div></p>");
    return text;
  }

  Discourse.Dialect.addPreProcessor(replaceImageGalery);
})();
