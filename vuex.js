/**
 * _rawModule
 * _children
 * state  
 */

let Vue

const install = function (_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){
            if(this.$options.store) {
                this.$store = this.$options.store
            }else {
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

function forEach(obj,callback){
    Object.keys(obj).forEach(key=>{
        callback(key,obj[key])
    })
}

function initModule(modules, path, options){
    const root = {
        _raw: options,
        _children: {},
        state: options.state
    }
    if(!modules.root) {
        modules.root = root
    }else {
        const parentNode = path.slice(0,-1).reduce((module, current)=>{
            return module['_children'][current]
        }, modules.root)
        parentNode._children[path[path.length - 1]] = root
    }
    if(options.modules) {
        forEach(options.modules, (moduleName, value)=>{
            path.push(moduleName)
            initModule(modules, path, value)
        })
    }

}
function installModule(store,modules,vm,path){
    let currentModule = modules
    let getters = null
    let mutations = null
    let actions = null
    if(modules.root) {
        currentModule = modules['root']
        
    }else {
        const parentNode = path.slice(0,-1).reduce((data,current)=>{
            return data[current]
        },vm.state)
        vm.$set(parentNode, [path[path.length - 1]], modules.state );
    }
    getters = currentModule._raw.getters
    mutations = currentModule._raw.mutations
    actions = currentModule._raw.actions
    const parentNode = path.reduce((data,current)=>{
        return data[current]
    },vm.state)
    if(getters) {
        forEach(getters,(getterName, value)=>{
            Object.defineProperty(store.getters, getterName,{
                get(){
                    return value(parentNode)

                }
            })
        })
    }
    if(mutations) {
        forEach(mutations,(mutationName,value)=>{
            const list = store.mutations[mutationName] || (store.mutations[mutationName] = [])
            list.push((payLoad)=>{
                value(parentNode,payLoad)
            })
        })
    }
    if(actions) {
        forEach(actions,(actionName,value)=>{
            const list = store.actions[actionName] || (store.actions[actionName] = [])
            list.push((payLoad)=>{
                value(store, payLoad)
            })
        })
    }
    if(currentModule._children) {
        forEach(currentModule._children,(moduleName,value)=>{
            path.push(moduleName)
            installModule(store, value, vm, path)
        })
    }
}

class Store{
    constructor(options) {
        this.getters = {};
        this.mutations = {};
        this.actions = {}
        this.vm = new Vue({
            data: {
                state: options.state
            }
        })
        this.modules = {}
        initModule(this.modules, [], options);//[a,b]
        installModule(this, this.modules, this.vm, [])
        const store = this
        const { dispatch, commit } = this
        this.dispatch = function boundDispatch (type, payload) {
            return dispatch.call(store, type, payload)
        }
        this.commit = function boundCommit (type, payload, options) {
            return commit.call(store, type, payload, options)
        }
    }
    get state(){
        return this.vm.state
    }
    commit = (mutatonName,payLoad) =>{
        this.mutations[mutatonName].forEach(value=>{
            value(payLoad)
        })
    }
    dispatch = (actionName,payLoad) =>{
        this.actions[actionName].forEach(value=>{
            value(payLoad)
        })
    }
}

export default {
    install,
    Store
}
