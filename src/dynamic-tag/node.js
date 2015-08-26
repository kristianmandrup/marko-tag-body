function DynamicTagNode(props) {
    DynamicTagNode.$super.call(this);
    if (props) {
        this.setProperties(props);
    }
}
DynamicTagNode.prototype = {
    doGenerateCode: function (template) {
      console.log(template.data);
      this.generateCode(template)
    }
};

module.exports = DynamicTagNode;
