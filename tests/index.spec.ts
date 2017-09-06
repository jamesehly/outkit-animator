import { OutkitAnimator } from '../src/index';

describe('Outkit Animator Unit Tests', () => {

    describe('SetInterval Animate Tests', () => {

        beforeEach(() => {
            jasmine.clock().uninstall();
            jasmine.clock().install();
        });

        afterEach(() => {
            jasmine.clock().uninstall();
        });

        it('should clear the interval when the animation is done', () => {
            //Arrange
            let animator = new OutkitAnimator();
            window.requestAnimationFrame = null;
            let spyClearInterval = spyOn(window, "clearInterval").and.callThrough();
            let startDate = new Date();
            let deltaDate = startDate.getTime();
            let spyDateNow = spyOn(Date, "now").and.callFake(function () {
                deltaDate += 16;
                return deltaDate;
            });

            //Act
            animator.animate(startDate.getTime());
            jasmine.clock().tick(400);

            //Assert
            expect(spyClearInterval).toHaveBeenCalledTimes(1);
        })

        it('should have 200ms set as the default duration', () => {
            //Arange
            let timerCallback = jasmine.createSpy("timerCallback");
            let animator = new OutkitAnimator();
            window.requestAnimationFrame = null;
            let spyClearInterval = spyOn(window, "clearInterval").and.callThrough();
            let startDate = new Date();
            let deltaDate = startDate.getTime();
            let spyDateNow = spyOn(Date, "now").and.callFake(function () {
                deltaDate += 16;
                return deltaDate;
            });
            //Act
            animator.animate(startDate.getTime());
            jasmine.clock().tick(199)
            //Assert
            expect(spyClearInterval).not.toHaveBeenCalled();
            jasmine.clock().tick(200);
            expect(spyClearInterval).toHaveBeenCalledTimes(1);
        });
    });

})