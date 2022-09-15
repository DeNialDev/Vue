<template>
    <div>
        <a-row>
            <a-col span="12" offset="6">
                <a-form name="login" layout="vertical" autocomplete="off" :model="formState" @finish="onFinish"
                    @finishFailed="onFinishFailed">

                    <a-form-item name="email" label="Enter email:"
                        :rules="[{ required: true, message: 'Please input valid email', type: 'email' }]">
                        <a-input v-model:value="formState.email">

                        </a-input>
                    </a-form-item>
                    <a-form-item name="password" label="Enter password:"
                        :rules="[{ required: true, message: 'Please input your username!' }]">
                        <a-input-password v-model:value="formState.password">

                        </a-input-password>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser" :loading="userStore.loadingUser">Submit</a-button>
                    </a-form-item>
                </a-form>

            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '../stores/user'
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css'; //use ant-design-vue/es instead of ant-design-vue/lib
const userStore = useUserStore()


const formState = reactive({
    email: 'daniel@hotmail.com',
    password: 'morenocamacho'
})

const validateErrors = (params) => {
    if (!params){
        message.success('Welcome')
        return
    }
        
    switch (params) {

        case 'auth/user-not-found':
            message.error('Email not found')
            break
        case 'auth/wrong-password':
            message.error('Wrong password')
            break
        case 'auth/user-not-found':
            message.error('User not found')
            break
        default:
            alert('Internal  server error')
            break
    }
}

const onFinish = async (values) => {
    console.log('Success:', values);
    const error = await userStore.loginUser(formState.email, formState.password)
    console.log(error)
    validateErrors(error)
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
</script>