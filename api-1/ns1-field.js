/**
 * @author Volnei Ferreira
 * @namespace
 */
var Ns1Field = {
  /**
   * Constants.
   */
  MAXLENGTH_FIELD_FIRSTNAME: 32,
  MAXLENGTH_FIELD_MIDDLETNAME: 32,
  MAXLENGTH_FIELD_LASTNAME: 32,
  MAXLENGTH_FIELD_COMPANYNAME: 83,
  MAXLENGTH_FREEFORMTEXT_FIELDS: 300,

  /**
   * Removes relationship from a name.
   *
   * @param {string} name
   * @returns {string}
   */
  removeRelationship: function (name) {
    var nameSplitted = name.split(' : ')
    return nameSplitted[nameSplitted.length - 1]
  }
}

// Avoid non-used variable warning.
if (window) window.Ns1Field = Ns1Field
