import BlogPostPage from "@/components/pages/BlogPostPage.vue";
import { TestUtility } from "./TestUtility";

describe("BlogPostPage", () => {
  let component;

  const initialProps = {
    color: "blue"
  };

  const shallow = propsData =>
    TestUtility.shallow(BlogPostPage, {
      propsData: {
        ...initialProps,
        ...propsData
      }
    });

  describe("Snapshots", () => {
    describe("with a color passed in", () => {
      it("matches snapshot", () => {
        component = shallow({
          page: TestUtility.blogPosts[0],
          formattedPublishDate: "Feb 17, 2018",
          socialImage: "imageurl"
        });
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("without a color passed in", () => {
      it("matches snapshot", () => {
        component = shallow({
          color: undefined,
          page: TestUtility.blogPosts[0],
          formattedPublishDate: "Feb 17, 2018",
          socialImage: "imageurl"
        });
        expect(component.element).toMatchSnapshot();
      });
    });
  });
});
