(function() {
  if (Discourse.dialect_deprecated) { 
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    return; 
  }

  Discourse.Markdown.whiteListTag('div', 'class', 'discourse-image-gallery');
  Discourse.Dialect.replaceBlock({
    start: /(\[image\-gallery\])([\s\S]*)/igm,
    stop: /\[\/image\-gallery\]/igm,
    //rawContents: true,
    emitter: function(contents) {
      var thing = ['p', ['div', { 'class': 'discourse-image-gallery'}].concat(contents.join("\n"))];
      return thing;
    }
  });
})();
