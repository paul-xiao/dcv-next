# Dcv-Next

> a toolkit for Business end system

## Todos

- Basic
  - [x] Form
  - [ ] Table
    - [x] init data
    - [x] pagination
    - [x] row data format
    - [x] column custom slot
    - [x] operation column set width and fixed

## Install

```sh
pnpm add dcv-next
```

## Useage

### Form

#### Basic

```jsx
<dc-form
    v-model="form"
    :schema="schema"
    :rules="rules"
    @submit="onSubmit">
</dc-form>
...
import { Form as DcForm } from 'dcv-next'

const form = {}
// form schema
const schema = [
  {
    label: 'label',
    prop: 'name'
  }
  ...
]
//  form validation rules
const rules = {
  name: [{
    required: true,
    message: 'please input name',
    trigger: 'blur'
  }]
}

function onSubmit(model) {
  console.log(model)
  // your submit opts
}
```

### UseForm hook

```jsx
<dc-form
    v-model="form"
    :schema="schema"
    :rules="rules"
    @submit="onSumit">
</dc-form>
...
import { Form as DcForm } from 'dcv-next'
// form schema
const schema = [
  {
    label: 'label',
    prop: 'name'
  }
  ...
]
//  form validation rules
const rules = {
  name: [{
    required: true,
    message: 'please input name',
    trigger: 'blur'
  }]
}

function onSumit(model) {
  console.log(model)
  // your submit opts
}
```

### Form Attrs

| Name       | Type    | Default | Description           |
| ---------- | ------- | ------- | --------------------- |
| modelValue | object  | null    | form value            |
| schema     | array   | null    | form schema           |
| rules      | array   | null    | form validation rules |
| detailed   | boolean | false   | is detail mode        |
| foot       | boolean | false   | show foot             |

### FormItem Attrs

| Name           | Type     | Default | Description                                |
| -------------- | -------- | ------- | ------------------------------------------ |
| label          | object   | null    | label                                      |
| labelWidth     | array    | null    | label width                                |
| prop           | array    | null    | validate rules                             |
| type           | boolean  | false   | component type                             |
| span           | boolean  | false   | The number of columns occupied by the grid |
| slot           | boolean  | false   | is slot                                    |
| rules          | boolean  | false   | validate rules                             |
| componentProps | object   | null    | component props                            |
| change         | function | null    | show foot                                  |
