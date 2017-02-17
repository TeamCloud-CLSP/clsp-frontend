"use strict";
var MockCourseService = (function () {
    function MockCourseService() {
        this.courses = [
            { id: 11, name: 'JAPN 1001' },
            { id: 12, name: 'JAPN 1002' },
            { id: 13, name: 'JAPN 2001' },
            { id: 14, name: 'CHIN 1001' },
            { id: 15, name: 'CHIN 1002' },
            { id: 16, name: 'CHIN 2001' },
            { id: 17, name: 'RUSS 1001' },
            { id: 18, name: 'RUSS 1002' },
            { id: 19, name: 'RUSS 2001' },
            { id: 20, name: 'RUSS 2002' }
        ];
        this.id = 21;
    }
    MockCourseService.prototype.get = function () {
        return this.courses;
    };
    MockCourseService.prototype.add = function (course) {
        course.id = this.id++;
        this.courses.push(course);
    };
    MockCourseService.prototype.delete = function (course) {
        var index = this.courses.indexOf(course);
        if (index >= 0) {
            this.courses.splice(index, 1);
        }
    };
    return MockCourseService;
}());
exports.MockCourseService = MockCourseService;
//# sourceMappingURL=mock-course.service.js.map