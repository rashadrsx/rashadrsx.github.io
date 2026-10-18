<script lang="ts" setup>
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref, unref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const navLinks = siteConfig.header.navLinks || []

const socialLinks = computed(() => {
  return siteConfig.socialLinks.filter((link: Record<string, any>) => {
    if (link.header && typeof link.header === 'boolean') {
      return link
    }
    else if (link.header && typeof link.header === 'string') {
      link.icon = link.header.includes('i-') ? link.header : link.icon
      return link
    }
    else {
      return false
    }
  })
})

const { y: scroll } = useWindowScroll()

const oldScroll = ref(unref(scroll))

onMounted(() => {
  const navMask = document.querySelector('.nav-drawer-mask') as HTMLElement

  navMask?.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

  const headerEl = document.querySelector('#header') as HTMLElement
  if (!headerEl)
    return

  if (document.documentElement.scrollTop > 100)
    headerEl.classList.add('header-bg-blur')

  window.addEventListener('scroll', () => {
    if (scroll.value < 150) {
      headerEl.classList.remove('header-hide')
      return
    }

    if (scroll.value - oldScroll.value > 150) {
      headerEl.classList.add('header-hide')
      oldScroll.value = scroll.value
    }

    if (oldScroll.value - scroll.value > 150) {
      headerEl.classList.remove('header-hide')
      oldScroll.value = scroll.value
    }
  })
})

function toggleNavDrawer() {
  const drawer = document.querySelector('.nav-drawer') as HTMLElement
  const mask = document.querySelector('.nav-drawer-mask') as HTMLElement
  if (!drawer || !mask)
    return
  if (drawer.style.transform === `translateX(0%)`) {
    drawer.style.transform = `translateX(-100%)`
    mask.style.display = `none`
  }
  else {
    drawer.style.transform = `translateX(0%)`
    mask.style.display = `block`
  }
}
</script>

<template>
  <header
    id="header" :class="{ 'header-bg-blur': scroll > 20 }"
    view-transition-name="site-header"
    class="!fixed bg-transparent z-899 w-screen h-20 px-6 flex justify-between items-center relative"
  >
    <div class="flex items-center h-full">
      <a href="/" mr-6 aria-label="Header Logo Image" class="text-black dark:text-white">
        <svg width="47" height="32" viewBox="0 0 333 225" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(0,225) scale(0.1,-0.1)" stroke="none">
            <path d="M446 1550 c-39 -12 -83 -56 -111 -110 -12 -25 -73 -200 -135 -390 -62 -190 -115 -349 -118 -353 -6 -11 204 -5 215 6 4 5 55 151 113 325 l105 317 222 3 c247 3 253 1 253 -63 0 -62 -11 -65 -213 -65 -213 0 -232 -6 -262 -84 -16 -42 -17 -50 -3 -85 9 -21 66 -111 128 -200 l112 -162 527 3 526 3 51 27 c94 50 143 131 144 238 0 80 -30 150 -85 199 -64 56 -86 61 -278 61 -121 0 -177 4 -185 12 -17 17 -15 93 2 108 8 6 25 11 38 10 13 -1 154 -2 315 -1 l291 1 31 93 c17 50 31 98 31 105 0 11 -72 13 -377 10 -373 -3 -379 -3 -425 -26 -49 -24 -99 -78 -119 -128 -17 -45 -14 -192 5 -239 22 -52 71 -103 121 -126 34 -16 66 -19 220 -19 198 0 205 -2 205 -56 0 -69 36 -64 -470 -64 l-458 0 -41 55 c-22 30 -41 57 -41 60 0 3 48 5 106 5 135 0 177 12 234 70 55 54 70 99 70 204 0 117 -40 188 -135 239 -38 21 -54 22 -310 24 -148 1 -283 -2 -299 -7z M 2596.7 733.0 Q 2610.0 690.0 2655.0 690.0 L 2845.0 690.0 Q 2890.0 690.0 2876.7 733.0 L 2634.8 1516.0 Q 2621.5 1559.0 2576.5 1559.0 L 2386.5 1559.0 Q 2341.5 1559.0 2354.8 1516.0 Z M 2052.6 721.1 Q 2020.0 690.0 2065.0 690.0 L 2255.0 690.0 Q 2300.0 690.0 2332.6 721.1 L 3179.0 1527.9 Q 3211.5 1559.0 3166.5 1559.0 L 2976.5 1559.0 Q 2931.5 1559.0 2899.0 1527.9 Z" />
          </g>
        </svg>
      </a>
      <nav class="sm:flex hidden flex-wrap gap-x-6 position-initial flex-row">
        <a
          v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
          nav-link :href="link.href"
        >
          {{ link.text }}
        </a>
      </nav>
      <div sm:hidden h-full flex items-center @click="toggleNavDrawer()">
        <menu i-ri-menu-2-fill />
      </div>
    </div>
    <div class="flex gap-x-6">
      <a
        v-for="link in socialLinks" :key="link.text" :aria-label="`${link.text}`" :class="link.icon" nav-link
        :target="getLinkTarget(link.href)" :href="link.href"
      />

      <a nav-link target="_blank" href="/rss.xml" i-ri-rss-line aria-label="RSS" />
      <ThemeToggle />
    </div>
  </header>
  <nav
    class="nav-drawer sm:hidden"
  >
    <i i-ri-menu-2-fill />
    <a
      v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
      nav-link :href="link.href" @click="toggleNavDrawer()"
    >
      {{ link.text }}
    </a>
  </nav>
  <div class="nav-drawer-mask" @click="toggleNavDrawer()" />
</template>

<style scoped>
.header-hide {
  transform: translateY(-100%);
  transition: transform 0.4s ease;
}

.header-bg-blur {
  --at-apply: backdrop-blur-sm;
}

.nav-drawer {
  transform: translateX(-100%);
  --at-apply: box-border fixed h-screen z-999 left-0 top-0 min-w-32vw max-w-50vw bg-main p-6 text-lg flex flex-col gap-5
    transition-all;
}

.nav-drawer-mask {
  display: none;
  --at-apply: transition-all;
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
</style>
