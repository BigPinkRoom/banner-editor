import { InputImage } from '../../js/entities/inputImage';

export default {
  namespaced: true,
  state: {
    inputImage: {
      file: '',
      fileName: '',
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
        fileName: '',
        processedFile: '',
        width: 1,
        height: 1,
      };
    },
  },
  actions: {
    /**
     * submit current uploaded image to store
     * @param {Object} payload - image object
     */
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
              fileName: payload.name,
              processedFile: '',
              width: imageWidth,
              height: imageHeight,
            })
          );
        };
      };
    },

    /**
     * remove image from store
     */
    removeImageInStore({ commit }) {
      commit('REMOVE_INPUT_IMAGE');
    },
  },

  getters: {
    /**
     * return boolean - is image on store
     * @returns {Boolean}
     */
    isImageOnStore(state) {
      return Boolean(state.inputImage.file);
    },

    /**
     * return object to export settings
     * @returns {Object}
     */
    imageInformation(state) {
      return {
        file: state.inputImage.fileName,
        processedFile: state.inputImage.processedFile,
        width: state.inputImage.width,
        height: state.inputImage.height,
      };
    },
  },
};
