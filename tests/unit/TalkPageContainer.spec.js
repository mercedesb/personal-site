import TalkPageContainer from "@/components/pages/TalkPageContainer.vue";
import { TestUtility } from "./TestUtility";

const mockFormat = jest.fn(() => "Apr 18 2018");

jest.mock("moment", () => () => ({
  format: mockFormat
}));

describe("TalkPageContainer", () => {
  let component;

  const store = {
    state: {
      talk: TestUtility.talks[0],
      navLinks: []
    }
  };

  const shallow = propsData =>
    TestUtility.shallow(TalkPageContainer, {
      store,
      propsData: {
        ...propsData
      }
    });

  describe("Snapshots", () => {
    it("matches snapshot", () => {
      component = shallow();
      expect(component.element).toMatchSnapshot();
    });
  });

  describe("Computed", () => {
    describe("page", () => {
      beforeEach(() => {
        component = shallow();
      });

      it("has page populated", () => {
        expect(component.vm.page).toBeDefined();
      });

      it("formats the given at date", () => {
        expect(typeof component.vm.page.givenAt[0].date).toBe("string");
      });
    });
  });

  describe("Lifecycle", () => {
    describe("created", () => {
      it("dispatches getTalk to the store", () => {
        component = TestUtility.mount(TalkPageContainer, {
          store
        });
        const expectedPath = TestUtility.mockRoute;
        expect(component.vm.$store.dispatch).toHaveBeenCalledWith(
          "getTalk",
          expectedPath
        );
        // TODO: test getNavLinks
      });
    });
  });
});
