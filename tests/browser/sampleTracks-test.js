describe('Component: sampleTracks', function() {
    beforeEach(module('Roots'));

    var element, scope, ctrl;
    beforeEach(inject(function($rootScope, $compile, $componentController) {
        var scope = $rootScope.$new();
        // var bindings = {tracks: []};
        // ctrl = $componentController('sampleTracks', scope, bindings);
        element = angular.element('<sample-tracks tracks="{{}}"></sample-tracks>');
        element = $compile(element)(scope);
        scope.$apply();
    }));

    it('should render element', function() {
        console.log('element', element);

        // var h4 = element.find('h4');
        // expect(h4.text()).toBe('Sample Tracks');
    });
});

// import FundOperationsApp from "../../src/index";
// import mockCashActivitiesDetails from "../fixtures/mockCashActivityDetails";

// it("load modules", () => {
//     expect(FundOperationsApp).not.toBeUndefined();
// });

// describe("Controller: CashActivitiesActionsController", () => {
//     let GLOBALS, $rootScope, $httpBackend, $componentController, scope, controller, inheritedCheckedItems;

//     beforeEach(module(FundOperationsApp.name));

//     beforeEach(inject((_GLOBALS_, _$rootScope_, _$stateParams_, _$httpBackend_, _$state_, _$compile_, _$componentController_) => {
//         GLOBALS = _GLOBALS_;
//         $rootScope = _$rootScope_;
//         $httpBackend = _$httpBackend_;
//         scope = $rootScope.$new();
//         $componentController = _$componentController_;
//         inheritedCheckedItems = angular.copy(mockCashActivitiesDetails.payments);
//         controller = $componentController('cashActivityActions', {$scope: scope}, {checkedItems: inheritedCheckedItems});

//     }));

//     it("correctly filters unpaid items from checkedItems", () => {
//         $httpBackend.expectGET(GLOBALS.FUNDS_URL).respond();
//         scope.$apply();

//         expect(controller.checkedItems.length).toEqual(3);
//         expect(controller.unpaidCheckedItems.length).toEqual(2);

//         inheritedCheckedItems.push(inheritedCheckedItems[0]);
//         scope.$apply();

//         expect(controller.checkedItems.length).toEqual(4);
//         expect(controller.unpaidCheckedItems.length).toEqual(3);

//         inheritedCheckedItems.length = 0;
//         scope.$apply();

//         expect(controller.checkedItems.length).toEqual(0);
//         expect(controller.unpaidCheckedItems.length).toEqual(0);
//     });
// });
