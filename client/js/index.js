define(["require", "exports", "disco.ontology"], function (require, exports, disco) {
    "use strict";
    var discoContext = disco.createContext("http://localhost:52999");
    discoContext.Posts.add(new disco.Ontology.Post({ ContentId: 1 }));
    discoContext.saveChanges(function () {
        discoContext.Posts.filter(function (it) { return it.ContentId === "1"; }).toArray().then(function (posts) {
            console.log(posts);
        });
    });
});
