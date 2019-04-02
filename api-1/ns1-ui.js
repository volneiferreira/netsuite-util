/**
 * @author Volnei Ferreira
 * @namespace
 */
var Ns1Ui = {
  /**
   * Loading util
   */
  Loading: {

    /**
     * Loading ID.
     */
    ID: 'ns-1-ui-loading',

    /**
     * Show loading.
     */
    show: function () {
      var loading = document.getElementById(this.ID)

      if (!loading) {
        loading = Ns1Ui._createFadingElement({ id: this.ID })
      }

      Ns1Ui._displayElement(loading, true)
    },

    /**
     * Close loading
     */
    close: function () {
      Ns1Ui._displayElement(document.getElementById(this.ID), false)
    }

  },

  /**
   * Modal.
   */
  Modal: {

    /**
     * Show NS modal.
     *
     * @param {string} url
     * @param {string} name
     * @param {string} title
     * @param {number} width
     * @param {number} height
     * @param {boolean} scrollbars
     * @returns {void}
     */
    show: function (url, name, title, width, height, scrollbars) {
      nlExtOpenWindow(url, name, width, height, null, scrollbars, title)
    },

    /**
     * Close opened NS modal.
     *
     * @param {boolean} closeOnParent
     */
    close: function (closeOnParent) {
      (closeOnParent ? window.parent : window).top.Ext.WindowMgr.getActive().close()
    }
  },

  /**
   * Create fading element.
   *
   * @param {object} options
   * @returns {HTMLDivElement}
   * @private
   */
  _createFadingElement: function (options) {
    var fading = document.createElement('div')

    fading.id = options.id
    fading.style.display = 'none'
    fading.style.position = 'fixed'
    fading.style.zIndex = '1000'
    fading.style.left = 0
    fading.style.top = 0
    fading.style.width = '100%'
    fading.style.height = '100%'
    fading.style.overflow = 'hidden'
    fading.style.backgroundColor = 'rgba(240, 240, 240, 0.5)'

    document.body.appendChild(fading)

    return fading
  },

  /**
   * Display element.
   *
   * @param {HTMLElement} element
   * @param {boolean} display
   * @private
   */
  _displayElement: function (element, display) {
    if (display) {
      Ns1Ui._adjustDefaultElements(false)
      element.style.display = 'block'
    } else {
      Ns1Ui._adjustDefaultElements(true)
      element.style.display = 'none'
    }
  },

  /**
   * Adjust default elements.
   *
   * @param {boolean} adjust
   * @private
   */
  _adjustDefaultElements: function (adjust) {
    var body = document.getElementsByTagName('body')[0]

    var html = document.getElementsByTagName('html')[0]

    if (adjust) {
      body.style.overflow = 'hidden'
      body.style.height = 'auto'
      html.style.overflow = 'hidden'
      html.style.height = 'auto'
    } else {
      body.style.overflow = 'auto'
      body.style.height = 'auto'
      html.style.overflow = 'auto'
      html.style.height = 'auto'
    }
  }
}

// Avoid non-used variable warning.
if (window) window.Ns1Ui = Ns1Ui
