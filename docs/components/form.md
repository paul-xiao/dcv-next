<script setup>
import Basic from './demo/form/Basic.vue'
import UseFormDemo from './demo/form/UseFormDemo.vue'
import SlotDemo from './demo/form/SlotDemo.vue'
import UploadDemo from './demo/form/UploadDemo.vue'
import FormValidateDemo from './demo/form/FormValidateDemo.vue'
</script>

# 表单 Form

## 基础示例

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/form/Basic.vue

## useForm Hook

<DemoContainer>
  <UseFormDemo/>
</DemoContainer>

<<< @/components/demo/form/UseFormDemo.vue

## 自定义

自定义表单字段可使用 **model** 获取当前表单数据， **item** 可返回当前表单项配置

```vue
<template #slot="{ model, item }">
  <ElInput v-model="model.slot"></ElInput>
</template>
```

<DemoContainer>
  <SlotDemo/>
</DemoContainer>

<<< @/components/demo/form/SlotDemo.vue

## 表单校验

<DemoContainer>
  <FormValidateDemo/>
</DemoContainer>

<<< @/components/demo/form/FormValidateDemo.vue

## 图片上传

<DemoContainer>
  <UploadDemo/>
</DemoContainer>

<<< @/components/demo/form/UploadDemo.vue

## API

### 表单属性 Form Props

| 属性名称       | 类型   | 描述         |
| -------------- | ------ | ------------ |
| modelValue     | Object | 表单数据     |
| schema         | Array  | 表单项配置   |
| componentProps | Object | 表单组件属性 |

### 表单项属性 FormItem Props

| 属性名称       | 类型   | 描述           |
| -------------- | ------ | -------------- |
| label          | String | 标签           |
| prop           | String | 属性值         |
| rules          | Array  | 表单校验规则   |
| componentProps | Object | 表单项组件属性 |

#### 上传组件属性 Upload Props

| 属性名称 | 类型   | 描述         |
| -------- | ------ | ------------ |
| action   | String | 上传请求地址 |

#### 自定义属性 Slot Props

| 属性名称 | 类型   | 描述         |
| -------- | ------ | ------------ |
| model    | object | 当前表单数据 |
| item     | object | 当前表单配置 |
