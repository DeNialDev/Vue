<template>
  <a-form
    name="formuUrl"
    autocomplete="off"
    layout="vertical"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    :model="formState"
  >
    <a-form-item
      name="urls"
      label="Type new url"
      :rule="[{required: true,  whitespace: true, pattern: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
        message: 'Type valid url'
        }]"
    >
    </a-form-item>
    <a-form-item>
        <a-button type="">Agregar url</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive } from "vue";

const formState = reactive({});
const onFinish = async (value) => {
  console.log(value);
};
const onfinishFailed = (value) => {
  console.log(value);
};
</script>
