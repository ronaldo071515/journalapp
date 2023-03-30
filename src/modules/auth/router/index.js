
export default {
    name: 'auth',
    component: () => import(/* webpackChunkName: "Auth Layout" */ '@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import(/* webpackChunkName: "Auht Login" */ '@/modules/auth/views/AuthLogin.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import(/* webpackChunkName: "Auht Register" */ '@/modules/auth/views/AuthRegister.vue'),
        },
    ]
}