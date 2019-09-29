import BlogListItem from "@/components/BlogListItem.vue";
import { TestUtility } from "./TestUtility";

describe("BlogListItem", () => {
  let component;

  const initialProps = {
    color: "gray",
    featured: false,
    title: "blog title",
    preamble: "blog preamble",
    date: new Date("2018-04-25T00:00-05:00"),
    urlSegment: "blog-post"
  };

  const shallow = propsData =>
    TestUtility.shallow(BlogListItem, {
      propsData: {
        ...initialProps,
        ...propsData
      }
    });

  describe("Snapshots", () => {
    describe("with data", () => {
      it("matches snapshot", () => {
        component = shallow();
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("when loading", () => {
      it("matches snapshot", () => {
        component = shallow({ loading: true });
        expect(component.element).toMatchSnapshot();
      });
    });
  });

  describe("Computed", () => {
    describe("classes", () => {
      describe("as featured post", () => {
        it("returns with featured class", () => {
          component = shallow({ featured: true });
          expect(component.vm.classes).toEqual("BlogItem BlogItem--featured");
        });
      });

      describe("with color passed in", () => {
        it("returns with color class", () => {
          component = shallow();
          expect(component.vm.classes).toEqual("BlogItem BlogItem--gray");
        });
      });
    });
  });
});
