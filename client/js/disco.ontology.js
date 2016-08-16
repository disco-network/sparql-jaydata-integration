(function(mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD
    mod($data.generatedContext || ($data.generatedContext = {}), $data); // Plain browser env
})(function(exports) {

    exports.Ontology = {};
    exports.Ontology.EntityBase = $data.Entity.extend('Disco.Ontology.EntityBase', {
       'Id': { 'key':true,'type':'Edm.Int64','nullable':false,'required':false },
       'Key': { 'type':'Edm.Guid','nullable':false,'required':false },
       'Modified': { 'type':'Edm.DateTime','nullable':false,'required':false }
    });

    exports.Ontology.Culture = exports.Ontology.EntityBase.extend('Disco.Ontology.Culture', {
       'Code': { 'type':'Edm.String' },
       'Name': { 'type':'Edm.String' }
    });

    exports.Ontology.Region = exports.Ontology.EntityBase.extend('Disco.Ontology.Region', {
       'Code': { 'type':'Edm.String' },
       'DescriptionId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'ParentId': { 'type':'Edm.Int64' },
       'Description': { 'type':'Disco.Ontology.Descriptor','inverseProperty':'$$unbound' },
       'Parent': { 'type':'Disco.Ontology.Region','inverseProperty':'$$unbound' },
       'Partitions': { 'type':'Array','elementType':'Disco.Ontology.Region','inverseProperty':'$$unbound' },
       'Posts': { 'type':'Array','elementType':'Disco.Ontology.Post','inverseProperty':'$$unbound' }
    });

    exports.Ontology.Origin = exports.Ontology.EntityBase.extend('Disco.Ontology.Origin', {
       'Uri': { 'type':'Edm.String' },
       'DescriptionId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Description': { 'type':'Disco.Ontology.Descriptor','inverseProperty':'$$unbound' }
    });

    exports.Ontology.Originator = exports.Ontology.EntityBase.extend('Disco.Ontology.Originator', {
       'AuthorId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'OriginId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Author': { 'type':'Disco.Ontology.User','inverseProperty':'$$unbound' },
       'Origin': { 'type':'Disco.Ontology.Origin','inverseProperty':'$$unbound' }
    });

    exports.Ontology.Descriptor = exports.Ontology.EntityBase.extend('Disco.Ontology.Descriptor', {
       'Name': { 'type':'Edm.String' },
       'Description': { 'type':'Edm.String' },
       'CultureId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Culture': { 'type':'Disco.Ontology.Culture','inverseProperty':'$$unbound' }
    });

    exports.Ontology.User = exports.Ontology.EntityBase.extend('Disco.Ontology.User', {
       'Alias': { 'type':'Edm.String' },
       'Token': { 'type':'Edm.String' },
       'OriginId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Origin': { 'type':'Disco.Ontology.Origin','inverseProperty':'$$unbound' },
       'Memberships': { 'type':'Array','elementType':'Disco.Ontology.GroupMembership','inverseProperty':'$$unbound' }
    });

    exports.Ontology.Group = exports.Ontology.EntityBase.extend('Disco.Ontology.Group', {
       'Alias': { 'type':'Edm.String' },
       'DescriptionId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'ParentId': { 'type':'Edm.Int64' },
       'Description': { 'type':'Disco.Ontology.Descriptor','inverseProperty':'$$unbound' },
       'Memberships': { 'type':'Array','elementType':'Disco.Ontology.GroupMembership','inverseProperty':'$$unbound' },
       'Parent': { 'type':'Disco.Ontology.Group','inverseProperty':'$$unbound' },
       'Partitions': { 'type':'Array','elementType':'Disco.Ontology.Group','inverseProperty':'$$unbound' }
    });

    exports.Ontology.GroupMembership = exports.Ontology.EntityBase.extend('Disco.Ontology.GroupMembership', {
       'MembershipTypeId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'User': { 'type':'Disco.Ontology.User','inverseProperty':'$$unbound' },
       'Group': { 'type':'Disco.Ontology.Group','inverseProperty':'$$unbound' },
       'MembershipType': { 'type':'Disco.Ontology.GroupMembershipType','inverseProperty':'$$unbound' }
    });

    exports.Ontology.GroupMembershipType = exports.Ontology.EntityBase.extend('Disco.Ontology.GroupMembershipType', {
       'DescriptionId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Description': { 'type':'Disco.Ontology.Descriptor','inverseProperty':'$$unbound' }
    });

    exports.Ontology.Post = exports.Ontology.EntityBase.extend('Disco.Ontology.Post', {
       'PostTypeId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'ContentId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'PostType': { 'type':'Disco.Ontology.PostType','inverseProperty':'$$unbound' },
       'Content': { 'type':'Disco.Ontology.Content','inverseProperty':'$$unbound' },
       'Tags': { 'type':'Array','elementType':'Disco.Ontology.Tag','inverseProperty':'$$unbound' },
       'Ratings': { 'type':'Array','elementType':'Disco.Ontology.Rating','inverseProperty':'$$unbound' },
       'RefersTo': { 'type':'Array','elementType':'Disco.Ontology.PostReference','inverseProperty':'$$unbound' },
       'ReferredFrom': { 'type':'Array','elementType':'Disco.Ontology.PostReference','inverseProperty':'$$unbound' },
       'ModifiedBy': { 'type':'Disco.Ontology.Originator','inverseProperty':'$$unbound' },
    });

    exports.Ontology.PostReference = exports.Ontology.EntityBase.extend('Disco.Ontology.PostReference', {
       'ReferrerId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'ReferreeId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'ReferenceTypeId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Referrer': { 'type':'Disco.Ontology.Post','inverseProperty':'$$unbound' },
       'Referree': { 'type':'Disco.Ontology.Post','inverseProperty':'$$unbound' },
       'ReferenceType': { 'type':'Disco.Ontology.PostReferenceType','inverseProperty':'$$unbound' }
    });

    exports.Ontology.PostReferenceType = exports.Ontology.EntityBase.extend('Disco.Ontology.PostReferenceType', {
       'DescriptionId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Description': { 'type':'Disco.Ontology.Descriptor','inverseProperty':'$$unbound' }
    });

    exports.Ontology.PostType = exports.Ontology.EntityBase.extend('Disco.Ontology.PostType', {
       'DescriptionId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Description': { 'type':'Disco.Ontology.Descriptor','inverseProperty':'$$unbound' }
    });

    exports.Ontology.Tag = exports.Ontology.EntityBase.extend('Disco.Ontology.Tag', {
       'DescriptionId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Description': { 'type':'Disco.Ontology.Descriptor','inverseProperty':'$$unbound' },
       'Tagged': { 'type':'Array','elementType':'Disco.Ontology.Post','inverseProperty':'$$unbound' },
       'Related': { 'type':'Array','elementType':'Disco.Ontology.Tag','inverseProperty':'$$unbound' }
    });

    exports.Ontology.Rating = exports.Ontology.EntityBase.extend('Disco.Ontology.Rating', {
       'Score': { 'type':'Edm.Int32','nullable':false,'required':true },
       'PostId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'UserId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'User': { 'type':'Disco.Ontology.User','inverseProperty':'$$unbound' },
       'Post': { 'type':'Disco.Ontology.Post','inverseProperty':'$$unbound' },
       'ModifiedBy': { 'type':'Disco.Ontology.Originator','inverseProperty':'$$unbound' }
    });

    exports.Ontology.Content = exports.Ontology.EntityBase.extend('Disco.Ontology.Content', {
       'Title': { 'type':'Edm.String' },
       'Text': { 'type':'Edm.String' },
       'CultureId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Culture': { 'type':'Disco.Ontology.Culture','inverseProperty':'$$unbound' }
    });

    exports.Ontology.Changeset = exports.Ontology.EntityBase.extend('Disco.Ontology.Changeset', {
       'ModifiedById': { 'type':'Edm.Int64','nullable':false,'required':true },
       'ModifiedBy': { 'type':'Disco.Ontology.Originator','inverseProperty':'$$unbound' },
       'Details': { 'type':'Array','elementType':'Disco.Ontology.ChangeDetail','inverseProperty':'$$unbound' }
    });

    exports.Ontology.ChangeDetail = exports.Ontology.EntityBase.extend('Disco.Ontology.ChangeDetail', {
       'Action': { 'type':'Edm.String' },
       'EntityName': { 'type':'Edm.String' },
       'EntityKey': { 'type':'Edm.Guid','nullable':false,'required':true },
       'OldValues': { 'type':'Edm.String' },
       'NewValues': { 'type':'Edm.String' },
       'ChangesetId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Changeset': { 'type':'Disco.Ontology.Changeset','inverseProperty':'$$unbound' }
    });

    exports.Ontology.NamedValueSet = exports.Ontology.EntityBase.extend('Disco.Ontology.NamedValueSet', {
       'OriginId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'Origin': { 'type':'Disco.Ontology.Origin','inverseProperty':'$$unbound' },
       'Values': { 'type':'Array','elementType':'Disco.Ontology.NamedValue','inverseProperty':'$$unbound' }
    });

    exports.Ontology.NamedValue = exports.Ontology.EntityBase.extend('Disco.Ontology.NamedValue', {
       'Name': { 'type':'Edm.String' },
       'Value': { 'type':'Edm.String' },
       'NamedValueSetId': { 'type':'Edm.Int64','nullable':false,'required':true },
       'NamedValueSet': { 'type':'Disco.Ontology.NamedValueSet','inverseProperty':'$$unbound' }
    });

    exports.Context = $data.EntityContext.extend('Disco.EntityContext', {
       'EntityBases': { type: $data.EntitySet, elementType: exports.Ontology.EntityBase},
       'Cultures': { type: $data.EntitySet, elementType: exports.Ontology.Culture},
       'Regions': { type: $data.EntitySet, elementType: exports.Ontology.Region},
       'Origins': { type: $data.EntitySet, elementType: exports.Ontology.Origin},
       'Originators': { type: $data.EntitySet, elementType: exports.Ontology.Originator},
       'Descriptors': { type: $data.EntitySet, elementType: exports.Ontology.Descriptor},
       'Users': { type: $data.EntitySet, elementType: exports.Ontology.User},
       'Groups': { type: $data.EntitySet, elementType: exports.Ontology.Group},
       'GroupMemberships': { type: $data.EntitySet, elementType: exports.Ontology.GroupMembership},
       'GroupMembershipTypes': { type: $data.EntitySet, elementType: exports.Ontology.GroupMembershipType},
       'Posts': { type: $data.EntitySet, elementType: exports.Ontology.Post},
       'PostReferences': { type: $data.EntitySet, elementType: exports.Ontology.PostReference},
       'PostReferenceTypes': { type: $data.EntitySet, elementType: exports.Ontology.PostReferenceType},
       'PostTypes': { type: $data.EntitySet, elementType: exports.Ontology.PostType},
       'Tags': { type: $data.EntitySet, elementType: exports.Ontology.Tag},
       'Ratings': { type: $data.EntitySet, elementType: exports.Ontology.Rating},
       'Content': { type: $data.EntitySet, elementType: exports.Ontology.Content},
       'Changesets': { type: $data.EntitySet, elementType: exports.Ontology.Changeset},
       'ChangeDetails': { type: $data.EntitySet, elementType: exports.Ontology.ChangeDetail},
       'NamedValueSets': { type: $data.EntitySet, elementType: exports.Ontology.NamedValueSet},
       'NamedValues': { type: $data.EntitySet, elementType: exports.Ontology.NamedValue}
    });

    var ctxType = exports.Context;
    exports.createContext = function(uri, config) {
        if (ctxType) {
            var cfg = $data.typeSystem.extend({
                name: "oData",
                oDataServiceHost: uri,
                withCredentials: false,
                maxDataServiceVersion: "4.0"
            }, config);
            return new ctxType(cfg);
        } else {
            return null;
        }
    };
  
      
});
    
