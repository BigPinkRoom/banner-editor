<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="text-uppercase green--text mb-0">Banner text settings</p>
        <v-divider color="green"></v-divider>
      </v-col>
    </v-row>

    <v-expansion-panels>
      <v-container>
        <v-row>
          <v-expansion-panel
            class="banner-edit-text__module d-flex flex-column mx-0 my-1"
            v-for="(EditTextModule, index) in editTextModules"
            :key="index"
          >
            <v-expansion-panel-header class="pb-3">
              <v-col class="pa-0">
                <v-textarea
                  v-model="EditTextModule.settings.text"
                  color="green"
                  dense
                  label="Your text"
                  outlined
                  rows="1"
                  maxlength="1000"
                ></v-textarea>
              </v-col>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="banner-edit-text__settings ma-0">
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
              <v-row class="banner-edit-text__settings ma-0">
                <v-col class="col-6 py-0 pl-0 pr-1">
                  <v-select
                    v-model="EditTextModule.settings.size"
                    :items="fontSizes"
                    dense
                    label="Size"
                    outlined
                  ></v-select>
                </v-col>
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
    <v-row>
      <v-col>
        <v-btn block color="green" class="white--text" @click="addTextBlock">
          + Add text</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BannerEditTextColor from './BannerEditTextColor';
import { TextBlock } from '../../../js/entities/textBlock';

export default {
  components: {
    AppBannerEditTextColor: BannerEditTextColor,
  },
  data() {
    return {
      name: 'BannerEditText',
      editTextModules: [],
      fontFamilies: ['sans-serif', 'serif', 'monospace', 'cursive'],
      fontSizes: [...Array(150).keys()].map((x) => ++x),
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

    addTextBlock() {
      let textBlock = new TextBlock({
        tag: {
          x: 0,
          y: 0,
        },
        settings: {
          text: 'Test text',
          fontFamily: 'sans-serif',
          size: 14,
          weight: '400',
        },
        color: {
          selectedColorRGBA: {
            r: 0,
            g: 0,
            b: 0,
            a: 1,
          },
        },
      });
      this.editTextModules.push(textBlock);
    },
  },
};
</script>
<style lang="scss" scoped>
.banner-edit-text__module {
  border: 1px solid #ccc;
  border-radius: 7px;
}

.banner-edit-text__module .v-expansion-panel-header .v-text-field__details {
  display: none;
}

.v-label {
  font-size: 14px;
}
</style>
