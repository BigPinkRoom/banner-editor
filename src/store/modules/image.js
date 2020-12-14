import { InputImage } from '../../js/entities/inputImage';

export default {
  namespaced: true,
  state: {
    inputImage: {
      file: '',
      processedFile: '',
      width: 0,
      height: 0,
    },
  },
  mutations: {
    SET_INPUT_IMAGE(state, payload) {
      state.inputImage = payload;
    },
    REMOVE_INPUT_IMAGE(state) {
      state.inputImage = {
        file: '',
        processedFile: '',
        width: 1,
        height: 1,
      };
    },
    SET_EVENT(state, payload, value) {
      state.events[payload] = Boolean(value);
    },
  },
  actions: {
    // submit current uploaded image to store
    submitImageToStore({ commit, dispatch }, payload) {
      dispatch('shared/clearError', null, { root: true });

      // check file size (~4mb)
      if (payload.size > 2048 * 2048) {
        dispatch(
          'shared/setError',
          `Max upload image is 4 Mb. Your image is ${payload.size / 1000} Kb`,
          { root: true }
        );
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(payload);

      reader.onload = (event) => {
        const image = new Image();

        let imageWidth;
        let imageHeight;
        image.src = event.target.result;

        image.onload = function() {
          imageWidth = this.width;
          imageHeight = this.height;

          commit(
            'SET_INPUT_IMAGE',
            new InputImage({
              file: image,
              processedFile: '',
              width: imageWidth,
              height: imageHeight,
            })
          );
        };
      };
    },

    // remove image from store
    removeImageInStore({ commit }) {
      commit('REMOVE_INPUT_IMAGE');
    },
  },

  getters: {
    // return boolean - is image on store
    isImageOnStore(state) {
      return Boolean(state.inputImage.file);
    },
  },
};
