/**
 * Custom SuiteScript module.
 *
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */
define([],

function () {

    /**
     * Namespace for autocomplete.
     *
     * @namespace
     */
    var UtilNs2 = {

        /**
         * Sublist util.
         */
        Sublist: {

            /**
             * Return sublist data from sent parameters into POST event on Suitelet.
             *
             * @param {string} sublistId
             * @param {{}} parameters
             * @returns {object[]}
             */
            getData: function (sublistId, parameters) {

                var lineDelimiter, columnDelimiter, sublistFields, sublistData;

                lineDelimiter = /\u0002/;
                columnDelimiter = /\u0001/;

                sublistFields = parameters[sublistId + 'fields']
                    .split(columnDelimiter);

                sublistData = parameters[sublistId + 'data']
                    .split(lineDelimiter);

                return sublistData.map(function (lineValues) {

                    var obj = {};

                    lineValues = lineValues.split(columnDelimiter);

                    lineValues.forEach(function (lineValue, index) {
                        obj[sublistFields[index]] = lineValue;
                    });

                    return obj;
                });
            }
        }
    };

    return UtilNs2;
});
