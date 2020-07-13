<template>
  <div class="Markdown" v-html="html"></div>
</template>

<script>
import markdownItAnchor from "markdown-it-anchor";

var md = require("markdown-it")();

md.use(require("markdown-it-attrs"));
md.use(markdownItAnchor);

export default {
  props: {
    source: {
      type: String,
      required: true,
    },
    collapsible: {
      type: Boolean,
      default: false,
    },
    collapsibleTag: String,
    collapsedByDefault: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      parentSelector: "Collapsible",
      childSelector: "CollapsibleChild",
      modifierCollapsed: "--collapsed",
      modifierExpanded: "--expanded",
    };
  },
  computed: {
    querySelector: function() {
      return `.Markdown ${this.collapsibleTag}`;
    },
    html: function() {
      if (this.source) {
        const html = md.render(this.source);
        return html;
      }
      return "";
    },
  },
  mounted() {
    if (this.collapsible) {
      const collapsible = this.$el.querySelectorAll(this.querySelector);

      collapsible.forEach((c) => {
        c.addEventListener("click", this.handleCollapsible);

        if (this.collapsedByDefault) {
          this.handleCollapsible({ target: c }, this.modifierCollapsed);
        } else {
          this.handleCollapsible({ target: c }, this.modifierExpanded);
        }
      });
    }
  },
  methods: {
    handleCollapsible(event, modifier) {
      let el = event.target;

      this.toggleClass(el, this.parentSelector, modifier);

      let sibling = el.nextElementSibling;
      while (sibling) {
        if (sibling.matches(this.querySelector)) {
          break;
        }
        this.toggleClass(sibling, this.childSelector, modifier);
        sibling = sibling.nextElementSibling;
      }
    },
    toggleClass(el, selector, modifier) {
      if (!!selector && !!modifier) {
        el.className = `${el.className} ${selector} ${selector}${modifier}`;
      } else if (el.className.indexOf(this.modifierCollapsed) !== -1) {
        el.className = el.className.replace(
          this.modifierCollapsed,
          this.modifierExpanded
        );
      } else if (el.className.indexOf(this.modifierExpanded) !== -1) {
        el.className = el.className.replace(
          this.modifierExpanded,
          this.modifierCollapsed
        );
      }
    },
  },
};
</script>
<style lang="scss">
@import "../assets/styles/variables.scss";

$icon-dimension: 24px;

.Collapsible {
  cursor: pointer;

  &:before {
    content: "";
    display: inline-block;
    width: $icon-dimension;
    height: $icon-dimension;
    background-size: $icon-dimension $icon-dimension;
    margin-right: $base-spacing;
  }

  &--collapsed {
    &:before {
      background-image: url(../assets/ExpandIcon.svg);
    }
  }

  &--expanded {
    &:before {
      background-image: url(../assets/CollapseIcon.svg);
    }
  }

  &Child--collapsed {
    display: none;
  }

  &Child--expanded {
    display: block;
  }
}
</style>
