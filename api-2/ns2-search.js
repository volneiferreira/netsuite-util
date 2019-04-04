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
      const page = parseInt(options.page, 10) || 0
      const pagedData = options.search.runPaged({ pageSize: limit })

      const data = {
        count: pagedData.count,
        pages: pagedData.pageRanges.length,
        currentPage: page,
        results: pagedData.count
          ? pagedData.fetch({ index: page }).data
          : []
      }

      if (options.mapResults) {
        data.results = data.results.map(options.mapResults)
      }

      return data
    }
  }
})
