import BlogList from "@/components/BlogList.vue";
import { TestUtility } from "./TestUtility";

describe("BlogList", () => {
  let component;

  const initialProps = {
    color: "gray"
  };

  const shallow = propsData =>
    TestUtility.shallow(BlogList, {
      propsData: {
        ...initialProps,
        ...propsData
      }
    });

  describe("Snapshots", () => {
    describe("with a color passed in", () => {
      it("matches snapshot", () => {
        component = shallow({
          posts: TestUtility.blogPosts,
          isFirstPage: true
        });
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("without a color passed in", () => {
      it("matches snapshot", () => {
        component = shallow({
          color: undefined,
          posts: TestUtility.blogPosts,
          isFirstPage: true
        });
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("without posts", () => {
      it("matches snapshot", () => {
        component = shallow({
          posts: [],
          isFirstPage: true
        });
        expect(component.element).toMatchSnapshot();
      });
    });
  });

  describe("Computed", () => {
    describe("featuredPost", () => {
      it("has featuredPost populated", () => {
        component = shallow({
          posts: TestUtility.blogPosts,
          isFirstPage: true
        });
        expect(component.vm.featuredPost).toBeDefined();
      });

      it("returns the first post of the first page as featured", () => {
        component = shallow({
          posts: TestUtility.blogPosts,
          isFirstPage: true
        });
        const expected = {
          featured: true,
          ...component.vm.posts[0]
        };
        expect(component.vm.featuredPost).toEqual(expected);
      });

      it("returns the first post of not the first page as not featured", () => {
        component = shallow({
          posts: TestUtility.blogPosts,
          isFirstPage: false
        });
        const expected = {
          featured: false,
          ...component.vm.posts[0]
        };
        expect(component.vm.featuredPost).toEqual(expected);
      });
    });

    describe("remainingPosts", () => {
      beforeEach(() => {
        component = shallow({
          posts: TestUtility.blogPosts,
          isFirstPage: true
        });
      });

      it("has remainingPosts populated", () => {
        expect(component.vm.remainingPosts).toBeDefined();
      });

      it("returns the second through end post", () => {
        const expected = component.vm.posts.slice(1);
        expect(component.vm.remainingPosts).toEqual(expected);
      });
    });
  });
});
