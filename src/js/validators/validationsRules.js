import {
  // alpha,
  // email,
  // maxLength,
  // minLength,
  maxValue,
  minValue,
  numeric,
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
      !this.$v.imageURL.required && errors.push('Image link is required');
      return errors;
    },
  },
};

/* -----------------------------
Validation on 'BannerEditSize.vue' 
------------------------------*/

export const validationBannerEditSize = {
  validations: {
    bannerWidth: {
      maxValue: maxValue(5000),
      minValue: minValue(10),
      numeric,
      required,
    },
    bannerHeight: {
      maxValue: maxValue(5000),
      minValue: minValue(10),
      numeric,
      required,
    },
  },
  errorMessages: {
    // error messages on banner width validation
    bannerWidthErrors() {
      const errors = [];
      if (!this.$v.bannerWidth.$dirty) return errors;
      !this.$v.bannerWidth.required &&
        errors.push('Width of banner is required');
      !this.$v.bannerWidth.maxValue && errors.push('Max width is 5000px');
      !this.$v.bannerWidth.minValue && errors.push('Min width is 10px');
      !this.$v.bannerWidth.numeric &&
        errors.push('Width is most be only digit');
      return errors;
    },

    // error messages on banner height validation
    bannerHeightErrors() {
      const errors = [];
      if (!this.$v.bannerHeight.$dirty) return errors;
      !this.$v.bannerHeight.required &&
        errors.push('Height of banner is required');
      !this.$v.bannerHeight.maxValue && errors.push('Max width is 5000px');
      !this.$v.bannerHeight.minValue && errors.push('Min width is 10px');
      !this.$v.bannerHeight.numeric &&
        errors.push('Width is most be only digit');
      return errors;
    },
  },
};
