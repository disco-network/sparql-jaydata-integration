import connect = require("connect");
import config = require("./config");

import { IHttpRequestHandler, IHttpResponseSender } from "odata-rdf-interface/lib/odata";

import { GetHandler, OptionsHandler, PostHandler } from "odata-rdf-interface/lib/bootstrap/adapter/queryengine";
import { Schema } from "odata-rdf-interface/lib/odata/schema";
import { SparqlProvider } from "odata-rdf-interface/lib/sparql/sparql_provider";

import rdfstore = require("rdfstore");
import bodyParser = require("body-parser");

let store = null;
let provider;
let storeName = "http://disco.paulr.de";
let schema = new Schema();

let app = connect();

let getHandler: GetHandler;
let optionsHandler: OptionsHandler;
let postHandler: PostHandler;

app.use(bodyParser.text());

app.use(config.publicRelativeServiceDirectory + "/", function(req, res, next) {
  let requestHandler: IHttpRequestHandler;
  switch (req.method) {
    case "GET": requestHandler = getHandler; break;
    case "POST": requestHandler = postHandler; break;
    case "OPTIONS": requestHandler = optionsHandler; break;
    default: res.send(400, "Unknown method"); return;
  }

  requestHandler.query(convertHttpRequest(req), new ResponseSender(res));
});

class ResponseSender implements IHttpResponseSender {
  private body: string;
  private code: number;
  private headers: { [id: string]: string } = {};

  constructor(private res) {}

  public sendStatusCode(code: number) {
    this.code = code;
  }

  public sendBody(body: string) {
    this.body = body;
  }

  public sendHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  public finishResponse() {
    this.res.writeHeader(this.code, this.headers);
    this.res.end(this.body);
  }
}

function convertHttpRequest(req) {
  return {
    relativeUrl: req.url,
    body: req.body,
  };
}

rdfstore.create(function(error, st) {
  store = st;
  storeSeed(function(err) {
    if (err) console.error("seed failed", err);
    else startServer();
  });
});

function storeSeed(cb) {
  store.rdf.setPrefix("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  store.rdf.setPrefix("disco", "http://disco-network.org/resource/");

  let graph = store.rdf.createGraph();
  let node = createNamedNode.bind(store);
  let literal = createLiteral.bind(store);

  graph.add(store.rdf.createTriple(
    node("disco:post1"), node("rdf:type"), node("disco:Post")
  ));
  graph.add(store.rdf.createTriple(
    node("disco:post1"), node("disco:id"), literal("1")
  ));
  graph.add(store.rdf.createTriple(
    node("disco:post1"), node("disco:content"), node("disco:content1")
  ));

  graph.add(store.rdf.createTriple(
    node("disco:post2"), node("rdf:type"), node("disco:Post")
  ));
  graph.add(store.rdf.createTriple(
    node("disco:post2"), node("disco:id"), literal("2")
  ));
  graph.add(store.rdf.createTriple(
    node("disco:post2"), node("disco:content"), node("disco:content2")
  ));
  graph.add(store.rdf.createTriple(
    node("disco:post2"), node("disco:parent"), node("disco:post1")
  ));

  graph.add(store.rdf.createTriple(
    node("disco:content1"), node("disco:id"), literal("1")
  ));
  graph.add(store.rdf.createTriple(
    node("disco:content1"), node("disco:title"), literal("Post Nr. 1")
  ));

  graph.add(store.rdf.createTriple(
    node("disco:content2"), node("disco:id"), literal("2")
  ));
  graph.add(store.rdf.createTriple(
    node("disco:content2"), node("disco:title"), literal("Post Nr. 2")
  ));

  store.insert(graph, storeName, cb);
}

function createNamedNode(str) {
  return this.rdf.createNamedNode(this.rdf.resolve(str));
}

function createLiteral(str) {
  return this.rdf.createLiteral(str);
}

function startServer() {
  provider = new SparqlProvider(store, storeName);

  getHandler = new GetHandler(schema, provider, storeName);
  postHandler = new PostHandler(schema, provider, storeName);
  optionsHandler = new OptionsHandler();

  app.listen(config.port);
  console.log("server is listening on port " + config.port);
}
