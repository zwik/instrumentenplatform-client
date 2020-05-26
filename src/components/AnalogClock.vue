<template>
  <canvas ref="canvas" width="100px" height="100px">
  </canvas>
</template>

<script>
export default {
  name: 'AnalogClock',
  props: {
    time: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      canvas: undefined,
      ctx: undefined,
      secHandLength: 37,

    };
  },
  watch: {
    time() {
      this.clearCanvas();
      this.drawClock();
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.clearCanvas();
    this.drawClock();
  },
  methods: {
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawClock() {
      this.outerDial();
      this.centerDial();
      this.showSeconds();
      this.showMinutes();
      this.showHours();
    },
    outerDial() {
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2,
        this.secHandLength + 10, 0, Math.PI * 2);
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = 5;
      this.ctx.stroke();
    },
    centerDial() {
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 2, 2, 0, Math.PI * 2);
      this.ctx.lineWidth = 3;
      this.ctx.fillStyle = 'white';
      this.ctx.strokeStyle = 'white';
      this.ctx.stroke();
    },
    showSeconds() {
      const sec = this.time.getSeconds();
      const angle = ((Math.PI * 2) * (sec / 60)) - ((Math.PI * 2) / 4);
      this.ctx.lineWidth = 0.5;

      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.lineTo((this.canvas.width / 2 + Math.cos(angle) * this.secHandLength),
        this.canvas.height / 2 + Math.sin(angle) * this.secHandLength);

      this.ctx.strokeStyle = 'white';
      this.ctx.stroke();
    },
    showMinutes() {
      const min = this.time.getMinutes();
      const angle = ((Math.PI * 2) * (min / 60)) - ((Math.PI * 2) / 4);
      this.ctx.lineWidth = 1.5;

      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.lineTo((this.canvas.width / 2 + Math.cos(angle) * (this.secHandLength / 1.1)),
        this.canvas.height / 2 + Math.sin(angle) * (this.secHandLength / 1.1));

      this.ctx.strokeStyle = 'white';
      this.ctx.stroke();
    },
    showHours() {
      const hour = this.time.getHours();
      const min = this.time.getMinutes();
      const angle = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
      this.ctx.lineWidth = 1.5;

      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.lineTo((this.canvas.width / 2 + Math.cos(angle) * (this.secHandLength / 1.5)),
        this.canvas.height / 2 + Math.sin(angle) * (this.secHandLength / 1.5));
      this.ctx.strokeStyle = 'white';
      this.ctx.stroke();
    },
  },
};
</script>
