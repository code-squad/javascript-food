import {
    request
} from './helpers';

export default class Controller {
    /**
     * @param  {!View} view A View instance
     */
    constructor(view, infiniteView) {
        this.view = view;
        this.infiniteView = infiniteView;

        view.bind('slidesPrev', this.moveSlides.bind(this));
        view.bind('slidesNext', this.moveSlides.bind(this));
        view.bind('slidesDots', this.currentSlide.bind(this));

        infiniteView.bind('sideSlidesPrev', this.moveSideSlides.bind(this));
        infiniteView.bind('sideSlidesNext', this.moveSideSlides.bind(this));

        infiniteView.bind('mainSlidesPrev', this.moveMainSlides.bind(this));
        infiniteView.bind('mainSlidesNext', this.moveMainSlides.bind(this));

        infiniteView.bind('courseSlidesPrev', this.moveCourseSlides.bind(this));
        infiniteView.bind('courseSlidesNext', this.moveCourseSlides.bind(this));

        this.slideIndex = 0;
        this.sideDirection = -20;
        this.mainDirection = -20;
        this.courseDirection = -20;
    }

    setView() {
        this.initSlide('http://home.dotol.xyz/php/test_api.php');
        this.initBanchan('http://crong.codesquad.kr:8080/woowa/best');
        this.initSideBanchan('http://crong.codesquad.kr:8080/woowa/side');
        this.initMainBanchan('http://crong.codesquad.kr:8080/woowa/main');
        this.initCourseBanchan('http://crong.codesquad.kr:8080/woowa/course');
        this.view.bind('preventDefault');
    }

    async initSlide(url) {
        try {
            this.slideImgs = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.slidesEnd = this.slideImgs.length - 1;
        this.view.showSlide(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    moveSlides(n) {
        this.view.hideSlide(this.slideIndex);
        this.slideIndex += n;
        if (this.slideIndex > this.slidesEnd) this.slideIndex = 0;
        if (this.slideIndex < 0) this.slideIndex = this.slidesEnd;
        this.view.showSlide(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    currentSlide(n) {
        this.view.hideSlide(this.slideIndex);
        this.slideIndex = n;
        this.view.showSlide(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    async initBanchan(url) {
        try {
            this.banchan = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.view.render('Banchan', this.banchan);
        this.view.bind('foodTab', this.banchan);
    }

    async initSideBanchan(url) {
        try {
            this.sideBanchan = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.infiniteView.render('SideBanchan', this.sideBanchan, this.sideDirection);
        this.infiniteView.bind('sideSlides', this.resetSideSlides.bind(this, -40, 0));
    }

    moveSideSlides(direction) {
        this.sideDirection += direction;
        this.infiniteView.showSlides('side', this.sideDirection);
    }

    resetSideSlides(thresholdLeft, thresholdRight) {
        if (this.sideDirection === thresholdLeft || this.sideDirection === thresholdRight) {
            this.infiniteView.showSlides('side', this.sideDirection = -20, true);
        }
    }

    async initMainBanchan(url) {
        try {
            this.mainBanchan = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.infiniteView.render('MainBanchan', this.mainBanchan, this.mainDirection);
        this.infiniteView.bind('mainSlides', this.resetMainSlides.bind(this, -40, 0));
    }

    moveMainSlides(direction) {
        this.mainDirection += direction;
        this.infiniteView.showSlides('main', this.mainDirection);
    }

    resetMainSlides(thresholdLeft, thresholdRight) {
        if (this.mainDirection === thresholdLeft || this.mainDirection === thresholdRight) {
            this.infiniteView.showSlides('main', this.mainDirection = -20, true);
        }
    }

    async initCourseBanchan(url) {
        try {
            this.courseBanchan = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.infiniteView.render('CourseBanchan', this.courseBanchan, this.courseDirection);
        this.infiniteView.bind('courseSlides', this.resetCourseSlides.bind(this, -40, 0));
    }

    moveCourseSlides(direction) {
        this.courseDirection += direction;
        this.infiniteView.showSlides('course', this.courseDirection);
    }

    resetCourseSlides(thresholdLeft, thresholdRight) {
        if (this.courseDirection === thresholdLeft || this.courseDirection === thresholdRight) {
            this.infiniteView.showSlides('course', this.courseDirection = -20, true);
        }
    }

}