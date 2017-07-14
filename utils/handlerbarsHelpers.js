"use strict";

var Handlebars = require('handlebars');

/**
 * Helper functions for Handlebars
 */


Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
    switch (operator) {
        case "==":
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case "===":
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case "!=":
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case "!==":
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case "<":
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case "<=":
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case ">":
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case ">=":
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case "&&":
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case "||":
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});


Handlebars.registerHelper("nl2br" , function (text, isXhtml) {
    var breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br />' : '<br>';
    return (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
});

Handlebars.registerHelper("encode" , function (context, str) {
    var uri = context || str;
    return new Handlebars.SafeString(encodeURIComponent(uri));
});

Handlebars.registerHelper("truncate", function (str, len) {
    if (str && str.length > len && str.length > 0) {
        var new_str = str + " ";
        new_str = str.substr(0, len);
        new_str = str.substr(0, new_str.lastIndexOf(" "));
        new_str = (new_str.length > 0) ? new_str : str.substr(0, len);

        return new Handlebars.SafeString(new_str + '...');
    }
    return str;
});


