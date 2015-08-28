require('marko/node-require').install();

var chai = require('chai');
chai.config.includeStack = true;
var expect = require('chai').expect;

describe('marko-dynamic-tag', function() {
    it('should work with a tag-name attribute that has a value', function() {
        var template = require('./fixtures/simple.marko');
        var output = template.renderSync({
            lv: '4'
        });
        expect(output).to.equal("<h4 class=\"ui header\">hello world</h4>");
    });
});
