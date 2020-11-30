import {
  // alpha,
  // email,
  // maxLength,
  // minLength,
  // numeric,
  required,
  // sameAs,
} from 'vuelidate/lib/validators';

/* -----------------------------
Validation on 'BannerEditInputImage.vue' 
------------------------------*/

export const validationBannerEditInputImage = {
  validations: {
    imageURL: {
      required,
    },
  },
  errorMessages: {
    // error messages on imageURL validation
    imageURLErrors() {
      const errors = [];
      if (!this.$v.imageURL.$dirty) return errors;
      !this.$v.imageURL.required && errors.push('image link is required');
      return errors;
    },
  },
};
