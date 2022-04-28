<template>
  <div>
    <h1>md editor</h1>
  </div>
  <div class="p-5">
    <div :contenteditable="true" class="p-5 my-5 border outline-none"></div>
    <dc-button>保存</dc-button>
  </div>
</template>
