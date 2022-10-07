<!--<template>
  <div>
    <!-- <input v-validate="'required|alpha_num'" name="alpha_num_field" type="text">
    <span>{{ errors.first('alpha_num_field') }}</span> 
    <DInputText 
      :input="cc"
      :itemkey="{parentKey: 0, childKey: 'cc'}"/>
  </div>
</template>-->
<template>
  <div id="app">
    <form class="login-form" @submit.prevent="loginUser">
      <h2>Login</h2>

      <input-tag 
        v-model="tags"
        :validate="validateTag"
        :add-tag-on-blur="true"
      ></input-tag>

      <DInputText
        :input="currentStructure.data.step1.email"
        :itemkey="{parentKey: 0, childKey: 'email'}"
        :value="currentStructure.data.step1.email.value"
        @handleChange="handleChange"
      />
      <br>
      <br>
      <form-input
        label="Ruc"
        v-model="currentStructure.data.step1.ruc.value"
        type="text"
        @validate="validate('ruc.value')"
        @input="validate('ruc.value')"
        name="ruc"
        :error="errors['ruc.value']"
      ></form-input>
      <form-input
        label="Email"
        v-model="currentStructure.data.step1.email.value"
        type="email"
        @validate="validate('email.value')"
        @input="validate('email.value')"
        name="email"
        :error="errors['email.value']"
      ></form-input>
      <form-input
        label="Password"
        v-model="currentStructure.data.step1.password.value"
        type="password"
        @validate="validate('password.value')"
        @input="validate('password.value')"
        name="password"
        :error="errors['password.value']"
      ></form-input>
      <button class="btn btn-primary btn-block">Login</button>
    </form>
  </div>
</template>
<script>
import InputTag from 'vue-input-tag'
// import Vue from 'vue';
// import VeeValidate from 'vee-validate';

// Vue.use(VeeValidate);

// import { object, string, number, email, required, addMethod } from "yup"
import * as yup from 'yup'

// import FormInput from "./components/FormInput";

// const loginFormSchema = object().shape({
//   email: string()
//     .email("El email es inválido")
//     .required("El campo email es requerido")
//     .max(10, 'mmax Short!')
//     .label('First Name'),
//   password: string().required("El campo password es requerido")
// });

yup.addMethod(yup.string, "ruc", function (errorMessage) {
  return this.test(`test-ruc`, errorMessage, function (value) {
    const { path, createError } = this
    function rucValido(ruc) {
      //11 dígitos y empieza en 10,15,16,17 o 20
      if (!(ruc >= 1e10 && ruc < 11e9
        || ruc >= 15e9 && ruc < 18e9
        || ruc >= 2e10 && ruc < 21e9))
          return false
      return true
      // for (var suma = -(ruc%10<2), i = 0; i<11; i++, ruc = ruc/10|0)
      //   suma += (ruc % 10) * (i % 7 + (i/7|0) + 1);
      // return suma % 11 === 0
    }
    return (
      (value && rucValido(value)) ||
      createError({ path, message: errorMessage })
    )
  })
})

export default {
  name: 'IndexPage',
  components: {
    InputTag
  },
  data() {
    return {

      tags: ['hello'],

      currentStructure: {
        data: {
          step1: {
            ruc: {
              label: "Ruc",
              as: "input",
              type: "number",
              value: "",
              validator: (rule, value) => value === 'muji'
            },
            email: {
              label: "Email",
              type: "email",
              value: ""
            },
            password: {
              label: "Password",
              type: "password",
              value: ""
            }
          }
        },
        
        validations: yup.object({
          email: yup.object({
            value: yup.string()
            .email("El email es inválido")
            .required("El campo email es requerido")
          }),
          password: yup.object({
            value: yup.string()
            .required("El campo password es requerido")
            .min(8, "El valor mínimo es 8 caracteres")
          }),
          ruc: yup.object({
            value: yup.string()
            .required("El campo ruc es requerido")
            //.matches(/^[0-9]+$/, "Deben ser solo dígitos")
            .ruc("El ruc es inválido")
            .min(11, 'Debe tener exactamente 11 dígitos')
            .max(11, 'Debe tener exactamente 11 dígitos')
            //.ruc()//.required("El campo ruc es requerido")//.ruc("El ruc es inválido")
          })
        })

      },

      errors: {},

      cc: {
        name: 'cc',
        label: 'CC',
        type: 'text',
        placeholder: '',
        valid: false,
        value: '',
        disabled: false,
        required: 'true',
        minLength: 11, //7
        maxLength: 25,  //30
        errorMessage: '',
        is_visible: true,
        has_error: false,
        regexp: 'only_digits',
        rules: {
          type: "string",
          min: 2,
          max: 10,
          message: ""
        }
        // rules: {
        //   name: Yup.string()
        //     .min(2, 'Too Short!')
        //     .max(70, 'Too Long!')
        //     .required('Required'),
        //   email: Yup.string()
        //     .email('Invalid email')
        //     .required('Required'),
        //   ruc: Yup.number()
        //     .ruc('Ruc inválido')
        //     .required('El campo ruc es requerido')
        //     .min(11, 'El campo ruc debe tener mínimo 11 caracteres')
        //     .max(11, 'El campo ruc debe tener máximo 11 caractres'),
        //   dni: Yup.number()
        //     .dni('Dni inválido')
        //     .required('El campo ruc es requerido')
        //     .min(8, 'El campo ruc debe tener mínimo 11 caracteres')
        //     .max(8, 'El campo ruc debe tener máximo 11 caractres')
        // }
      },

    }
  },
  methods: {

    validateTag(val) {
      console.log("tags", val);
      return true
    },

    handleChange(value, key) {
      let currentStructure = this.currentStructure.data.step1
      currentStructure[key.childKey].value = value.value
      // console.log("handleChange", value)
      // console.log("handleChange", key)
    },

    loginUser() {
      const { data, validations } = this.currentStructure
      // console.log("step1", data)
      validations.validate(data.step1, { abortEarly: false }).then((res) => {
        console.log("res", res)
      }).catch((err) => {
        err.inner.forEach((error) => {
          //console.log("err", this.errors)
          this.errors = { ...this.errors, [error.path]: error.message }
        })
      })
    },
    
    validate(field) {
      //console.log("field", field)
      const { data, validations } = this.currentStructure
      validations.validateAt(field, data.step1).then(() => {
        this.errors[field] = ""
      }).catch(err => {
        this.errors = { ...this.errors, [err.path]: err.message }
        //this.errors[err.path] = err.message
      })
    }

  }
}
</script>
