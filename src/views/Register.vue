<template>
    <div>
        <a-row>
            <a-col span="12" offset="6">
                <a-form name="register" layout="vertical" autocomplete="off" :model="formState" @finish="onFinish"
                    @finishFailed="onFinishFailed">
                    <a-form-item name="email" label="Enter email"
                        :rules="[{required: true, message: 'Please input valid email', type: 'email'}]">
                        <a-input v-model:value="formState.email">
                        </a-input>
                    </a-form-item>
                    <a-form-item name="password" label="Enter password"
                        :rules="[{ required: true, message: 'Please input valid password', min: 6}]">
                        <a-input-password v-model:value="formState.password">
                        </a-input-password>
                    </a-form-item>
                    <a-form-item name="checkPass" label="Confirm your password" :rules="[{validator: validatePass, }]">
                        <a-input-password v-model:value="formState.checkPass">
                        </a-input-password>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser" :loading="userStore.loadingUser">Register
                        </a-button>
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
const userStore = useUserStore()

const formState = reactive({
    email: '',
    password: '',
    checkPass: '',
})
const validatePass = async (_rule, value) => {
    if (value === '') {
        return Promise.reject("Please input the password again")
    }
    if (value !== formState.password) {
        return Promise.reject("Two inputs don't match")
    }
    return Promise.resolve()
}

const validateErrors = (params) => {
    if (!params){
        message.success('Registerd succesfull')
        return
    }
        
    switch (params) {
        
        case 'auth/email-already-in-use':
            alert('Email already exists')
            break
        case 'auth/wrong-password':
            alert('Internal  server error')
            break
        
        default:
            alert('Internal server error')
            break
    }
}
const onFinish = async (values) => {
    console.log('Success:', values);
    const error = await userStore.registerUser(formState.email, formState.password)
    validateErrors(error)
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
</script>