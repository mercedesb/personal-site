import TalkList from "@/components/TalkList.vue";
import { TestUtility } from "./TestUtility";

describe("TalkList", () => {
  let component;

  const initialProps = {
    talks: TestUtility.talks
  };

  const shallow = propsData =>
    TestUtility.shallow(TalkList, {
      propsData: {
        ...initialProps,
        ...propsData
      }
    });

  describe("Snapshots", () => {
    describe("with talks", () => {
      it("matches snapshot", () => {
        component = shallow();
        expect(component.element).toMatchSnapshot();
      });
    });

    describe("without talks", () => {
      it("matches snapshot", () => {
        component = shallow({ talks: [] });
        expect(component.element).toMatchSnapshot();
      });
    });
  });
});
