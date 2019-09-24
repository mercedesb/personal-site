import BlogListContainer from "@/components/BlogListContainer.vue";
import { TestUtility } from "./TestUtility";

describe("BlogListContainer", () => {
  let component;

  const initialProps = {
    color: "gray"
  };

  const store = {
    state: {
      blogPosts: TestUtility.blogPosts
    }
  };

  const shallow = propsData =>
    TestUtility.shallow(BlogListContainer, {
      store,
      propsData: {
        ...initialProps,
        ...propsData
      }
    });

  describe("Snapshots", () => {
    describe("with a color passed in", () => {
      it("matches snapshot", () => {
        component = shallow();
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("without a color passed in", () => {
      it("matches snapshot", () => {
        component = shallow({ color: undefined });
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("when its the first page", () => {
      it("matches snapshot", () => {
        component = shallow({ page: 1 });
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("when its not the first page", () => {
      it("matches snapshot", () => {
        component = shallow({ page: 2 });
        expect(component.element).toMatchSnapshot();
      });
    });
  });

  describe("Computed", () => {
    describe("posts", () => {
      beforeEach(() => {
        component = shallow();
      });

      it("has posts populated", () => {
        expect(component.vm.posts).toBeDefined();
      });

      it("creates a color prop on the posts", () => {
        expect(component.vm.posts[0].color).toEqual(initialProps.color);
      });

      it("creates a date prop on the posts", () => {
        expect(component.vm.posts[0].date).toBeDefined();
      });
    });
  });

  describe("Methods", () => {
    describe("getPage", () => {
      it("dispatches getBlogPosts to the store", () => {
        component = shallow();
        component.vm.getPage(2);
        expect(component.vm.$store.dispatch).toHaveBeenCalledWith(
          "getBlogPosts",
          { page: 2, pageSize: expect.anything() }
        );
      });
    });
  });
});
