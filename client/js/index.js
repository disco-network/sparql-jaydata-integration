define(["disco.ontology"], function(disco) {
  x = disco;
  let discoContext = disco.createContext('http://localhost:52999');
  discoContext.Posts.filter(function(it) { return it.Id == '1' }).toArray().then(function(posts) {
    console.log(posts);
  });
});
