<template>
  <div :class="{'has-error': computedHasError}" class="wct-input-text">
    <input
      :id="id"
      class="input"
      :class="{'input-disabled': input.disabled}"
      :data-qa="input.name"
      :placeholder="input.placeholder"
      :value="value"
      :disabled="input.disabled"
      @input="onValueChange($event, input, itemkey)"
    >
      <!-- @blur="onBlurHandler($event, input, itemkey)" -->
    <transition name="wct-fade">
      <div
        v-show="computedHasError"
        class="error"
      >{{input.errorMessage ? input.errorMessage : errorMessage}}</div>
    </transition>
  </div>
</template>
<script type="text/javascript">
import { email } from './rules'

console.log("validate", email("abc@.com"))
export default {
  name: "DInputText",
  props: {
    input: {
      type: Object,
      default() {
        return {
          disabled: false
        }
      }
    },
    value: {
      default() {
        return ""
      }
    },
    invalid: {
      type: Boolean,
      default() {
        return false
      }
    },
    id: {
      type: String,
      default() {
        return ""
      }
    },
    itemkey: {
      type: Object,
      required: true
    },
    useKeyPress: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hasError: false,
      regexEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  mounted() {
    // if ("regexp" in this.input && this.id != "") {
    //   let s_regexp = this.input.regexp
    //   if (s_regexp == "only_digits") {
    //     // se antepone un \ al \ para escapar y decirle que lea \d que significa solo digitos
    //     s_regexp = "^\\d*$"
    //   } else if (s_regexp == "only_letters_space") {
    //     s_regexp = "^\\D*$"
    //   }
    //   this.setInputFilter(
    //     document.getElementById(this.id),
    //     function(value) {
    //       let o_regExp = new RegExp(s_regexp)
    //       return o_regExp.test(value)
    //     },
    //     this
    //   )
    // }
  },
  computed: {
    computedHasError() {
      if (this.input.has_error) {
        return true
      } else {
        if (this.input.required) {
          //Se agrego esta condicional para el caso de campos opcionales
          //valida si el campo es requerido
          return this.hasError && !this.input.disabled
        } else {
          return false
        }
      }
    },
    errorMessage() {
      return (this.applyRules(this.value, this.input) && this.applyRules(this.value, this.input).message)
    }
  },
  methods: {

    handleInputBlur(e) {
      this.isInputActive = false;
      this.addNew(e);
    },
    
    setInputFilter(textbox, inputFilter, vm) {
      ;["input"].forEach(function(event) {
        textbox.addEventListener(event, function() {
          if (inputFilter(this.value)) {
            this.oldValue = this.value
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue
          } else {
            this.oldValue = vm.input.value
            this.value = vm.input.value
          }
        })
      })
    },
    onKeyUp($event) {
      this.$emit("onKeyUp", $event.target.value)
    },
    onlyNumber($event) {
      if (this.useKeyPress) {
        let maxLength =
          "equalTo" in this.input ? this.input.equalTo : this.input.maxLength
        if ($event.target.value.length < parseInt(maxLength)) {
          if (this.input.type === "number") {
            let keyCode = $event.keyCode ? $event.keyCode : $event.which
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
              $event.preventDefault()
            }
          }
        } else {
          $event.preventDefault()
        }
      }
    },

    async onValueChange(evt, input, key) {

        const isValid = await this.validateIfNeeded(evt, input, key);

        this.$emit(
            "handleChange",
            { value: evt.target.value, valid: true /*evaluation.result*/ },
            key
        )
    },

    validateIfNeeded(evt, input, key) {

        const value = evt.target.value

        // if (input.hasOwnProperty('validator') && typeof input.validator === "function") {
        //     return input.validator(value)
        // }

        

    },

    onBlurHandler(evt, input, key) {
      let vm = this
      let evaluation = vm.applyRules(evt.target.value, input)

      console.log(
        "evaluation", evaluation
      );

    //   if (!input.required) {
    //     evaluation.result = true
    //   }

    //   vm.hasError = !evaluation.result
      // vm.errorMessage = vm.input.errorMessage  ? vm.input.errorMessage  : evaluation.message

      this.$emit(
        "handleChange",
        { value: evt.target.value, valid: true /*evaluation.result*/ },
        key
      )
    },

    applyRules(value, input) {
        console.log("value", value);
    
        let vm = this

        // let value = value

        // console.log("emmail value", input.value);
        // console.log("validate email", email(input.value))

        let result = { result: false, message: "message default" }

        switch (input.type) {
            case "email":
                result = {
                    result: !email(input.value),
                    message:  !email(input.value) ? "El correo no es valido." : ""
                }
            break;
        }

        console.log("result", result)

        return result



    //   let result = { result: false, message: "message default" }

    //   if ("equalTo" in input) {
    //     switch (input.type) {
    //       case "date":
    //         return {
    //           result: value.length != input.equalTo ? false : true,
    //           message:
    //             value.length != input.equalTo ? "La fecha es invalida" : ""
    //         }
    //         break
    //       case "text":
    //         return {
    //           result: value.length != input.equalTo ? false : true,
    //           message:
    //             value.length != input.equalTo
    //               ? "Igual a " + input.equalTo + " caracteres"
    //               : ""
    //         }
    //         break
    //       case "number":
    //         return {
    //           result: value.length != input.equalTo ? false : true,
    //           message:
    //             value.length != input.equalTo
    //               ? "Igual a " + input.equalTo + " digitos"
    //               : ""
    //         }
    //         break
    //     }
    //   }

    //   let inputLenght = String(value).length

    //   switch (input.type) {
    //     case "email":
    //       input.value = value.trim()
    //       result = {
    //         result: vm.regexEmail.test(
    //           String(value)
    //             .toLowerCase()
    //             .trim()
    //         )
    //           ? true
    //           : false,
    //         message: vm.regexEmail.test(
    //           String(value)
    //             .toLowerCase()
    //             .trim()
    //         )
    //           ? ""
    //           : "El correo no es valido."
    //       }
    //       break
    //     case "text":
    //       result = {
    //         result: inputLenght < parseInt(input.minLength) ? false : true,
    //         message:
    //           inputLenght < parseInt(input.minLength)
    //             ? "Mínimo " + input.minLength + " caracteres"
    //             : ""
    //       }
    //       break
    //     case "number":
    //       result = {
    //         result: inputLenght < parseInt(input.minLength) ? false : true,
    //         message:
    //           inputLenght < parseInt(input.minLength)
    //             ? "Mínimo " + input.minLength + " digitos"
    //             : ""
    //       }
    //       break
    //   }

    //   return result
    }
  }
}
</script>
