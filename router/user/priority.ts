export default {
    priority: {
        route: '/priority',
        middleware: ['user.priority']
    },
    check: {
        route: '/check',
        middleware: ['user.check'],

    },
    testRepository: {
        route: '/repository',
        middleware: ['user.repository']
    }
}
