import Navigation from "@/components/Navigation.vue";
import { TestUtility } from "./TestUtility";

describe("Navigation", () => {
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

  const initialProps = {
    navLinks: landingPageNavLinks,
    homeLink: homePageNavLink
  };

  const shallow = propsData =>
    TestUtility.shallow(Navigation, {
      propsData: {
        ...initialProps,
        ...propsData
      }
    });

  describe("Snapshots", () => {
    it("matches snapshot", () => {
      component = shallow();
      expect(component.element).toMatchSnapshot();
    });
  });
});
