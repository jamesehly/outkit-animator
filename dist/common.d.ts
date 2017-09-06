export interface IAnimator {
    animate(start?: number, ...args: any[]): Promise<boolean>;
    setStep(step: Function): this;
    setDuration(duration: number): this;
    setRate(rate: number): this;
    setTransition(transition: AnimatorTransition): any;
}
export declare enum AnimatorTransition {
    Linear = 0,
    EaseIn = 1,
    EaseOut = 2,
    EaseInOut = 3,
    PullIn = 4,
    PushOut = 5,
    PushPull = 6,
}
