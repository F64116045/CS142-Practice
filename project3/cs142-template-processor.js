class TemplateProcessor {
    constructor(template) {
      this.template = template; 
    }
  
    fillIn(dictionary) {
      // 使用正則表達式匹配模板字串 {{property}}
      return this.template.replace(/{{\s*(\w+)\s*}}/g, (match, property) => {
        return property in dictionary ? dictionary[property] : '';
      });
    }
  }
  