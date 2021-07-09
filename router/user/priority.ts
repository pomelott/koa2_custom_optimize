export default {
    priority: {
        route: '/priority',
        middleware: ['user.priority']
    },
    check: {
        route: '/check'
    },
    testRepository: {
        route: '/repository',
        middleware: ['user.repository']
    }
}
