/**
     * 如何模拟实现 Array.prototype.splice
    */
    Array.prototype._splice = function(index, num, ...arr){
        const { length } = this;
        const start = index >= 0 ? Math.min(index, length) : Math.max(length + index, 0)
        const removeList = this.slice(start, start + num);
        const right = this.slice(start + num);
        let addIndex = start
        console.log(arr,addIndex,right)
        arr.concat(right).forEach(item=>{
            this[addIndex] = item
            addIndex++
        })
        this.length = addIndex
        return removeList
    }
    const arr = [1,2,3,4]
    const list = arr._splice(1,2,3)
    console.log(list,arr
