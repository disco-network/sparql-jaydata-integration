import * as disco from "disco.ontology";

let discoContext = disco.createContext("http://localhost:52999");
discoContext.Posts.add(new disco.Ontology.Post({ ContentId: 1 }));
discoContext.saveChanges(post => {
  console.log("POST result: ", post);
  discoContext.Posts.filter(function(it) { return it.ContentId === "1"; }).toArray().then(function(posts) {
    console.log("GET result: ", posts);
  });
});
