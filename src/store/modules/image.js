import { InputImage } from '../../js/entities/InputImage';

export default {
  namespaced: true,
  state: {
    inputImage: {
      file: '',
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
        width: 0,
        height: 0,
      };
    },
  },
  actions: {
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
              width: imageWidth,
              height: imageHeight,
            })
          );
        };
      };
    },

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
