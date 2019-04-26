"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("jest-enzyme");
require("react-native");
const enzyme_adapter_react_16_1 = tslib_1.__importDefault(require("enzyme-adapter-react-16"));
const enzyme_1 = tslib_1.__importDefault(require("enzyme"));
/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
function copyProps(src, target) {
    Object.defineProperties(target, Object.assign({}, Object.getOwnPropertyDescriptors(src), Object.getOwnPropertyDescriptors(target)));
}
global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);
/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
enzyme_1.default.configure({ adapter: new enzyme_adapter_react_16_1.default() });
/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */
const originalConsoleError = console.error;
// tslint:disable-next-line: no-console
console.error = (message) => {
    if (message.startsWith('Warning:')) {
        return;
    }
    originalConsoleError(message);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL211aGFtbWFkZGFuaWFsaXFiYWwvRG9jdW1lbnRzL2JsdWVlYXN0L3BsdWdpbnMtYWQvcGx1Z2luLW5hdGl2ZS13ZWItc3dpcGVyL3Rlc3RzL3NldHVwLnRzIiwibWFwcGluZ3MiOiI7OztBQUFBLHVCQUFxQjtBQUNyQix3QkFBc0I7QUFDdEIsOEZBQThDO0FBQzlDLDREQUE0QjtBQUU1Qjs7R0FFRztBQUNILE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztBQUNyRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBRXpCLFNBQVMsU0FBUyxDQUFDLEdBQVEsRUFBRSxNQUFXO0lBQ3ZDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLG9CQUMxQixNQUFNLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLEVBQ3JDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsRUFDMUMsQ0FBQztBQUNKLENBQUM7QUFRRCxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN2QixNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDbEMsTUFBTSxDQUFDLFNBQVMsR0FBRztJQUNsQixTQUFTLEVBQUUsU0FBUztDQUNwQixDQUFDO0FBQ0YsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUUxQjs7O0dBR0c7QUFDSCxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLGlDQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFN0M7Ozs7R0FJRztBQUNILE1BQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUMzQyx1Q0FBdUM7QUFDdkMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLE9BQVksRUFBRSxFQUFFO0lBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNuQyxPQUFPO0tBQ1A7SUFFRCxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL211aGFtbWFkZGFuaWFsaXFiYWwvRG9jdW1lbnRzL2JsdWVlYXN0L3BsdWdpbnMtYWQvcGx1Z2luLW5hdGl2ZS13ZWItc3dpcGVyL3Rlc3RzL3NldHVwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnamVzdC1lbnp5bWUnO1xuaW1wb3J0ICdyZWFjdC1uYXRpdmUnO1xuaW1wb3J0IEFkYXB0ZXIgZnJvbSAnZW56eW1lLWFkYXB0ZXItcmVhY3QtMTYnO1xuaW1wb3J0IEVuenltZSBmcm9tICdlbnp5bWUnO1xuXG4vKipcbiAqIFNldCB1cCBET00gaW4gbm9kZS5qcyBlbnZpcm9ubWVudCBmb3IgRW56eW1lIHRvIG1vdW50IHRvXG4gKi9cbmNvbnN0IHsgSlNET00gfSA9IHJlcXVpcmUoJ2pzZG9tJyk7XG5cbmNvbnN0IGpzZG9tID0gbmV3IEpTRE9NKCc8IWRvY3R5cGUgaHRtbD48aHRtbD48Ym9keT48L2JvZHk+PC9odG1sPicpO1xuY29uc3QgeyB3aW5kb3cgfSA9IGpzZG9tO1xuXG5mdW5jdGlvbiBjb3B5UHJvcHMoc3JjOiBhbnksIHRhcmdldDogYW55KSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwge1xuXHRcdC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNyYyksXG5cdFx0Li4uT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnModGFyZ2V0KSxcblx0fSk7XG59XG5cbmRlY2xhcmUgY29uc3QgZ2xvYmFsOiB7XG5cdGRvY3VtZW50OiBhbnksXG5cdG5hdmlnYXRvcjogYW55LFxuXHR3aW5kb3c6IGFueSxcbn07XG5cbmdsb2JhbC53aW5kb3cgPSB3aW5kb3c7XG5nbG9iYWwuZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG5nbG9iYWwubmF2aWdhdG9yID0ge1xuXHR1c2VyQWdlbnQ6ICdub2RlLmpzJyxcbn07XG5jb3B5UHJvcHMod2luZG93LCBnbG9iYWwpO1xuXG4vKipcbiAqIFNldCB1cCBFbnp5bWUgdG8gbW91bnQgdG8gRE9NLCBzaW11bGF0ZSBldmVudHMsXG4gKiBhbmQgaW5zcGVjdCB0aGUgRE9NIGluIHRlc3RzLlxuICovXG5Fbnp5bWUuY29uZmlndXJlKHsgYWRhcHRlcjogbmV3IEFkYXB0ZXIoKSB9KTtcblxuLyoqXG4gKiBJZ25vcmUgc29tZSBleHBlY3RlZCB3YXJuaW5nc1xuICogc2VlOiBodHRwczovL2plc3Rqcy5pby9kb2NzL2VuL3R1dG9yaWFsLXJlYWN0Lmh0bWwjc25hcHNob3QtdGVzdGluZy13aXRoLW1vY2tzLWVuenltZS1hbmQtcmVhY3QtMTZcbiAqIHNlZSBodHRwczovL2dpdGh1Yi5jb20vUm9vdC1BcHAvcmVhY3QtbmF0aXZlLW1vY2stcmVuZGVyL2lzc3Vlcy82XG4gKi9cbmNvbnN0IG9yaWdpbmFsQ29uc29sZUVycm9yID0gY29uc29sZS5lcnJvcjtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tY29uc29sZVxuY29uc29sZS5lcnJvciA9IChtZXNzYWdlOiBhbnkpID0+IHtcblx0aWYgKG1lc3NhZ2Uuc3RhcnRzV2l0aCgnV2FybmluZzonKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdG9yaWdpbmFsQ29uc29sZUVycm9yKG1lc3NhZ2UpO1xufTsiXSwidmVyc2lvbiI6M30=