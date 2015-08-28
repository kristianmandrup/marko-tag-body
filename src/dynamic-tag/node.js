function DynamicTagNode(props) {
    DynamicTagNode.$super.call(this);
    if (props) {
        this.setProperties(props);
    }
}
DynamicTagNode.prototype = {
    generateTagName: function(name, template) {
      var name = this.getAttribute('tag-name');
      console.log('generateTagName', name);
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
      nodeNameExpr = nodeNameExpr || name;

      if (nodeNameExpr.match(/%/)) {
        console.log('write code');
        name = nodeNameExpr;
        var parts = name.split('%');
        for (var part of parts) {
          var code = part.slice(1);
          code = 'out.w(' + code + ');';
          var isCode = part[0] === ':';
          if (isCode) {
            this.addSkipAttribute('tag-name');
            // delete this.attributesByNS['']['tag-name'];
            // console.log();
            template.indent();
            template.code(code);
          } else {
            template.text(part)
          }
        }
      } else {
        name = nodeNameExpr;
        template.text(name);
      }
    }
};

module.exports = DynamicTagNode;
