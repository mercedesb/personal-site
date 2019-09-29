import MobileNavigation from "@/components/MobileNavigation.vue";
import { TestUtility } from "./TestUtility";

describe("MobileNavigation", () => {
  let component;

  const initialProps = {
    navLinks: Object.keys(TestUtility.landingPages).map(key => {
      return TestUtility.landingPages[key];
    })
  };

  const shallow = propsData =>
    TestUtility.shallow(MobileNavigation, {
      propsData: {
        ...initialProps,
        ...propsData
      }
    });

  describe("Snapshots", () => {
    describe("without color passed in", () => {
      it("matches snapshot", () => {
        component = shallow();
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("with color passed in", () => {
      it("matches snapshot", () => {
        component = shallow({ color: "purple" });
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("when expanded", () => {
      it("matches snapshot", () => {
        component = shallow();
        component.vm.expanded = true;
        expect(component.element).toMatchSnapshot();
      });
    });
  });
});
