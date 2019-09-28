import ReadingTime from "../../src/components/ReadingTime.vue";

export default {
  title: "ReadingTime",
  component: ReadingTime
};

export const defaultPresentation = () => {
  return {
    components: { ReadingTime },
    data() {
      return {
        text: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Donec non eros accumsan, facilisis mi a, lobortis nisi. 
        Cras aliquet tincidunt erat, non ornare leo tempus et. 
        Vestibulum bibendum venenatis lorem eu ullamcorper. 
        Aliquam sodales massa id sodales venenatis. 
        Duis mattis erat consectetur mauris ultricies vehicula. 
        Aliquam egestas aliquam arcu quis varius. 
        In tellus libero, ultrices gravida tristique ut, porta a urna. 
        Nulla nec lectus ut erat ultricies dignissim vitae nec sem. 
        Interdum et malesuada fames ac ante ipsum primis in faucibus. 
        Aliquam convallis purus quis velit cursus elementum. 
        Nam pretium quam sit amet ultricies laoreet.
        `
      };
    },
    template: `
      <ReadingTime :text="text">
      `
  };
};
