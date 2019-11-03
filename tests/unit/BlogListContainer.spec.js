import BlogListContainer from "@/components/BlogListContainer.vue";
import { TestUtility } from "./TestUtility";

describe("BlogListContainer", () => {
  let component;

  const initialProps = {
    color: "gray"
  };

  const store = {
    state: {
      blogPosts: TestUtility.blogPosts,
      blogCategories: ["Test", "Categories", "for", "Specs"]
    }
  };

  const shallow = (propsData, localConfig) =>
    TestUtility.shallow(BlogListContainer, {
      store,
      propsData: {
        ...initialProps,
        ...propsData
      },
      ...localConfig
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

    describe("allCategories", () => {
      beforeEach(() => {
        component = shallow();
      });

      it("has allCategories populated", () => {
        expect(component.vm.allCategories).toBeDefined();
      });

      it("creates a name prop on the posts", () => {
        expect(component.vm.allCategories[0].name).toBeDefined();
      });

      it("sorts the categories, case insensitive", () => {
        expect(component.vm.allCategories[0].name).toEqual("Categories");
        expect(component.vm.allCategories[1].name).toEqual("for");
        expect(component.vm.allCategories[2].name).toEqual("Specs");
        expect(component.vm.allCategories[3].name).toEqual("Test");
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

    describe("sortCategoryNames", () => {
      it("sorts category object alphabetically by name, case insensitive", () => {
        let categories = [
          { name: "test" },
          { name: "The" },
          { name: "alpha" },
          { name: "Sorting" },
          { name: "By" },
          { name: "Name" }
        ];
        let expected = [
          { name: "alpha" },
          { name: "By" },
          { name: "Name" },
          { name: "Sorting" },
          { name: "test" },
          { name: "The" }
        ];
        component = shallow();
        expect(categories.sort(component.vm.sortCategoryNames)).toEqual(
          expected
        );
      });
    });
  });
});
