/**
 * ns2-search.js
 * @NApiVersion 2.x
 * @author Volnei Ferreira
 */
define([], function () {
  return {
    /**
     * Run a search paged.
     *
     * @param options
     * @returns {{pages: *, currentPage: number, results: *}}
     */
    runSearchPaged: function (options) {
      const limit = options.limit || 30
      const pagedData = options.search.runPaged({ pageSize: limit })
      var page = parseInt(context.page, 10) - 1

      if (isNaN(page)) page = 0

      const data = {
        pages: pagedData.pageRanges.length,
        currentPage: page + 1,
        results: pagedData.fetch({ index: page }).data
      }

      if (options.mapResults) {
        data.results = data.results.map(options.mapResults)
      }

      return data
    }
  }
})
