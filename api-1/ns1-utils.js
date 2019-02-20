/**
 * SuiteScript API 1.0 Util.
 * 
 * @author Volnei Ferreira
 * @namespace
 */
var Ns1Utils = {

    /**
     * Field util.
     */
    Field: {
        
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
            var nameSplitted = name.split(' : ');
            return nameSplitted[nameSplitted.length - 1];
        }
    },

    /**
     * Form util.
     */
    Form: {

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
                return;
            }

            var parameters = {};

            parameters['cf'] = formId;

            var pf = request.getParameter('pf');
            if (pf) {
                parameters['pf'] = pf;
            }

            var pi = request.getParameter('pi');
            if (pi) {
                parameters['pi'] = pi;
            }

            var pr = request.getParameter('pr');
            if (pr) {
                parameters['pr'] = pr;
            }

            if (type === 'edit') {
                nlapiSetRedirectURL('RECORD', nlapiGetRecordType(), nlapiGetRecordId(), true, parameters);
            } else if (type === 'view') {
                nlapiSetRedirectURL('RECORD', nlapiGetRecordType(), nlapiGetRecordId(), false, parameters);
            } else {
                nlapiSetRedirectURL('RECORD', nlapiGetRecordType(), null, false, parameters);
            }
        }
    },

    /**
     * Loading util
     */
    Loading: {

        /**
         * Loading ID.
         */
        ID: 'util-ns-1-loading',
        
        /**
         * Show loading.
         */
        show: function () {

            loading = document.getElementById(this.ID);

            if (!loading) {
                loading = Ns1Utils._createFadingElement({ id: this.ID });
            }

            Ns1Utils._displayElement(loading, true);
        },

        /**
         * Close loading
         */
        close: function () {
            Ns1Utils._displayElement(document.getElementById(this.ID), false);
        }
        
    },

    /**
     * Modal util.
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
            nlExtOpenWindow(url, name, width, height, null, scrollbars, title);
        },

        /**
         * Close opened NS modal.
         *
         * @param {boolean} closeOnParent
         */
        close: function (closeOnParent) {
            (closeOnParent ? window.parent : window).top.Ext.WindowMgr.getActive().close();
        }
    },

    /**
     * Request util.
     */
    Request: {

        /**
         * Send a request from Client script to Suitelet.
         *
         * @param {{}} options
         * @param {function} cb
         * @returns {nlobjServerResponse | void}
         */
        send: function (options, cb) {

            var url, response;

            url = nlapiResolveURL('SUITELET', options.scriptId, options.deployId, options.isExternal);
            response = nlapiRequestURL(url, { function: options.function, parameters: JSON.stringify(options.parameters) }, options.headers, cb, options.method);

            return response;
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

            var res, sentFunction, sentParameters;

            res = {
                err: null,
                data: null
            };

            try {

                sentFunction = request.getParameter('function');
                sentParameters = request.getParameter('parameters');

                res.data = receiver[sentFunction].apply(this, JSON.parse(sentParameters));

            } catch (e) {
                res.err = e;
            }

            response.write(JSON.stringify(res));
        }
    },

    /**
     * Search util.
     */
    Search: {

        /**
         * Handle each result of a nlobjSearch.
         *
         * @param {nlobjSearch} search
         * @param {function} cb
         */
        forEachResult: function (search, cb) {

            var resultSet, start, end, index, hasResultsYet, results;

            resultSet = search.runSearch();
            start = 0;
            end = 1000;
            index = 0;
            hasResultsYet = false;

            do {

                results = resultSet.getResults(start, end) || [];

                results.forEach(function (result) {
                    cb(result, index);
                    index++;
                });

                if (results.length === 1000) {
                    hasResultsYet = true;
                    start += 1000;
                    end += 1000;
                } else {
                    hasResultsYet = false;
                }

            } while (hasResultsYet);
        }
    },

    /**
     * Sublist util.
     */
    Sublist: {
        
        /**
         * Handle each line of a sublist.
         *
         * @param {string} sublistId
         * @param {function} cb
         */
        forEachLine: function (sublistId, cb) {
            for (var line = 1, lineCount = nlapiGetLineItemCount(sublistId); line <= lineCount; line++) {
                cb(line, lineCount);
            }
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

        fading = document.createElement('div');

        fading.id = options.id;
        fading.style.display = 'none';
        fading.style.position = 'fixed';
        fading.style.zIndex = '1000';
        fading.style.left = 0;
        loading.style.top = 0;
        fading.style.width = '100%';
        fading.style.height = '100%';
        fading.style.overflow = 'hidden';
        fading.style.backgroundColor = 'rgba(240, 240, 240, 0.5)';

        document.body.appendChild(fading);

        return fading;
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
            Ns1Utils._adjustDefaultElements(false);
            element.style.display = 'block';
        } else {
            Ns1Utils._adjustDefaultElements(true);
            element.style.display = 'none';
        }
    },

    /**
     * Adjust default elements.
     *
     * @param {boolean} adjust
     * @private
     */
    _adjustDefaultElements: function (adjust) {

        var body = document.getElementsByTagName('body')[0],
            html = document.getElementsByTagName('html')[0];

        if (adjust) {
            body.style.overflow = 'hidden';
            body.style.height = 'auto';
            html.style.overflow = 'hidden';
            html.style.height = 'auto';
        } else {
            body.style.overflow = 'auto';
            body.style.height = 'auto';
            html.style.overflow = 'auto';
            html.style.height = 'auto';
        }
    }
};
