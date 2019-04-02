/**
 * SuiteScript API 1.0 Util.
 *
 * @author Volnei Ferreira
 * @namespace
 */
var Ns1Sublist = {
  /**
   * Handle each line of a sublist.
   *
   * @param {string} sublistId
   * @param {function} cb
   */
  forEachLine: function (sublistId, cb) {
    for (var line = 1, lineCount = nlapiGetLineItemCount(sublistId); line <= lineCount; line++) {
      cb(line, lineCount)
    }
  }
}

// Avoid non-used variable warning.
if (window) window.Ns1Sublist = Ns1Sublist
