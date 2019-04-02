/**
 * @author Volnei Ferreira
 * @namespace
 */
var Ns1Search = {
  /**
   * Handle each result of a nlobjSearch.
   *
   * @param {nlobjSearch} search
   * @param {function} cb
   */
  forEachResult: function (search, cb) {
    var resultSet, start, end, index, hasResultsYet, results

    resultSet = search.runSearch()
    start = 0
    end = 1000
    index = 0
    hasResultsYet = false

    do {
      results = resultSet.getResults(start, end) || []

      results.forEach(function (result) {
        cb(result, index)
        index++
      })

      if (results.length === 1000) {
        hasResultsYet = true
        start += 1000
        end += 1000
      } else {
        hasResultsYet = false
      }
    } while (hasResultsYet)
  }
}

// Avoid non-used variable warning.
if (window) window.Ns1Search = Ns1Search
