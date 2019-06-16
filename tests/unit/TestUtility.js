import Vuex from "vuex";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import SmartLink from "../../src/components/SmartLink.vue";

export const TestUtility = (function() {
  const defaultConfiguration = {
    stubs: ["router-link", "router-view"],
    mocks: {
      $route: {
        params: {
          urlSegment: "somePath"
        },
        path: "/somePath"
      }
    }
  };

  function configure() {
    const localVue = createLocalVue();
    localVue.component("smart-link", SmartLink);
    localVue.use(Vuex);
    return localVue;
  }

  function getOptions(config = {}) {
    const { store, ...localConfig } = config;
    let localStore;

    const localVue = configure();

    if (store) {
      localStore = new Vuex.Store(store);
      localStore.dispatch = jest.fn(() => Promise.resolve({ not: "empty" }));
    }

    return {
      localVue,
      store: localStore,
      ...defaultConfiguration,
      ...localConfig
    };
  }

  return {
    shallow: function(Component, config = {}) {
      return shallowMount(Component, {
        ...getOptions(config)
      });
    },
    mount: function(Component, config = {}) {
      return mount(Component, {
        ...getOptions(config)
      });
    },
    mockRoute: defaultConfiguration.mocks.$route.params.urlSegment,
    landingPages: {
      about: {
        title: "About",
        preamble: "",
        iconSvg: {
          fields: {
            svg: "<svg></svg>"
          }
        },
        mainContent: "",
        ctaLinks: [
          {
            sys: {
              id: "cta 1"
            },
            fields: {
              title: "Resume",
              iconSvg: {
                fields: {
                  svg: "<svg></svg>"
                }
              },
              internalLink: {
                fields: {
                  urlSegment: "resume"
                }
              },
              externalLink: ""
            }
          },
          {
            sys: {
              id: "cta 2"
            },
            fields: {
              title: "External CTA",
              iconSvg: {
                fields: {
                  svg: "<svg></svg>"
                }
              },
              internalLink: {
                fields: {
                  urlSegment: ""
                }
              },
              externalLink: "http://google.com"
            }
          }
        ],
        urlSegment: "about",
        externalLink: "",
        color: "blue",
        showContact: false,
        showBlogPosts: false
      },
      blog: {
        title: "Blog",
        preamble: "",
        iconSvg: {
          fields: {
            svg: "<svg></svg>"
          }
        },
        mainContent: "",
        ctaLinks: [],
        urlSegment: "blog",
        externalLink: "",
        color: "gray",
        showContact: false,
        showBlogPosts: true
      },
      connect: {
        title: "Connect",
        preamble: "",
        iconSvg: {
          fields: {
            svg: "<svg></svg>"
          }
        },
        mainContent: "",
        ctaLinks: [],
        urlSegment: "connect",
        externalLink: "",
        color: "red",
        showContact: true,
        showBlogPosts: false
      },
      shop: {
        title: "Shop",
        preamble: "",
        iconSvg: {
          fields: {
            svg: "<svg></svg>"
          }
        },
        mainContent: "",
        ctaLinks: [],
        urlSegment: "",
        externalLink: "https://etsy.com/shop/blinddogyarns",
        color: "yellow",
        showContact: false,
        showBlogPosts: false
      }
    },
    blogPosts: [
      {
        id: "blogPost1",
        title: "blog post 1 title",
        preamble: "blog post 1 preamble",
        mainContent: "",
        urlSegment: "",
        tags: [],
        publishDate: "2018-04-25T00:00-05:00"
      },
      {
        id: "blogPost2",
        title: "blog post 2 title",
        preamble: "blog post 2 preamble",
        mainContent: "",
        urlSegment: "",
        tags: [],
        publishDate: "2018-04-23T00:00-05:00"
      },
      {
        id: "blogPost3",
        title: "blog post 3 title",
        preamble: "blog post 3 preamble",
        mainContent: "",
        urlSegment: "",
        tags: [],
        publishDate: "2018-04-22T00:00-05:00"
      }
    ],
    talks: [
      {
        id: "talk1",
        title: "talk 1 title",
        preamble: "talk 1 preamble",
        mainContent: "talk main content",
        urlSegment: "talk1",
        color: "gray",
        iconSvg: {
          fields: {
            svg: "<svg></svg>"
          }
        },
        iconCssClass: "Draw--300",
        givenAt: [
          {
            sys: {
              id: "id"
            },
            fields: {
              title: "talk 1 given at",
              slidesLink: "http://google.com",
              date: "2018-03-25T00:00-05:00"
            }
          }
        ]
      },
      {
        id: "talk2",
        title: "talk 2 title",
        preamble: "talk 2 preamble",
        mainContent: "talk main content",
        urlSegment: "talk2",
        color: "gray",
        iconSvg: {
          fields: {
            svg: "<svg></svg>"
          }
        },
        iconCssClass: "Draw--300",
        givenAt: [
          {
            sys: {
              id: "id"
            },
            fields: {
              title: "talk 2 given at",
              slidesLink: "http://google.com",
              date: "2018-04-25T00:00-05:00"
            }
          }
        ]
      },
      {
        id: "talk3",
        title: "talk 3 title",
        preamble: "talk 3 preamble",
        mainContent: "talk main content",
        color: "gray",
        iconSvg: {
          fields: {
            svg: "<svg></svg>"
          }
        },
        iconCssClass: "Draw--300",
        givenAt: [
          {
            sys: {
              id: "id"
            },
            fields: {
              title: "talk 3 given at",
              slidesLink: "http://google.com",
              date: "2018-02-25T00:00-05:00"
            }
          }
        ]
      }
    ]
  };
})();
