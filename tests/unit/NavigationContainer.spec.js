import NavigationContainer from "@/components/NavigationContainer.vue";
import { TestUtility } from "./TestUtility";

describe("NavigationContainer", () => {
  let component;

  const homePageNavLink = {
    icon: {
      fields: {
        svg: "<svg></svg>"
      }
    }
  };

  const landingPageNavLinks = Object.keys(TestUtility.landingPages).map(key => {
    return TestUtility.landingPages[key];
  });

  const state = {
    navLinks: [homePageNavLink, ...landingPageNavLinks]
  };

  const actions = {
    getNavLinks: jest.fn()
  };

  const store = {
    state,
    actions
  };

  const shallow = propsData =>
    TestUtility.shallow(NavigationContainer, {
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
    describe("navLinks", () => {
      beforeEach(() => {
        component = shallow();
      });

      it("has navLinks populated", () => {
        expect(component.vm.navLinks).toBeDefined();
      });

      it("creates a parsedLink prop on the navLinks", () => {
        expect(component.vm.navLinks[0].parsedLink).toBeDefined();
      });

      it("uses the external link for parsedLink if its defined", () => {
        const shopPage = TestUtility.landingPages["shop"];
        const shopLink = component.vm.navLinks.find(link => {
          return link.title === shopPage.title;
        });
        expect(shopLink.parsedLink).toEqual(shopPage.externalLink);
      });

      it("uses the url segment for parsedLink if eternalLink is not defined", () => {
        const blogPage = TestUtility.landingPages["blog"];
        const blogLink = component.vm.navLinks.find(link => {
          return link.title === blogPage.title;
        });
        expect(blogLink.parsedLink).toEqual(`/${blogPage.urlSegment}`);
      });
    });
  });
});
