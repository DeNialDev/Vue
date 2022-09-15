<template>
  <div>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>

    <add-form></add-form>

    <p v-if="databaseStore.loadingDoc">loading docs...</p>
    <a-space
      direction="vertical"
      v-if="!databaseStore.loadingDoc"
      style="width: 100%"
    >
      <a-card
        :title="item.short"
        v-for="item of databaseStore.documents"
        :key="item.id"
      >
        <template #extra>
          <a-space>
            <a-popconfirm
              title="Are you sure delete this URL?"
              okText="Yes"
              cancelText="No"
              @confirm="confirm(item.id)"
              @cancel="cancel"
            >
              <a-button danger>Delete</a-button>
            </a-popconfirm>

            <a-button type="primary" @click="router.push(`/editar/${item.id}`)"
              >Edit</a-button
            >
          </a-space>
        </template>
        <p>{{ item.name }}</p>
      </a-card>
    </a-space>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { async } from "@firebase/util";
const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();

databaseStore.getUrls();

const confirm = async (id) => {
  await databaseStore.deleteUrl(id);
  message.success("Deleted");
};
const cancel = () => {
  message.error("You cancel this action");
};
</script>
