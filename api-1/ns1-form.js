/**
 * @author Volnei Ferreira
 * @namespace
 */
var Ns1Form = {
  /**
   * Redirect to a form.
   *
   * @param {number} formId
   * @param {string} type
   * @param {nlobjRequest} request
   * @returns {void}
   */
  redirect: function (formId, type, request) {
    if (request.getParameter('cf') === formId) {
      return
    }

    var parameters = {}

    parameters['cf'] = formId

    var pf = request.getParameter('pf')
    if (pf) {
      parameters['pf'] = pf
    }

    var pi = request.getParameter('pi')
    if (pi) {
      parameters['pi'] = pi
    }

    var pr = request.getParameter('pr')
    if (pr) {
      parameters['pr'] = pr
    }

    if (type === 'edit') {
      nlapiSetRedirectURL('RECORD', nlapiGetRecordType(), nlapiGetRecordId(), true, parameters)
    } else if (type === 'view') {
      nlapiSetRedirectURL('RECORD', nlapiGetRecordType(), nlapiGetRecordId(), false, parameters)
    } else {
      nlapiSetRedirectURL('RECORD', nlapiGetRecordType(), null, false, parameters)
    }
  }
}

// Avoid non-used variable warning.
if (window) window.Ns1Form = Ns1Form
