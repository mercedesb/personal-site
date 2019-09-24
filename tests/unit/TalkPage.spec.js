import TalkPage from "@/components/pages/TalkPage.vue";
import { TestUtility } from "./TestUtility";

describe("TalkPage", () => {
  let component;

  const initialProps = {
    page: {
      ...TestUtility.talks[0],
      iconSvg: "<svg></svg>",
      givenAt: "Apr 18 2018"
    },
    ctaLinks: []
  };

  const shallow = propsData =>
    TestUtility.shallow(TalkPage, {
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
