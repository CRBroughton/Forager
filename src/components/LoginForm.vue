<!-- <script setup lang="ts">
const emit = defineEmits(['toggleSettings'])
</script>

<template>
  <div class="login-inputs">
    <div class="flex justify-center items-center gap-2">
      <img src="../../public/assets/logo.png" width="52" height="52">
      <h1 class="title">
        Forager
      </h1>
      <div class="ml-auto hover:cursor-pointer" @click="emit('toggleSettings')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z" /></svg>
      </div>
    </div>
    <slot />
    <div class="absolute bottom-0 w-full flex justify-center p-4">
      <p class="font-medium">
        Copyright © 2023 Craig R Broughton
      </p>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 32px;
  font-weight: 500;
}

.login-inputs {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    align-items: center;
    height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    padding-inline: 1em;
}
</style> -->

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div class="w-full grid lg:grid-cols-2 h-screen ">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">
            Forager
          </h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <!-- <a
                href="/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a> -->
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" class="w-full">
            Login
          </Button>
          <Button variant="outline" class="w-full">
            Login with Discord
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="#" class="underline">
            Sign up
          </a>
          <p class="text-xs pt-1">
            Copyright © 2023 Craig R Broughton
          </p>
        </div>
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
