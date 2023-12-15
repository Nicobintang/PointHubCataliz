<template>
    <!-- Tampilan login -->
    <div class="mt-20 relative">
    <div class="flex flex-col items-center max-w-xs gap-4 pt-10 -mt-20 pb-60 mx-auto border-2 border-black border-solid rounded-sm sm:max-w-sm md:max-w-md lg:max-w-lg "
        style="border-top: 1px solid black; border-bottom: 1px solid black; position: fixed; width: 100%; left: 50%; transform: translateX(-50%);">
        <!-- Logo dan judul aplikasi -->
        <div class="flex items-center">
        <img src="https://miro.medium.com/v2/resize:fill:96:96/1*3WJ5ZFiTF46V9BY5o5f6FQ.png" alt="" class="-mr-2">
        <h1 class="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl text-neutral-600">Point<span class="font-medium">hub</span></h1>
        </div>

        <!-- Judul tampilan -->
        <h3 class="text-lg md:text-2xl sm:text-xl lg:text-3xl">Sign in to your account</h3>
        
        <!-- Pesan kesalahan jika login gagal -->
        <div v-show="isVerified === -1" class="text-red-500">Username or password is incorrect</div>

        <!-- Input untuk username atau email -->
        <froms
        :id="'username'"
        :label="'Username Or Email'"
        :type="'text'"
        :placeholder="'Username'"
        v-model="user"
        />

        <!-- Input untuk password -->
        <froms
        :id="'password'"
        :label="'Password'"
        :type="'password'"
        :placeholder="'Password'"
        v-model="password"
        />

        <!-- Remember me dan forgot password -->
        <div class="flex justify-between items-center w-52 md:w-64 lg:w-[25rem]">
        <div class="flex items-center gap-1">
            <input type="checkbox" id="remember" />
            <label for="remember" class="text-[0.6rem] sm:text-xs">Remember me</label>
        </div>
        <div>
            <a href="#" class="text-blue-800 font-semibold text-[0.6rem] text-xs">Forgot Password?</a>
        </div>
        </div>

        <!-- Tombol sign in -->
        <buttons :text="'Sign In'" class="mt-4 md:mt-8 px-28" @click.prevent="SignIn"></buttons>

        <!-- Informasi atau tombol sign in dengan Google -->
        <p class="text-sm lg:text-xl md:text-lg sm:text-md">Or Continue with</p>
        <buttons :text="'Sign In With Google'" class="px-16"></buttons>
    </div>
    </div>
</template>

<script setup lang="ts">
import froms from '@/components/froms.vue'
import buttons from '@/components/buttons.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import router from '@/router'

// Menggunakan store untuk otentikasi
const authStore = useAuthStore()

// Variabel reaktif untuk data pengguna
const user = ref('')
const password = ref('')
const isVerified = ref(0)

// Fungsi untuk melakukan login
const SignIn = (): void => {
    authStore.SignIn(user.value, password.value)

    // Memeriksa apakah login gagal
    if (authStore.isSignIn === false) {
    isVerified.value = -1
    console.log('Username or password is incorrect', authStore.isSignIn)
    } else {
    // Jika login berhasil, pindahkan pengguna ke halaman utama
    isVerified.value = 1
    console.log(user, password, authStore.isSignIn)
    router.push({ name: 'home' })
    }
}
</script>
