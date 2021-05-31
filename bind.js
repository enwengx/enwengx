Function.prototype._bind = function(context,...args1){
  const self = this;
  if(typeof self !== 'function' || Object.prototype.toString.call(self) !== '[object Function]'){
    throw new Error(this + 'must be function')
  }
  const bound = function(...args2){
  if(new.target !== undefined) {
    const res = self.apply(this, args1.concat(args2));
    if(res instanceof Object) {
       return res
    }
    return this
  }else {
    self.apply(context, args1.concat(args2))
  }
  }
      if(self.prototype) {
        bound.prototype = Object.create(self.prototype);
        bound.prototype.constructor = self;
      }
      return bound
    }

Function.prototype._apply = function(context,...arg) {
    const contextCur = context | window;
    contextCur.fn = this;
    let result
    if(!arg) {
        result = contextCur.fn()
    }else {
        if(arg instanceof Array) {
            result = contextCur.fn(...arg)
        }else {
            throw new Error("params must be array")
        }
    }
    delete contextCur.fn
    return result
}
