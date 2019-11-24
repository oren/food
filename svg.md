## Use SVG files

```
npm install rollup-plugin-svg -D
```

in rollup.config.js:
```
import svg from 'rollup-plugin-svg';
```

Add svg() in two places:

```
export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      svg(),
```

and in the server config:

```
  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      svg(),
```

put svg file in static folder

and in your index.svelte file (or any svelte file)

```
import utensilsSolid from '../../static/utensils-solid.svg'

.tmp {
	width: 15px;
	height: 15px;
	color: red;
}

<div class="tmp">{@html utensilsSolid}</div>
```
