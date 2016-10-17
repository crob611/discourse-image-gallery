(function() {
  function replaceImageGalery (text) {
    text = text.replace("[image-gallery]","<p><div class='discourse-image-gallery;'>");
    text = text.replace("[/image-gallery]","</div></p>");
    return text;
}

  Discourse.Dialect.addPreProcessor(replaceImageGalery);
})();
