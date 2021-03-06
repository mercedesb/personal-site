import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  errors: [],
  blogPosts: [],
  blogCategories: [],
  maxBlogPostPages: 0,
  blogPost: {},
  talks: [],
  talk: {},
  landingPage: {},
  homePage: {},
  navLinks: [],
  backgroundImages: [],
  entries: [],
  total: 0
};

export const mutations = {
  blogPosts(state, blogPosts) {
    state.blogPosts = blogPosts;
  },
  blogCategories(state, blogCategories) {
    state.blogCategories = blogCategories;
  },
  maxBlogPostPages(state, maxBlogPostPages) {
    state.maxBlogPostPages = maxBlogPostPages;
  },
  blogPost(state, blogPost) {
    state.blogPost = blogPost;
  },
  talks(state, talks) {
    state.talks = talks;
  },
  talk(state, talk) {
    state.talk = talk;
  },
  landingPage(state, landingPage) {
    state.landingPage = landingPage;
  },
  homePage(state, homePage) {
    state.homePage = homePage;
  },
  navLinks(state, navLinks) {
    state.navLinks = navLinks;
  },
  backgroundImages(state, backgroundImages) {
    state.backgroundImages = backgroundImages;
  },
  entries(state, entries) {
    state.entries = entries;
  },
  total(state, total) {
    state.total = total;
  },
  clearBlogPosts(state) {
    state.blogPosts = [];
  },
  clearBlogCategories(state) {
    state.blogCategories = [];
  },
  clearMaxBlogPostPages(state) {
    state.maxBlogPostPages = 0;
  },
  clearBlogPost(state) {
    state.blogPost = {};
  },
  clearTalks(state) {
    state.talks = [];
  },
  clearTalk(state) {
    state.talk = {};
  },
  clearLandingPage(state) {
    state.landingPage = {};
  },
  clearHomePage(state) {
    state.homePage = {};
  },
  clearNavLinks(state) {
    state.navLinks = [];
  },
  clearBackgroundImages(state) {
    state.backgroundImages = [];
  },
  clearEntries(state) {
    state.entries = [];
  },
  clearTotal(state) {
    state.total = 0;
  }
};

export const actions = {
  getBlogPosts(context, pageParams) {
    const zeroIndexPageNum = pageParams.page - 1;
    context.commit("clearBlogPosts");

    let baseBlogPostQuery = {
      content_type: "blogPost",
      order: `-fields.publishDate`,
      skip: zeroIndexPageNum * pageParams.pageSize,
      "fields.publishDate[lte]": new Date()
    };

    let tagsQuery = {};
    if (pageParams.filter) {
      tagsQuery = {
        "fields.tags": pageParams.filter
      };
    } else {
      tagsQuery = {
        limit: pageParams.pageSize
      };
    }

    return context
      .dispatch("getEntries", {
        ...baseBlogPostQuery,
        ...tagsQuery
      })
      .then(entries => {
        context.commit("blogPosts", entries);
        context.commit(
          "maxBlogPostPages",
          Math.ceil(state.total / pageParams.pageSize)
        );
        return entries;
      });
  },
  getBlogCategories(context) {
    context.commit("clearBlogCategories");
    return context
      .dispatch("getEntries", {
        content_type: "blogPost",
        "fields.publishDate[lte]": new Date(),
        select: "fields.tags"
      })
      .then(entries => {
        const categories = entries.reduce((categories, entry) => {
          if (entry.tags && entry.tags.length > 0) {
            categories = categories.concat(entry.tags);
          }
          return categories;
        }, []);
        context.commit("blogCategories", [...new Set(categories)]);
        return categories;
      });
  },
  getBlogPost(context, urlSegment) {
    context.commit("clearBlogPost");
    const { blogPosts } = context.state;
    if (blogPosts.length) {
      const matching = blogPosts.filter(
        blogPost => blogPost.urlSegment === urlSegment
      );
      if (matching && matching.length) {
        context.commit("blogPost", matching[0]);
        return new Promise(resolve => {
          resolve(matching[0]);
        });
      }
    } else {
      return context
        .dispatch("getEntries", {
          content_type: "blogPost",
          "fields.urlSegment": urlSegment
        })
        .then(entries => {
          const blogPost = entries.length ? entries[0] : {};
          context.commit("blogPost", blogPost);
          return blogPost;
        });
    }
  },
  // eslint-disable-next-line no-unused-vars
  getTalks(context, _pageParams) {
    context.commit("clearTalks");
    return context
      .dispatch("getEntries", {
        content_type: "talkPage"
      })
      .then(entries => {
        context.commit("talks", entries);
        return entries;
      });
  },
  getTalk(context, urlSegment) {
    context.commit("clearTalk");
    const { talks } = context.state;
    if (talks.length) {
      const matching = talks.filter(talk => talk.urlSegment === urlSegment);
      if (matching && matching.length) {
        context.commit("talk", matching[0]);
        return new Promise(resolve => {
          resolve(matching[0]);
        });
      }
    } else {
      return context
        .dispatch("getEntries", {
          content_type: "talkPage",
          "fields.urlSegment": urlSegment,
          include: 2
        })
        .then(entries => {
          const talk = entries.length ? entries[0] : {};
          context.commit("talk", talk);
          return talk;
        });
    }
  },
  getLandingPage(context, urlSegment) {
    context.commit("clearLandingPage");
    return context
      .dispatch("getEntries", {
        "fields.urlSegment": urlSegment,
        content_type: "landingPage",
        include: 2
      })
      .then(entries => {
        const landingPage = entries.length ? entries[0] : {};
        context.commit("landingPage", landingPage);
        return landingPage;
      });
  },
  getHomePage(context) {
    context.commit("clearHomePage");

    return context
      .dispatch("getEntries", { content_type: "home", include: 2 })
      .then(entries => {
        const homePage = entries.length ? entries[0] : {};
        context.commit("homePage", homePage);
        return homePage;
      });
  },
  getNavLinks(context) {
    context.commit("clearNavLinks");
    const { homePage } = context.state;
    if (Object.keys(homePage).length > 0) {
      const children = homePage.children.map(item => {
        return {
          id: item.sys.id,
          ...item.fields
        };
      });
      const navLinks = [{ id: homePage.id, ...homePage }, ...children];
      context.commit("navLinks", navLinks);
      return new Promise(resolve => {
        resolve(navLinks);
      });
    } else {
      return context.dispatch("getHomePage").then(homePage => {
        // TODO: refactor this so we only do it once...
        const children = homePage.children.map(item => {
          return {
            id: item.sys.id,
            ...item.fields
          };
        });
        const navLinks = [{ id: homePage.id, ...homePage }, ...children];
        context.commit("navLinks", navLinks);
        return navLinks;
      });
    }
  },
  getBackgroundImages(context) {
    context.commit("clearBackgroundImages");

    let bgdImgPromise;
    if (Object.keys(context.state.homePage).length > 0) {
      bgdImgPromise = new Promise(resolve => {
        resolve(context.state.homePage);
      });
    } else {
      bgdImgPromise = context.dispatch("getHomePage");
    }

    return bgdImgPromise.then(homePage => {
      const backgroundImages = homePage.backgroundImages.map(item => {
        return {
          id: item.sys.id,
          ...item.fields
        };
      });
      context.commit("backgroundImages", backgroundImages);
      return backgroundImages;
    });
  },
  getEntries(context, query) {
    const client = require("contentful").createClient({
      space: process.env.VUE_APP_SPACE_ID,
      accessToken: process.env.VUE_APP_CDA_TOKEN
    });
    context.commit("clearEntries");

    return client
      .getEntries(query)
      .then(response => response)
      .then(res => {
        const entries = res.items.map(item => {
          return {
            id: item.sys.id,
            ...item.fields
          };
        });
        context.commit("total", res.total);
        context.commit("entries", entries);
        return entries;
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
