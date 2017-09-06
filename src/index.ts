import { IAnimator, AnimatorTransition } from "./common";

/**
 * Outkit Animator
 * A simple animator class that has timing functions.  Heavily inspired by the 
 * javascript class at http://javascript.info/js-animation.  If available it will
 * use requestAnimationFrame or it will fall back to setInterval. Animate
 * returns a promise so that you can stack animations.
 * 
 * @export
 * @class OutkitAnimator
 * @implements {IAnimator}
 */
export class OutkitAnimator implements IAnimator {

    public start: number;
    private _duration: number;
    private _step: Function;
    private _interval: number;
    private _rate: number;
    private _transition: Function;

    public constructor() {
        this._duration = 200;
        this._step = () => { };
        this._rate = 16;
        this._transition = this.linear;
    }

    /**
     * Sets the step function called by animate at each interval
     * 
     * @param step Function that takes a delta and args
     * @returns {this} 
     * @memberof OutkitAnimator
     */
    setStep(step: Function): this {
        this._step = step;
        return this;
    }

    /**
     * Sets the total duration of the animation
     * 
     * @param {number} duration milliseconds of splendid animation (default: 200ms)
     * @returns {this} 
     * @memberof OutkitAnimator
     */
    setDuration(duration: number): this {
        this._duration = duration;
        return this;
    }

    /**
     * Set the interval rate of the animation
     * 
     * @param {number} rate interval rate in milliseconds (default: 16ms)
     * @returns {this} 
     * @memberof OutkitAnimator
     */
    setRate(rate: number): this {
        this._rate = rate;
        return this;
    }

    /**
     * Sets the timing function used by the animate function (default: Linear)
     * 
     * @param {AnimatorTransition} transition Timing function
     * @returns {this} 
     * @memberof OutkitAnimator
     */
    setTransition(transition: AnimatorTransition): this {
        switch (transition) {
            case AnimatorTransition.EaseIn:
                this._transition = this.easeIn;
                break;
            case AnimatorTransition.EaseOut:
                this._transition = this.easeOut;
                break;
            case AnimatorTransition.EaseInOut:
                this._transition = this.easeInOut;
                break;
            case AnimatorTransition.PullIn:
                this._transition = this.pullIn;
                break;
            case AnimatorTransition.PushOut:
                this._transition = this.pushOut;
                break;
            case AnimatorTransition.PushPull:
                this._transition = this.pushPull;
                break;
            default:
                this._transition = this.linear;
                break;
        }
        return this;
    }

    /**
     * Animates the 'step' function over 'duration' at interval 'rate'. 
     * Step is called with delta time and any arguments that you pass to the 
     * animate function.
     * @param start a date (mainly used for testing)
     */
    animate(start?: number, ...args: any[]): Promise<boolean> {
        return new Promise((resolve) => {
            if (typeof window['requestAnimationFrame'] === 'function') {
                let start = performance.now();
                const rafAnimate = (time) => {
                    let progress = (time - start) / this._duration;
                    if (progress > 1) progress = 1;

                    // calculate the current animation state
                    let delta = this._transition(progress)

                    this._step(delta, args);

                    if (progress < 1) {
                        requestAnimationFrame(rafAnimate);
                    } else {
                        resolve(true);
                    }
                }
                requestAnimationFrame(rafAnimate);
            } else {
                this._interval = window.setInterval(() => {
                    let deltaTime = Date.now();
                    let timePassed = deltaTime - start;
                    let progress = timePassed / this._duration;

                    if (progress > 1) progress = 1

                    var delta = this._transition(progress);

                    this._step(delta, args);

                    if (progress == 1) {
                        clearInterval(this._interval);
                        resolve(true);
                    }
                }, this._rate)
            }
        })
    }

    private linear(progress: number) {
        return progress;
    }

    private easeIn(progress: number) {
        return Math.pow(progress, 5);
    }

    private easeOut = this.makeEaseOut(this.easeIn);

    private easeInOut = this.makeEaseInOut(this.easeIn);

    private pullIn(progress: number, x: number = 2) {
        return Math.pow(progress, 2) * ((x + 1) * progress - x)
    }

    private pushOut = this.makeEaseOut(this.pullIn);

    private pushPull = this.makeEaseInOut(this.pullIn);

    private makeEaseOut(timing: Function) {
        return function (progress: number) {
            return 1 - timing(1 - progress);
        }
    }

    private makeEaseInOut(timing) {
        return function (progress) {
            if (progress < .5)
                return timing(2 * progress) / 2;
            else
                return (2 - timing(2 * (1 - progress))) / 2;
        }
    }
}