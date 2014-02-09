(function() {
  Discourse.Dialect.replaceBlock({
    start: /(\[image\-gallery\])([\s\S]*)/igm,
    stop: '[/image-gallery]',
    //rawContents: true,
    emitter: function(contents) {
      return ['p', ['div', { 'class': 'discourse-image-gallery'}].concat(contents.join("\n"))];
    }
  });
})();