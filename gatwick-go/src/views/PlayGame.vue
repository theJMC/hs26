

<template>
  <main>
    <h1>TESTY TEST TEST</h1>
    <div class="sketch-wrapper">
        <h2>My p5.js Sketch</h2>
        <div ref="p5Container"></div>
    </div>
  </main>
</template>

<script>
    export default {
        mounted() {
            const p5minjs = document.createElement("script");
            p5minjs.src = "https://cdn.jsdelivr.net/npm/p5@1.11.11/lib/p5.min.js"
            document.body.appendChild(p5minjs)

            const p5main = document.createElement("script");
            p5main.src = "./p5/main.js"
            document.body.appendChild(p5main)
        }
    }
</script>