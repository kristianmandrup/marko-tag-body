var util = require('util')

module.exports = function transform(node, compiler, template) {
    var name = node.getAttribute('tag-name');
    if (name != null) {
        // $yyy.xxx or ${yyy.xxx}
        // -> ' + yyy.xxx + '
        var expr1 = /\${\s*(\S+)\s*}/;
        var expr2 = /\$\s*(\S+)\s*/;

        var matchComplex = name.match(expr1);
        var replStr = "%:$1%";
        var nodeNameExpr = name.replace(expr1, replStr);
        if (!matchComplex) {
          nodeNameExpr = name.replace(expr2, replStr);
        }

        // problem is in ElementNode: generateBeforeCode and generateAfterCode
        // template.text('<' + name);
        // should be for generateBeforeCode:
        // template.text('<');
        // var parts = name.split('%');
        // if (name.match(/%/)) {
        //  for (var part of parts)
        //    parts[0] == ':' ? template.code(part) : template.text(part)
        // } else {
        //   template.text('<' + name);
        // }
        //


        node.removeAttribute('tag-name');
        // var expr = template.makeExpression(name)
        var tagNode = compiler.createNode(nodeNameExpr, node.getAttributes());

        node.parentNode.replaceChild(tagNode, node);
        node.forEachChild(function(child) {
          tagNode.appendChild(child);
        });
    }
};
