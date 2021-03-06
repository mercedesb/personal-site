import TalkListContainer from "@/components/TalkListContainer.vue";
import { TestUtility } from "./TestUtility";

describe("TalkListContainer", () => {
  let component;

  const store = {
    state: {
      talks: TestUtility.talks
    }
  };

  const shallow = propsData =>
    TestUtility.shallow(TalkListContainer, {
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
    describe("talks", () => {
      beforeEach(() => {
        component = shallow();
      });

      it("has talks populated", () => {
        expect(component.vm.talks).toBeDefined();
      });

      it("sorts the talks in desc order by the most recent talk given", () => {
        expect(component.vm.talks.map(t => t.id)).toEqual([
          TestUtility.talks[1].id,
          TestUtility.talks[0].id,
          TestUtility.talks[2].id
        ]);
      });
    });
  });
});
