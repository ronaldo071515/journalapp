<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white" href="">
            <img src="@/assets/logo.png" 
                alt="logo vuejs"
                height="24"
                class="d-inline-block align-text-top mx-2">
            {{ username }}
        </a>

        <div class="d-flex">
            <button class="btn btn-outline-info mx-2"
                @click="onLogout">
                <i class="fa fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router';

import useAuth from '@/modules/auth/composables/useAuth';

export default {
    setup() {

        const router = useRouter()
        const { username, logout } = useAuth()


        return {
            username,
            onLogout: () => {
                router.push({ name: 'login' })
                logout()
            }
        }
    }
}
</script>