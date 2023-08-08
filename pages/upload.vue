<template>
  <div class="min-w-full p-4 flex justify-end mb-8">
    <NuxtLink
      as="a"
      class="bg-green-500 text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium hover:transition-all flex"
      href="/"
    >
      <ArrowLeftCircleIcon class="h-6 w-6 mr-2" aria-hidden="true" />
      Voltar para galeria
    </NuxtLink>
  </div>
  <div class="max-w-xl mx-auto">
    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div class="col-span-full">
        <label
          for="cover-photo"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Foto</label
        >
        <div
          class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
        >
          <div class="text-center">
            <div class="relative" v-if="preview.url">
              <img
                :src="preview.url"
                alt="Uploaded files"
                class="rounded-lg shadow-md"
              />
              <button
                class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex justify-center items-center"
                @click="removeUploadedFile"
              >
                <span class="text-xs"
                  ><TrashIcon class="h-6 w-6 text-white" aria-hidden="true"
                /></span>
              </button>
            </div>
            <div v-else>
              <div class="mt-4 flex text-sm text-gray-600 flex-col">
                <label
                  for="file-upload"
                  class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Insira um arquivo</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                    ref="files"
                    @change="generatePreview"
                  />
                </label>
              </div>

              <p class="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF até 10MB
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-full">
        <label
          for="description"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Descrição</label
        >
        <div class="mt-2">
          <textarea
            id="description"
            name="description"
            rows="3"
            class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            v-model="picture.description"
          />
        </div>
        <p class="mt-3 text-sm leading-6 text-gray-600">
          Descreva um pouco sobre o que é a foto e o que ela representa.
        </p>
      </div>
      <div class="col-span-full">
        <label
          for="username"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Seu nome
        </label>
        <div class="mt-2">
          <div
            class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
          >
            <input
              type="text"
              name="name"
              id="lastname"
              autocomplete="username"
              class="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Cácio"
              v-model="picture.uploaded_by"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="min-w-full mt-4 flex justify-end">
      <button
        class="block rounded-md px-3 py-2 text-base font-medium hover:transition-all flex"
        :class="{
          'bg-green-500 text-white hover:bg-green-700 hover:text-white':
            enabled,
          'bg-gray-500 text-white cursor-default': !enabled,
        }"
        :disable="!enabled"
        @click="sendPicture"
      >
        <CheckIcon class="h-6 w-6 mr-2" aria-hidden="true" />
        Salvar
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowLeftCircleIcon,
  CheckIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";
import { ref } from "vue";
import { useToast } from "vue-toastification";
const preview = ref({});
const file = ref(null);
const picture = ref({});
const router = useRouter();
const toast = useToast();

const enabled = computed(() => {
  return (
    picture.value.description && picture.value.uploaded_by && preview.value.url
  );
});

const generatePreview = (e) => {
  const fileValue = e.target.files[0];
  file.value = fileValue;
  preview.value.url = URL.createObjectURL(fileValue);
  preview.value.name = fileValue.name;
  preview.value.size = (fileValue.size / 1000).toFixed(2) + " MB";
};

const removeUploadedFile = () => {
  preview.value = {};
  $refs.files = { files: [] };
};

const sendPicture = () => {
  console.log("sendPicture");
  if (!enabled.value) return;
  const formData = new FormData();
  formData.append("image", file.value);
  formData.append("description", picture.value.description);
  formData.append("uploaded_by", picture.value.uploaded_by);

  useFetch("http://35.168.27.195/wedding-gallery/api/v1/pictures/", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      toast.success("Sua imagem foi enviada!", {
        position: "bottom-center",
        timeout: 5000,
        pauseOnFocusLoss: true,
        showCloseButtonOnHover: false,
      });
      router.back();
    })
    .catch((error) => {
      toast.error("Erro ao enviar imagem, tente novamente mais tarde", {
        position: "bottom-center",
        timeout: 5000,
        pauseOnFocusLoss: true,
        showCloseButtonOnHover: false,
      });
    });
  // $api
  //   .post("/api/v1/pictures/", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   .then((response) => {
  //     showOverlay.value = false;
  //     $router.push("/pictures");
  //   })
  //   .catch((error) => {
  //     showOverlay.value = false;
  //     console.log(error);
  //   });
};

// Export the components for template usage
const components = {
  CheckIcon,
  TrashIcon,
  ArrowLeftCircleIcon,
};
</script>
