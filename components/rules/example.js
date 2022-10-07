const data = {
    _id: null,
    _rand: null,
    data: {
      step1: {
        empresa: {
          name: 'empresa',
          label: 'Empresa',
          type: 'select',
          placeholder: '',
          valid: false,
          value: '',
          disabled: false,
          required: 'true',
          is_visible: true,
          equalTo: 11,
          errorMessage: '',
          has_error: false,
        //   asyncValidator: (rule, value) => {
        //     return new Promise((resolve, reject) => {
        //       if (value < 18) {
        //         reject('too young');  // reject with error message
        //       } else {
        //         resolve();
        //       }
        //     });
        //   },
        //   validations: {
        //     required,
        //     minLength: minLength(4),
        //   }
        },
        cliente: {
          name: 'cliente',
          label: 'Cliente',
          type: 'select',
          placeholder: '',
          valid: false,
          value: '',
          disabled: false,
          required: 'true',
          is_visible: true,
          errorMessage: '',
          has_error: false
        },
        moneda: {
            name: 'moneda',
            label: 'Moneda',
            type: 'select',
            placeholder: '',
            valid: false,
            value: '',
            old_value: '',
            alias: '',
            disabled: false,
            required: 'true',
            is_visible: true,
            errorMessage: '',
            has_error: false,
        },
        monto: {
            name: 'monto',
            label: 'Monto neto de las facturas',
            type: 'text',
            placeholder: '',
            valid: false,
            value: '',
            disabled: false,
            required: 'true',
            minLength: 2,
            maxLength: 12,
            errorMessage: '',
            is_visible: true,
            has_error: false,
            regexp: '^$|^\\d+[.]?\\d{0,2}$',
            errorMessage: 'Mínimo 2 digitos'
        },
        fecha_pago: {
            name: 'fecha_pago',
            label: 'Fecha de pago',
            type: 'datepicker',
            placeholder: 'Selecciona una fecha',
            valid: false,
            value: '',
            disabled: false,
            required: 'true',
            is_visible: true,
            errorMessage: '',
            has_error: false
        }
      },
      step2: {
        cuenta: {
          name: 'cuenta',
          label: 'Cuenta bancaria',
          type: 'select',
          placeholder: '',
          valid: false,
          value: '',
          disabled: false,
          required: 'true',
          is_visible: true,
          errorMessage: '',
          has_error: false
        },
        modalidad: {
          name: 'modalidad',
          label: 'Modalidad',
          type: 'radio',
          placeholder: '',
          valid: true,
          value: '',
          disabled: false,
          required: 'true',
          is_visible: true,
        }
      }
    },
    // validations: {
    //     step1: yup.object().shape({
    //         fname: yup.string().required().min(5),
    //         lname: yup.string().required().min(5),
    //     }),
    //     step2: {

    //     }
    // }
  }
  
  export default data
  