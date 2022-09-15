<template>
  <div>
    <h1>{{ route.params.id }}</h1>
    <a-form
      name="editform"
      autocomplete="off"
      layout="vertical"
      @finish="onFinish"
      :model="formState"
    >
      <a-form-item
        name="url"
        label="Type new url"
        :rules="[
          {
            required: true,
            whitespace: true,
            pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: 'Type valid url',
          },
        ]"
      >
        <a-input v-model:value="formState.url"></a-input>
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          htmlType="submit"
          :loading="databaseStore.loadingDoc"
          :disabled="databaseStore.loadingDoc"
          >Edit URL</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";
import { message } from "ant-design-vue";
const databaseStore = useDatabaseStore();

const route = useRoute();
// console.log(route.params.id)

const formState = reactive({
  url: "",
});
const validateErrors = (param) => {
  if (!param) {
    message.success("URL updated");
    return;
  }
  switch (param) {
    default:
      message.error("Internal Server Error");
      break;
  }
};
const onFinish = async () => {
  const error = await databaseStore.updateUrl(route.params.id, formState.url);
  validateErrors(error);
};

onMounted(async () => {
  formState.url = await databaseStore.readUrl(route.params.id);
});
</script>
