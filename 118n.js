const chineseExp = /('([^']*?[\u4e00-\u9fa5]+[^']*?)'|"([^"]*?[\u4e00-\u9fa5]+[^"]*?)"|>([^<]*?[\u4e00-\u9fa5]+[\s\S]*?)<\/)/g;
const chineseExpWithAttr = /(\S+\=)('([^']*?[\u4e00-\u9fa5]+[^']*?)'|"([^"]*?[\u4e00-\u9fa5]+[^"]*?)")/g;
const hasChinese = /[\u4e00-\u9fa5]/g;
const hasQuote = /`([^`]+)`/g;
const hasExp = /\$\{[^{^}]+\}/g;
const hasChineseInQuote = /`([^`]*[\u4e00-\u9fa5]+[^`]*)`/g;
const endWithChinese = />[^<]*?[\u4e00-\u9fa5]+[^<]*?$/g;
const closeTag = /^([^<]*?)<\//g;
const blockCommentStartScript = /\s*?\/\*/g;
const blockCommentEndScript = /\*\//g;
const blockCommentStartTemplate = /\s*<\!--/g;
const blockCommentEndTemplate = /\s*-->/g;

walk(folder){
  const subs = fs.readdirSync(folder);
  subs.forEach(sub=>{
    const p = path.resolve(folder,sub);
    if(fs.statSync(p).isFile() && path.extname(p).endsWith("vue")) {
      this.exactFile(p)
    }else if(fs.statSync(p).isDirectory()) {
      this.walk(p)
    }
 })
}
