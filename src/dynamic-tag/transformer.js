var util = require('util')

module.exports = function transform(node, compiler, template) {
    var name = node.getAttribute('tag-name');
    if (name != null) {
        node.removeAttribute('tag-name');
        // var expr = template.makeExpression(name)
        var tagNode = compiler.createNode(name, node.getAttributes());

        node.parentNode.replaceChild(tagNode, node);
        node.forEachChild(function(child) {
          tagNode.appendChild(child);
        });
    }
};
