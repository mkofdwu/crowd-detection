<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: 'Open Sans';
  src: url('~@/assets/fonts/OpenSans-Light.ttf') format('truetype');
  font-weight: 300;
}

@font-face {
  font-family: 'Open Sans';
  src: url('~@/assets/fonts/OpenSans-Regular.ttf') format('truetype');
  font-weight: 400;
}

@font-face {
  font-family: 'Open Sans';
  src: url('~@/assets/fonts/OpenSans-SemiBold.ttf') format('truetype');
  font-weight: 600;
}

@font-face {
  font-family: 'Open Sans';
  src: url('~@/assets/fonts/OpenSans-Bold.ttf') format('truetype');
  font-weight: 700;
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

.icon-btn {
  position: absolute;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 7px;
  cursor: pointer;
  box-shadow: 0 20px 20px #00000077;
  transition: box-shadow 200ms, transform 200ms;

  display: grid;
  place-items: center;
}

.icon-btn:active {
  transform: translateY(5px);
  box-shadow: 0 10px 20px #00000077;
}
</style>
