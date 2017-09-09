# Outkit Animator

An animator class written in typescript with timing functions and promises.  
Heavily inspired by the javascript class at http://javascript.info/js-animation.
If available, it will use requestAnimationFrame or it will fall back to 
setInterval. The animate method returns a promise so that you can stack animations.

## Installation

`npm install --save outkit-animator`

## Example

This example animates the console logging y * x.  x is the delta time that represents
the progress of the animation (its a number from 0 to 1).

```
import { OutkitAnimator, AnimatorTransition } from 'outkit-animator';

...
const animator = new OutkitAnimator();
animator
    .setDuration(500)
    .setTransition(AnimatorTransition.EaseOut)
    .setRate(16)
    .setStep((x, y) => {
        console.log(y * x);
        y++
    })

animator.animate(null, 1);
...
```

## Build

`npm run build`

## Release

`npm run release`