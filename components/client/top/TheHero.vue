<template>
    <section>
        <div class="relative overflow-hidden dark:bg-darker lg:overflow-auto" id="home">
      <div class="absolute inset-x-0 top-32 lg:hidden">
        <div aria-hidden="true" class="grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-60 2xl:mx-auto 2xl:max-w-screen-xl">
          <div class="h-60 bg-gradient-to-br from-primary to-purple-400 blur-3xl dark:from-blue-700"></div>
          <div
            class="h-72 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 blur-3xl dark:from-transparent dark:to-indigo-600">
          </div>
        </div>
      </div>
      <div class="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-6 xl:px-0">
        <div class="relative ml-auto pt-40 xl:pt-36">
          <div class="gap-12 md:flex md:items-center">
            <div class="text-center sm:px-12 md:w-2/3 md:px-0 md:text-left lg:w-1/2">
              <h1 class="text-5xl font-black dark:text-white md:text-6xl xl:text-7xl">Business management made easy</h1>
              <div class="">
                <p class="mt-8 text-lg text-gray-700 dark:text-gray-100">Odio incidunt nam sit illum. Voluptas doloribus
                  asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p>
                <div class="mt-12 flex justify-center gap-4 sm:gap-6 md:justify-start">
                  <a href="/register" class="before:bg-primary astro-Z4ZYBUMP"><span class="text-white astro-Z4ZYBUMP">
                      Get started
                    </span></a>


                  <a href="#solution"
                    class="before:border before:border-transparent before:bg-primary/10 dark:before:border-gray-700 dark:before:bg-gray-800 astro-Z4ZYBUMP"><span
                      class="text-primary dark:text-white astro-Z4ZYBUMP">
                      Learn more
                    </span></a>
                </div>
              </div>
            </div>
            <div class="relative mt-20 md:mt-0 md:w-2/5 lg:w-3/5">
              <div class="-ml-6 md:-mr-72 lg:mr-0">
                <img class="h-full object-cover object-left dark:hidden" src="./images/hero.webp" alt="app screenshot"
                  width="1628" height="1233">
                <img class="hidden h-full object-cover object-left dark:block" src="./images/hero-dark.webp"
                  alt="app screenshot" width="1628" height="1233">
              </div>
            </div>
          </div>

          <div class="mt-8 text-center md:mt-32 lg:mt-20 xl:mt-16">
            <span class="text-sm font-semibold tracking-wider text-gray-800 dark:text-white">TRUSTED BY YOUR FAVORED TOP
              TECHS COMPANIES</span>
            <div
              class="mt-8 flex flex-wrap items-center justify-center gap-6 brightness-75 contrast-200 grayscale dark:brightness-200 dark:contrast-0 sm:justify-between lg:gap-24">
              <img class="h-8 w-auto lg:h-14" src="images/clients/airbnb.svg" loading="lazy" alt="airbnb" width="100"
                height="">
              <img class="h-6 w-auto lg:h-10" src="images/clients/google.svg" loading="lazy" alt="bissell" width="100"
                height="">
              <img class="h-6 w-auto lg:h-10" src="images/clients/ge.svg" loading="lazy" alt="ge" width="100"
                height="100">
              <img class="h-6 w-auto lg:h-10" src="images/clients/netflix.svg" loading="lazy" alt="lilly" width="100"
                height="100">
              <img class="h-8 w-auto lg:h-14" src="images/clients/microsoft.svg" loading="lazy" alt="microsoft"
                width="100" height="">
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>