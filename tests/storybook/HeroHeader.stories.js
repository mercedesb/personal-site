import HeroHeader from "../../src/components/HeroHeader.vue";

export default {
  title: "HeroHeader",
  component: HeroHeader
};

export const defaultPresentation = () => {
  return {
    components: { HeroHeader },
    data() {
      return {
        header: {
          title: "Mercedes Bernard",
          preamble: "Software engineer by day, crafter by night",
          color: "brown",
          mainImage:
            "//images.ctfassets.net/kueynwv98jit/7ctwC6rAAgake2ae26aAGc/1ee8d390f234528d1a4d514f713872b4/MercedesBernard-circle.png",
          backgroundImages: [
            "//images.ctfassets.net/kueynwv98jit/2aJslvjshmQ882y2a20eIg/00d80ffb4cb8fb9c3d2a7c8039825c5c/MacbookPro.svg",
            "//images.ctfassets.net/kueynwv98jit/1qfed9Gk2wooCmeSUao6wQ/2d9a3d0ccdb98bef91ea82fa18e26c5f/CrochetHook.svg",
            "//images.ctfassets.net/kueynwv98jit/5013Qk0uHYYemW0UeSWSMA/3af0ba2537bf675d3b32c9511cf489a9/SpinningWheel.svg"
          ]
        }
      };
    },
    // need FlexContainer--column or the header styling doesn't work
    template: `
    <div class="FlexContainer FlexContainer--column">
      <HeroHeader v-bind="header" :key="header.title" />
    </div>
    `
  };
};
