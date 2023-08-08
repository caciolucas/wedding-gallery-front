<template>
  <div class="min-w-full p-4 flex justify-end mb-8">
    <NuxtLink
      as="a"
      href="/login"
      class="bg-green-500 text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium hover:transition-all flex mr-2"
      v-if="!authenticated"
    >
      <CheckBadgeIcon class="h-6 w-6 mr-2" aria-hidden="true" />
      Área Restrita
    </NuxtLink>

    <NuxtLink
      as="a"
      href="/approve"
      class="bg-green-500 text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium hover:transition-all flex mr-2"
      v-else
    >
      <CheckBadgeIcon class="h-6 w-6 mr-2" aria-hidden="true" />
      Aprovar Fotos
    </NuxtLink>

    <NuxtLink
      as="a"
      href="/upload"
      class="bg-green-500 text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium hover:transition-all flex"
    >
      <CloudArrowUpIcon class="h-6 w-6 mr-2" aria-hidden="true" />
      Envie sua foto
    </NuxtLink>
  </div>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8 mx-auto"
    style="max-width: 1280px"
  >
    <div
      v-for="picture in pictures"
      :key="picture"
      class="rounded overflow-hidden shadow-lg mx-auto w-full h-80 flex flex-col justify-between"
    >
      <img
        class="min-h-1/2 w-full object-cover h-40"
        :src="picture.image"
        :alt="picture.description"
      />
      <div class="px-6 py-4">
        <p class="text-gray-700 text-base">
          {{ picture.description }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2 flex justify-end">
        <div
          class="rounded-md bg-gray-100 px-2 py-1 text-sm font-bold text-gray-700 ml-2"
        >
          4 ❤️
        </div>
        <div
          class="rounded-md bg-gray-100 px-2 py-1 text-sm font-bold text-gray-700 ml-2"
        >
          5 😍
        </div>
      </div>
      <div class="px-6 pt-4 pb-2 flex justify-between mb-2">
        <div
          class="rounded-md bg-green-100 px-2 py-1 text-sm font-bold text-green-500 flex"
        >
          <span> 50 </span>
          <ChatBubbleLeftIcon
            class="ml-1.5 w-3 flex-shrink-0"
            aria-hidden="true"
          />
        </div>
        <span
          class="inline-block whitespace-nowrap rounded-md bg-green-100 px-2 py-1 text-center align-top text-sm font-bold leading-none text-green-700"
        >
          {{ picture.uploaded_by }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckBadgeIcon } from "@heroicons/vue/20/solid";
import {
  ArrowUpLeftIcon,
  ChatBubbleLeftIcon,
  CloudArrowUpIcon,
} from "@heroicons/vue/24/solid";

// Fetch the pictures from the API
const { data: pictures } = await useFetch(
  "http://35.168.27.195/wedding-gallery/api/v1/pictures/?approved=true"
);

// Export the components for template usage
const components = {
  ChatBubbleLeftIcon,
  ArrowUpLeftIcon,
  CloudArrowUpIcon,
  CheckBadgeIcon,
};

const authenticated = computed(() => {
  if (typeof window !== "undefined") {
    return !!window.localStorage.getItem("@wedding-gallery/token");
  }
  return false;
});
</script>
