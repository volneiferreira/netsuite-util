/**
 * @author Volnei Ferreira
 * @namespace
 */
var Ns1Request = {
  /**
   * Send a request from Client script to Suitelet.
   *
   * @param {{}} options
   * @param {function} cb
   * @returns {nlobjServerResponse | void}
   */
  send: function (options, cb) {
    var url, response

    url = nlapiResolveURL('SUITELET', options.scriptId, options.deployId, options.isExternal)
    response = nlapiRequestURL(url, { function: options.function, parameters: JSON.stringify(options.parameters) }, options.headers, cb, options.method)

    return response
  },

  /**
   * Receive a request from Client script into Suitelet.
   *
   * @param {nlobjRequest} request Request object
   * @param {nlobjResponse} response Response object
   * @param {{}} receiver
   * @returns {void} Any output is written via response object
   */
  receive: function (request, response, receiver) {
    var res, sentFunction, sentParameters

    res = {
      err: null,
      data: null
    }

    try {
      sentFunction = request.getParameter('function')
      sentParameters = request.getParameter('parameters')

      res.data = receiver[sentFunction].apply(this, JSON.parse(sentParameters))
    } catch (e) {
      res.err = e
    }

    response.write(JSON.stringify(res))
  }
}

// Avoid non-used variable warning.
if (window) window.Ns1Request = Ns1Request
