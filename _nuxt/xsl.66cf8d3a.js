import e from"./xml.3e3e8dbb.js";import"./java.a2e12a07.js";const t=Object.freeze({information_for_contributors:["This file has been converted from https://github.com/atom/language-xml/blob/master/grammars/xsl.cson","If you want to provide a fix or improvement, please create a pull request against the original repository.","Once accepted there, we are happy to receive an update request."],version:"https://github.com/atom/language-xml/commit/507de2ee7daca60cf02e9e21fbeb92bbae73e280",name:"xsl",scopeName:"text.xml.xsl",patterns:[{begin:"(<)(xsl)((:))(template)",captures:{1:{name:"punctuation.definition.tag.xml"},2:{name:"entity.name.tag.namespace.xml"},3:{name:"entity.name.tag.xml"},4:{name:"punctuation.separator.namespace.xml"},5:{name:"entity.name.tag.localname.xml"}},end:"(>)",name:"meta.tag.xml.template",patterns:[{captures:{1:{name:"entity.other.attribute-name.namespace.xml"},2:{name:"entity.other.attribute-name.xml"},3:{name:"punctuation.separator.namespace.xml"},4:{name:"entity.other.attribute-name.localname.xml"}},match:" (?:([-_a-zA-Z0-9]+)((:)))?([a-zA-Z-]+)"},{include:"#doublequotedString"},{include:"#singlequotedString"}]},{include:"text.xml"}],repository:{doublequotedString:{begin:'"',beginCaptures:{0:{name:"punctuation.definition.string.begin.xml"}},end:'"',endCaptures:{0:{name:"punctuation.definition.string.end.xml"}},name:"string.quoted.double.xml"},singlequotedString:{begin:"'",beginCaptures:{0:{name:"punctuation.definition.string.begin.xml"}},end:"'",endCaptures:{0:{name:"punctuation.definition.string.end.xml"}},name:"string.quoted.single.xml"}},displayName:"XSL",embeddedLangs:["xml"]});var i=[...e,t];export{i as default};
