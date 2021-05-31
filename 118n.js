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
