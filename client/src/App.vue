<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: 'Open Sans';
  font-weight: normal;
  src: url(/assets/fonts/OpenSans-Regular.ttf) format('truetype');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans';
  font-weight: 400;
}

html,
body {
  padding: 0;
  margin: 0;
}

::selection {
  background-color: #00000033;
}
</style>
