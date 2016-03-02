// Nyttefunksjoner for å formatere strenger til slackflavored markdown

function wrap(string, wrapper) {
    return wrapper + string + wrapper;
}

module.exports = {
    codeBlock: function(string) {
        return wrap(string, "```\n");
    },

    codeBlockInline: function(string) {
        return wrap(string, "`\n");
    },

    emph: function(string) {
        return wrap(string, '*');
    },

    italic: function(string) {
        return wrap(string, '_');
    },

    striketrough: function(string) {
        return wrap(string, '~');
    }
};
