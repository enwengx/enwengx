const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class Promise {
    constructor(executor){
        this.status = 'peding';
        this.value = undefined
        executor(this.resolve, this.reject)
    }
    succsccCallback = [];
    failCallback = [];
    resolve = (value)=>{
        if(this.status !== 'peding') return
        this.status = 'fulfilled';
        this.value = value;
        this.succsccCallback.forEach(fn=>fn())
    }
    reject = (value)=>{
        if(this.status !== 'peding') return
        this.status = 'rejected';
        this.value = value
        this.failCallback.forEach(fn=>fn())
    }
    then(onfufilled, onrejected){
        return new Promise((resolve, reject)=>{
            if(this.status === 'fulfilled') {
                try{
                    const res = onfufilled(this.value);
                    if(res instanceof Promise) {
                        res.then(resolve,reject)
                    }else resolve(res)
                }catch(e){
                    reject(e)
                }
            }
            if(this.status === 'rejected') {
                try{
                    const res = onrejected(this.value)
                    if(res instanceof Promise) {
                        res.then(resolve,reject)
                    }else resolve(res)
                }catch(e){
                    reject(e)
                }
            }
            if(this.status === 'peding') {
                this.succsccCallback.push(()=>{
                    const res = onfufilled(this.value);
                    if(res instanceof Promise) {
                        res.then(resolve,reject)
                    }else resolve(res)
                })
                this.failCallback.push(()=>{
                    const res = onrejected(this.value);
                    if(res instanceof Promise) {
                        res.then(resolve,reject)
                    }else resolve(res)
                })
            }
        })
    }
}
