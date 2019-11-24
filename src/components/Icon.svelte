<script>
  export let icon;
  export let scale = 1;

  let path = icon.icon[4];
  let size = 16 * parseFloat(scale);
  let viewBox = "0 0 " + icon.icon[0] + " " + icon.icon[1];

  $: viewBox = "0 0 " + icon.icon[0] + " " + icon.icon[1];

  $: classes = "fa-svelte " + ($$props.class ? $$props.class : "");

  $: path = icon.icon[4];

  $: size = 16 * parseFloat(scale);
</script>

<style>
  svg {
    width: 16px;
    height: 16px;
    overflow: visible;
    display: inline-block;
  }
</style>

<svg
  aria-hidden="true"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="{viewBox}"
  style="width:{size}px;height:{size}px;"
>
  <path fill="currentColor" d="{path}" />
</svg>
