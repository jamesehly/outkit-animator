import { IAnimator, AnimatorTransition } from "./common";
export declare class OutkitAnimator implements IAnimator {
    start: number;
    private _duration;
    private _step;
    private _interval;
    private _rate;
    private _transition;
    constructor();
    setStep(step: Function): this;
    setDuration(duration: number): this;
    setRate(rate: number): this;
    setTransition(transition: AnimatorTransition): this;
    animate(start?: number, ...args: any[]): Promise<boolean>;
    private linear(progress);
    private easeIn(progress);
    private easeOut;
    private easeInOut;
    private pullIn(progress, x?);
    private pushOut;
    private pushPull;
    private makeEaseOut(timing);
    private makeEaseInOut(timing);
}
