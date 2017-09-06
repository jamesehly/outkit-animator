import { OutkitAnimator } from '../src/index';

describe('Outkit Animator Unit Tests', () => {

    beforeEach(() => {
        jasmine.clock().uninstall();
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('should clear the interval when the animation is done', () => {
        let animator = new OutkitAnimator();
        let spyClearInterval = spyOn(window, "clearInterval").and.callThrough();
        let startDate = new Date();
        let deltaDate = startDate.getTime();
        let spyDateNow = spyOn(Date, "now").and.callFake(function () {
            deltaDate += 16;
            return deltaDate;
        });
        animator.animate(startDate.getTime());
        jasmine.clock().tick(400);
        expect(spyClearInterval).toHaveBeenCalledTimes(1);
    })

    xit('should have 200ms set as the default duration', () => {
        let timerCallback = jasmine.createSpy("timerCallback");
        let animator = new Animator(null, timerCallback);
        let spyClearInterval = spyOn(window, "clearInterval").and.callThrough();
        let startDate = new Date();
        let deltaDate = startDate.getTime();
        let spyDateNow = spyOn(Date, "now").and.callFake(function () {
            deltaDate += 16;
            return deltaDate;
        });
        animator.animate(startDate.getTime());
        jasmine.clock().tick(199)
        expect(spyClearInterval).not.toHaveBeenCalled();
        jasmine.clock().tick(400);
        expect(timerCallback).toHaveBeenCalledTimes(13);
        expect(spyDateNow).toHaveBeenCalledTimes(13);
        expect(spyClearInterval).toHaveBeenCalledTimes(1);
    })

    xit('should be able to set the duration', () => {
        let timerCallback = jasmine.createSpy("timerCallback");
        let animator = new Animator(5000, timerCallback);
        let spyClearInterval = spyOn(window, "clearInterval").and.callThrough();
        let startDate = new Date();
        let deltaDate = startDate.getTime();
        let spyDateNow = spyOn(Date, "now").and.callFake(function () {
            deltaDate += 16;
            return deltaDate;
        });
        animator.animate(startDate.getTime());
        jasmine.clock().tick(4999);
        expect(spyClearInterval).not.toHaveBeenCalled();
        jasmine.clock().tick(5000);
        expect(spyClearInterval).toHaveBeenCalledTimes(1);
    })

})