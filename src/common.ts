export interface IAnimator {
    animate(start?: number, ...args : any[]): Promise<boolean>;
    setStep(step: Function): this;
    setDuration(duration: number): this;
    setRate(rate: number): this;
    setTransition(transition: AnimatorTransition);
}

export enum AnimatorTransition {
    Linear,
    EaseIn,
    EaseOut,
    EaseInOut,
    PullIn,
    PushOut,
    PushPull
}
