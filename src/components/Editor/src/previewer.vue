<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="p-5 prose prose-slate" v-html="result"></div>
</template>
<script lang="ts" setup>
import MarkdownIt from "markdown-it";
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor";
import hljs from "highlight.js";
import { onMounted, ref, watch } from "vue";
// // 引入默认样式
import "highlight.js/scss/default.scss";
// // 引入个性化的vs2015样式
// import 'highlight.js/styles/vs2015.css'
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

function render() {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      // 此处判断是否有添加代码语言
      if (lang && hljs.getLanguage(lang)) {
        try {
          // 得到经过highlight.js之后的html代码
          const preCode = hljs.highlight(lang, str, true).value;
          // 以换行进行分割
          const lines = preCode.split(/\n/).slice(0, -1);
          // 添加自定义行号
          let html = lines
            .map((item, index) => {
              return (
                '<li><span class="line-num" data-line="' +
                (index + 1) +
                '"></span>' +
                item +
                "</li>"
              );
            })
            .join("");
          html = "<ol>" + html + "</ol>";
          // 添加代码语言
          if (lines.length) {
            html += '<span class="name">' + lang + "</span>";
          }
          return '<pre ><code class="hljs">' + html + "</code></pre>";
        } catch (__) {}
      }
      // 未添加代码语言，此处与上面同理
      const preCode = md.utils.escapeHtml(str);
      const lines = preCode.split(/\n/).slice(0, -1);
      let html = lines
        .map((item, index) => {
          return (
            '<li><span class="line-num" data-line="' +
            (index + 1) +
            '"></span>' +
            item +
            "</li>"
          );
        })
        .join("");
      html = "<ol>" + html + "</ol>";
      return '<pre><code class="hljs">' + html + "</code></pre>";
    },
  }).use(markdownItTocAndAnchor, {});
  result.value = md
    .set({
      tocCallback: function (tocMarkdown, tocArray, tocHtml) {
        emits("update:toc", tocHtml);
      },
    })
    .render(props.value);
}
</script>
