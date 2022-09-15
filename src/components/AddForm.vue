<script setup>
import { reactive } from "vue";
import { useDatabaseStore } from "../stores/database";
import { message } from "ant-design-vue";

const databaseStore = useDatabaseStore();
const formState = reactive({
  url: "",
});
const validateErrors = (param) => {
  if (!param) {
    message.success("URL added");
    return;
  }
  switch (param) {
    default:
      message.error("Internal Server Error");
  }
};
const onFinish = async () => {
  const error = await databaseStore.addUrl(formState.url);
  validateErrors(error);
};
</script>

<template>
  <a-form
    name="addform"
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
      <a-button type="primary" htmlType="submit" :loading="databaseStore.loadingDoc" :disabled="databaseStore.loadingDoc">Add url</a-button>
    </a-form-item>
  </a-form>
</template>
