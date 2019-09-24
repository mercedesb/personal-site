import LandingPage from "@/components/pages/LandingPage.vue";
import { TestUtility } from "./TestUtility";

describe("LandingPage", () => {
  let component;

  const initialProps = {
    landingPage: {
      ...TestUtility.landingPages["about"]
    },
    ctaLinks: []
  };

  const shallow = propsData =>
    TestUtility.shallow(LandingPage, {
      propsData: {
        ...initialProps,
        ...propsData
      }
    });

  describe("Snapshots", () => {
    describe("without an iconSvg", () => {
      it("matches snapshot", () => {
        component = shallow({ iconSvg: "" });
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("with an iconSvg", () => {
      it("matches snapshot", () => {
        component = shallow({ iconSvg: "<svg></svg>" });
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("without ctaLinks", () => {
      it("matches snapshot", () => {
        component = shallow();
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("with ctaLinks", () => {
      it("matches snapshot", () => {
        const ctaLinks = [
          {
            title: "title",
            iconSvg: "<svg></svg>",
            url: "/url"
          },
          {
            title: "title",
            iconSvg: "<svg></svg>",
            url: "/url",
            color: "yellow"
          }
        ];
        component = shallow({ ctaLinks });
        expect(component.element).toMatchSnapshot();
      });
    });
  });
});
