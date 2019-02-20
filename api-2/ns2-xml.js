/**
 * ns2-xml.js
 * @NApiVersion 2.x
 * @author Volnei Ferreira
 */
define(['N/xml'], function (xml) {
  return {
    /**
     * String to JSON.
     *
     * @param {string} xmlString
     * @returns {*}
     */
    stringToJson: function (xmlString) {
      return this.toJson(xml.Parser.fromString({ text: xmlString }))
    },

    /**
     * To JSON.
     *
     * @param xmlDocument
     * @returns {{}}
     */
    toJson: function (xmlDocument) {
      var obj, i, item, nodeName, old;
      obj = {};
      if (xmlDocument.nodeType === xml.NodeType.TEXT_NODE) {
        obj = xmlDocument.nodeValue;
      }
      if (xmlDocument.hasChildNodes()) {
        for (i = 0; i < xmlDocument.childNodes.length; i++) {
          item = xmlDocument.childNodes[i];
          nodeName = item.nodeName;
          if (obj[nodeName] === undefined) {
            obj[nodeName] = this.toJson(item);
          } else {
            if (!obj[nodeName].push) {
              old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(this.toJson(item));
          }
        }
      }
      return obj;
    }
  }
});
