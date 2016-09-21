declare module "connect" {
    let x: any;
    export = x;
}

declare module "fs" {
    let x: any;
    export = x;
}

declare module "rdfstore" {
    let x: any;
    export = x;
}

declare module "disco.ontology" {
    let x: any;
    export = x;
}

declare module "body-parser" {
    export function text(options?): (req, res, next) => void;
}