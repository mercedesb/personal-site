import LandingPageContainer from "@/components/pages/LandingPageContainer.vue";
import { TestUtility } from "./TestUtility";

describe("LandingPageContainer", () => {
  let component;

  const initialProps = {
    urlSegment: "about"
  };

  const store = {
    state: {
      landingPage: {
        ...TestUtility.landingPages[initialProps.urlSegment]
      },
      navLinks: []
    },
    actions: {
      getLandingPage: jest.fn()
    }
  };

  const shallow = propsData =>
    TestUtility.shallow(LandingPageContainer, {
      store,
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

  describe("Computed", () => {
    describe("page", () => {
      beforeEach(() => {
        component = shallow();
      });

      it("has page populated", () => {
        expect(component.vm.page).toBeDefined();
      });
    });

    describe("iconSvg", () => {
      beforeEach(() => {
        component = shallow();
      });

      it("has iconSvg populated", () => {
        expect(component.vm.iconSvg).toBeDefined();
      });
    });

    describe("ctaLinks", () => {
      describe("with ctaLinks in cms", () => {
        it("has ctaLinks populated", () => {
          component = shallow();
          expect(component.vm.ctaLinks).toBeDefined();
        });

        it("creates objects of the desired shape", () => {
          component = shallow();
          const expectedShape = {
            id: expect.any(String),
            color: expect.any(String),
            title: expect.any(String),
            iconSvg: expect.any(String),
            url: expect.any(String),
            external: expect.any(Boolean)
          };

          expect(component.vm.ctaLinks[0]).toMatchObject(expectedShape);
        });
      });

      describe("without ctaLinks in cms", () => {
        it("has ctaLinks populated", () => {
          const localPage = {
            ...store.state.landingPage,
            ctaLinks: undefined
          };
          const localStore = {
            state: {
              landingPage: localPage
            },
            actions: store.actions
          };
          component = TestUtility.shallow(LandingPageContainer, {
            store: localStore,
            propsData: {
              ...initialProps
            }
          });

          expect(component.vm.ctaLinks).toBeDefined();
        });
      });
    });
  });

  describe("Lifecycle", () => {
    describe("created", () => {
      it("dispatches the correct actions to the store", () => {
        component = shallow();

        expect(component.vm.$store.dispatch).toHaveBeenCalledWith(
          "getLandingPage",
          initialProps.urlSegment
        );
        // TODO: test getNavLinks and getBlogPosts
        // expect(component.vm.$store.dispatch).toHaveBeenNthCalledWith(2, 'getNavLinks')
      });
    });
  });
});
