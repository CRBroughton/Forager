<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePocketBase } from '@/stores'

const emit = defineEmits(['toggleSettings'])

const pocketbaseStore = usePocketBase()

const { username, password, passwordConfirm, canSignUp, canLogin, mapboxAPIKey } = storeToRefs(pocketbaseStore)
const signingUp = ref(false)

async function loginInUser() {
  const result = await pocketbaseStore.login()

  if (result === 'success')
    location.reload()
}

async function loginUserWithDiscord() {
  const result = await pocketbaseStore.loginWithDiscord()

  if (result === 'success')
    location.reload()
}
</script>

<template>
  <div class="w-full grid lg:grid-cols-2 h-screen">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <slot>
          <div class="flex gap-2 justify-center">
            <h1 class="text-3xl font-bold">
              Forager
            </h1>
            <div class="top-0 right-0 hover:cursor-pointer" @click="emit('toggleSettings')">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z" /></svg>
            </div>
          </div>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="username">Username</Label>
              <Input
                id="username"
                v-model="username"
                type="text"
                placeholder="MyUsername"
                required
              />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
              </div>
              <Input id="password" v-model="password" placeholder="password" type="password" required />
            </div>
            <div v-if="signingUp" class="grid gap-4">
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label for="confirm_password">Confirm password</Label>
                </div>
                <Input id="confirm_password" v-model="passwordConfirm" placeholder="confirm password" type="password" required />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label for="mapbox_api_key">Mapbox API key</Label>
                </div>
                <Input id="mapbox_api_key" v-model="mapboxAPIKey" placeholder="api key" type="password" required />
              </div>
            </div>
            <div v-if="!signingUp" class="grid gap-2">
              <Button type="submit" class="w-full" :disabled="!canLogin" @click="loginInUser">
                Login
              </Button>
              <Button variant="outline" class="w-full" @click="loginUserWithDiscord">
                Login with Discord
              </Button>
            </div>
            <div v-else class="grid gap-2">
              <Button type="submit" class="w-full" :disabled="!canSignUp" @click="pocketbaseStore.createAccount">
                Signup
              </Button>
              <Button variant="outline" class="w-full" :disabled="mapboxAPIKey.length <= 0" @click="loginUserWithDiscord">
                Signup with Discord
              </Button>
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            <div v-if="!signingUp">
              Don't have an account?
              <a class="underline" @click="signingUp = !signingUp">
                Sign up
              </a>
            </div>
            <div v-if="signingUp">
              Already have an account?
              <a class="underline" @click="signingUp = !signingUp">
                Login in here
              </a>
            </div>
            <p class="text-xs pt-1">
              Copyright © 2023 Craig R Broughton
            </p>
          </div>
        </slot>
      </div>
    </div>
    <div class="hidden bg-muted h-full lg:flex lg:justify-center lg:items-center ">
      <img
        src="/public/assets/logo.png"
        alt="Image"
        width="200"
        height="200"
        class="flex object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </div>
  </div>
</template>
