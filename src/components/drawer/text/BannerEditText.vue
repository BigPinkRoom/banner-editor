<template>
  <v-container class="banner-edit-text__container">
    <v-row>
      <v-col>
        <!-- title -->
        <v-row>
          <v-col>
            <p class="text-uppercase green--text mb-0">Banner text settings</p>
            <v-divider color="green"></v-divider>
          </v-col>
        </v-row>

        <!-- text modules container -->
        <v-expansion-panels>
          <v-container>
            <v-row>
              <!-- text module -->
              <v-expansion-panel
                v-for="(EditTextModule, index) in editTextModules"
                :key="index"
                class="banner-edit-text__module d-flex flex-column mx-0 my-1"
              >
                <!-- text module header (allways shown) -->
                <v-expansion-panel-header class="pb-3">
                  <!-- text module remove button -->
                  <v-btn
                    absolute
                    class="banner-text-edit__close-button"
                    color="blue-grey"
                    dark
                    fab
                    x-small
                    @click.stop="deleteTextBlock(index)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>

                  <!-- text module textarea-->
                  <v-col class="py-0 pl-0">
                    <v-textarea
                      v-model="EditTextModule.settings.text"
                      color="green"
                      dense
                      label="Your text (max 1000 symbols)"
                      maxlength="1000"
                      outlined
                      rows="1"
                    ></v-textarea>
                  </v-col>
                </v-expansion-panel-header>

                <!-- extra settings for text module -->
                <v-expansion-panel-content>
                  <!-- font family -->
                  <v-row class="banner-edit-text__settings mx-0 mb-3">
                    <v-col class="col-6 py-0 pl-0 pr-1">
                      <v-select
                        v-model="EditTextModule.settings.fontFamily"
                        :items="fontFamilies"
                        dense
                        label="Font family"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col class="col-6 py-0 pl-1 pr-0">
                      <app-banner-edit-text-color
                        :currentEditTextModuleIndex="index"
                        @changeColorRGBA="
                          (selectedColorRGBA) =>
                            (EditTextModule.color = selectedColorRGBA)
                        "
                      />
                    </v-col>
                  </v-row>

                  <!-- font size -->
                  <v-row class="banner-edit-text__settings ma-0">
                    <v-col class="col-6 py-0 pl-0 pr-1">
                      <v-select
                        v-model="EditTextModule.settings.size"
                        :items="fontSizes"
                        dense
                        label="Size"
                        outlined
                        @input="correctPositionTextModule(EditTextModule)"
                      ></v-select>
                    </v-col>

                    <!-- font weight -->
                    <v-col class="col-6 py-0 pl-1 pr-0">
                      <v-select
                        v-model="EditTextModule.settings.weight"
                        :items="fontWeight"
                        dense
                        label="Weight"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-row>
          </v-container>
        </v-expansion-panels>

        <!-- button to add new text module -->
        <v-row>
          <v-col>
            <v-btn
              block
              class="white--text"
              color="green"
              @click="addTextBlock"
            >
              + Add text</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BannerEditTextColor from './BannerEditTextColor';
import { TextBlock } from '../../../js/entities/textBlock';

export default {
  name: 'BannerEditText',
  components: {
    AppBannerEditTextColor: BannerEditTextColor,
  },
  data() {
    return {
      editTextModules: [],
      fontFamilies: ['sans-serif', 'serif', 'monospace', 'cursive'],
      fontSizes: [...Array(250).keys()].map((x) => ++x),
      fontWeight: [
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
      ],
    };
  },

  // watch to change text modules
  watch: {
    editTextModules: {
      handler() {
        this.submitTextSettingsToStore(this.editTextModules);
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters('text', ['getTextRGBAString']),
  },
  methods: {
    ...mapActions('text', ['submitTextSettingsToStore']),

    // add new text block to 'editTextModules' array
    addTextBlock() {
      let textBlock = new TextBlock({
        position: {
          x: 0,
          y: 0,
        },
        settings: {
          text: `Your text ${this.editTextModules.length + 1}`,
          fontFamily: 'sans-serif',
          size: 30,
          weight: '400',
        },
        color: {
          selectedColorRGBA: {
            r: 1,
            g: 195,
            b: 195,
            a: 1,
          },
        },
      });
      this.editTextModules.push(textBlock);
    },

    // delete text block (to index)
    deleteTextBlock(indexTextModule) {
      this.editTextModules.splice(indexTextModule, 1);
    },

    // correct text module position after change font size
    correctPositionTextModule(textModule) {
      if (textModule.position.x < 0 || textModule.position.y < 0) {
        textModule.position.x = 0;
        textModule.position.y = 0;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// for correct tab animation
.banner-edit-text__container {
  min-height: 700px;
}

.banner-edit-text__module {
  border: 1px solid #ccc;
  border-radius: 7px;
}

.banner-text-edit__close-button {
  top: -5px;
  right: -6px;

  width: 22px;
  height: 22px;
}
</style>
