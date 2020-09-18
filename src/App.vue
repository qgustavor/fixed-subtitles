<template>
  <div class="container mx-auto flex flex-col justify-between min-h-screen">
    <Header />
    <div class="dark:text-white mb-auto router-main">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
