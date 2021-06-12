export default {
    name: 'functional-button',
    functional: true,
    render(createElement, context) {
        return createElement('button', 'click me')
    }
}
