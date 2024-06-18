<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePocketBase } from '@/stores'

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
          <div class="grid gap-2 text-center">
            <h1 class="text-3xl font-bold">
              Forager
            </h1>
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
