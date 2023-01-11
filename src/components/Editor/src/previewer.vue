<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="p-5 prose prose-slate" v-html="result"></div>
</template>
<script lang="ts" setup>
import MarkdownIt from "markdown-it";
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor";
import hljs from "highlight.js";
import { onMounted, ref, watch } from "vue";
// 引入个性化的vs2015样式
import "highlight.js/styles/vs2015.css";
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["update:toc"]);
const result = ref("");

onMounted(() => {
  render();
});
watch(
  () => props.value,
  () => {
    render();
  }
);
function parseCode(code, lang) {
  // 以换行进行分割
  const lines = code.split(/\n/).slice(0, -1);
  const tpl = (item, index) =>
    '<li><span class="line-num" data-line="' +
    (index + 1) +
    '"></span>' +
    item +
    "</li>";
  // 添加自定义行号
  let html = lines.map(tpl).join("");
  html = "<ol>" + html + "</ol>";
  // 添加代码语言
  if (lang && lines.length) {
    html += '<span class="name">' + lang + "</span>";
  }
  return '<pre ><code class="hljs">' + html + "</code></pre>";
}

const baseConf = {
  html: true,
  linkify: true,
  typographer: true,
};
const highlightConf = (md) => {
  return {
    highlight: function (str, lang) {
      // 此处判断是否有添加代码语言
      if (lang && hljs.getLanguage(lang)) {
        // 得到经过highlight.js之后的html代码
        const preCode = hljs.highlight(lang, str, true).value;
        return parseCode(preCode, lang);
      }
      // 未添加代码语言，此处与上面同理
      const preCode = md.utils.escapeHtml(str);
      return parseCode(preCode, null);
    },
  };
};
const extraConf: any = {
  tocCallback: function (tocMarkdown, tocArray, tocHtml) {
    emits("update:toc", tocHtml);
  },
};

function render() {
  const md = new MarkdownIt(baseConf);
  md.set(highlightConf(md));
  md.use(markdownItTocAndAnchor, {});
  md.set(extraConf);
  result.value = md.render(props.value);
}
</script>
<style lang="scss" scoped>
::v-deep pre code.hljs ol {
  padding-left: 1.625rem;
}
::v-deep pre code.hljs ol li {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
