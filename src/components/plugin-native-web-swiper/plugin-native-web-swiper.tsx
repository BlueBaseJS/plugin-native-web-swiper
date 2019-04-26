import {
	Animated,
	PanResponder,
	PanResponderInstance,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import React from 'react';

interface Props {
	actionMinWidth: number,
	activeDotElement: any,
	activeDotStyle: object,
	autoplayTimeout: number,
	children: React.ReactNode [],
	containerStyle: object,
	controlsWrapperStyle: object,
	direction: 'row' | 'column',
	dotElement: any,
	dotStyle: object,
	dotsWrapperStyle: object,
	index: number,
	loop: boolean,
	nextButtonElement: any,
	nextButtonStyle: object,
	nextButtonText: string,
	onAnimationEnd: (index: number) => void,
	onAnimationStart: () => void,
	onIndexChanged: (index: number) => void,
	overRangeButtonsOpacity: number,
	prevButtonElement: any,
	prevButtonStyle: object,
	prevButtonText: string,
	scrollEnabled: boolean,
	swipeAreaStyle: object,
	swipeWrapperStyle: object,
	showDots: boolean,
	showNextPrev: boolean
}
interface State {
	activeIndex: number,
	height: number,
	pan: any,
	width: number,
}
export default class Swiper extends React.Component<Props, State> {
	static defaultProps = {
		actionMinWidth: 0.25,
		autoplayTimeout: 0,
		direction: 'row',
		index: 0,
		loop: false,
		nextButtonText: 'next',
		overRangeButtonsOpacity: 0,
		prevButtonText: 'prev',
		scrollEnabled: true,
		showDots: true,
		showNextPrev: true,
	};
	_animatedValueX: number;
	_animatedValueY: number;
	_panResponder: PanResponderInstance;
	count!: number;
 	autoplay!: number;
	
	constructor(props: Props) {
		super(props);
		this.state = {
			activeIndex: props.index,
			height: 0,
			pan: new Animated.ValueXY(),
			width: 0,
		};
		this._animatedValueX = 0;
		this._animatedValueY = 0;
		this._panResponder = PanResponder.create({
			onMoveShouldSetPanResponderCapture: (_e, gestureState) => {
				if (this.props.onAnimationStart) {
					this.props.onAnimationStart();
				}
				const allow = Math.abs(this.props.direction === 'row' ? gestureState.dx : gestureState.dy) > 5;
				if (allow) { this.stopAutoplay(); }
				return allow;
			},
			// onMoveShouldSetResponderCapture: () => true,
			onPanResponderGrant: (_e, _gestureState) => this._fixState(),
			onPanResponderMove: Animated.event([
				null, this.props.direction === 'row' ? { dx: this.state.pan.x } : { dy: this.state.pan.y },
			]),
			onPanResponderRelease: (_e, gesture) => {
				const correction = this.props.direction === 'row' ? gesture.moveX - gesture.x0 : gesture.moveY - gesture.y0;
				this.startAutoplay();
				if (Math.abs(correction) < this.getActionMinWidth(props)) {
					return Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start(() => {
						if (this.props.onAnimationEnd) {
							this.props.onAnimationEnd(this.state.activeIndex);
						}
					});
				}
				this._changeIndex(correction > 0 ? -1 : 1);
			},
			onPanResponderTerminationRequest: () => false,
		});
	}
	getActionMinWidth = (props: Props) => {
		return ((props.direction === 'row' ? this.state.width : this.state.height) * props.actionMinWidth);
	}
	componentDidMount() {
		this.state.pan.x.addListener((value : {value: number}) => this._animatedValueX = value.value);
		this.state.pan.y.addListener((value : {value: number}) => this._animatedValueY = value.value);
		this.startAutoplay();
	}
	componentWillUnmount() {
		this.stopAutoplay();
		this.state.pan.x.removeAllListeners();
		this.state.pan.y.removeAllListeners();
	}
	startAutoplay() {
		this.stopAutoplay();
		if (!!this.props.autoplayTimeout) {
			this.autoplay = setTimeout(() => {
				this.moveUpDown(this.props.autoplayTimeout < 0);
			}, Math.abs(this.props.autoplayTimeout) * 1000);
		}
	}
	stopAutoplay() {
		if (!!this.autoplay) {
			clearTimeout(this.autoplay);
		}
	}
	moveUpDown(down: boolean = false) {
		this._fixState();
		if (this.props.onAnimationStart) {
			this.props.onAnimationStart();
		}
		this._changeIndex(down ? -1 : 1);
	}
	_fixState() {
		this._animatedValueX = this.props.direction === 'row' ? this.state.width * this.state.activeIndex * -1 : 0;
		this._animatedValueY = this.props.direction === 'row' ? 0 : this.state.height * this.state.activeIndex * -1;
		this.state.pan.setOffset({ x: this._animatedValueX, y: this._animatedValueY });
		this.state.pan.setValue({ x: 0, y: 0 });
	}
	_changeIndex(delta: number = 1) {
		const move = { x: 0, y: 0 };
		let skipChanges = (!delta);
		let calcDelta = delta;
		if (this.state.activeIndex <= 0 && delta < 0) {
			skipChanges = (!this.props.loop);
			calcDelta = this.count + delta;
		} else if (this.state.activeIndex + 1 >= this.count && delta > 0) {
			skipChanges = (!this.props.loop);
			calcDelta = -1 * this.state.activeIndex + delta - 1;
		}
		if (skipChanges) {
			return Animated.spring(this.state.pan, { toValue: move }).start(() => {
				if (this.props.onAnimationEnd) {
					this.props.onAnimationEnd(this.state.activeIndex);
				}
			});
		}
		this.stopAutoplay();
		const index = this.state.activeIndex + calcDelta;
		this.setState({ activeIndex: index });
		if (this.props.direction === 'row') {
			move.x = this.state.width * -1 * calcDelta;
		}
		else {
			move.y = this.state.height * -1 * calcDelta;
		}
		Animated.spring(this.state.pan, { toValue: move }).start(() => {
			if (this.props.onAnimationEnd) {
				this.props.onAnimationEnd(index);
			}
		});
		this.startAutoplay();
		if (!!this.props.onIndexChanged) {
			this.props.onIndexChanged(index);
		}
	}
	_onLayout(event: any) {
		const { width, height } = event.nativeEvent.layout;
		this.setState({ width, height }, () => this._fixState());
	}
	render() {
		const { pan, width, height, activeIndex } = this.state;
		const {
			direction,
			containerStyle,
			swipeAreaStyle,
			swipeWrapperStyle,
			controlsWrapperStyle,
			dotsWrapperStyle,
			dotElement,
			dotStyle,
			activeDotElement,
			activeDotStyle,
			prevButtonElement,
			prevButtonStyle,
			prevButtonText,
			nextButtonElement,
			nextButtonStyle,
			nextButtonText,
			loop,
			scrollEnabled,
			showDots,
			showNextPrev
		} = this.props;
		if (!width) {
			return (<View style={[styles.container, containerStyle]} onLayout={this._onLayout.bind(this)} />);
		}
		const overRangeButtonsOpacity = !loop ? this.props.overRangeButtonsOpacity : this.props.overRangeButtonsOpacity || 1;
		let { children } = this.props;
		if (!Array.isArray(children)) {
			children = [children];
		}
		this.count = children.length;
		return (
			<View style={[styles.container, containerStyle]} onLayout={this._onLayout.bind(this)}>
				<View style={[styles.sliderContainer, swipeAreaStyle]}>
					{scrollEnabled ?
						<Animated.View
							style={[{
								left: 0,
								position: 'relative',
								top: 0,
							}, swipeWrapperStyle, {
								flexDirection: direction,
								height: direction === 'row' ? height : height * this.count,
								width: direction === 'row' ? width * this.count : width,
							}, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
							{...this._panResponder.panHandlers}
						>
							{children.map((el: React.ReactNode, i) => (<View key={i} style={{ width, height }}>{el}</View>))}
						</Animated.View> :
						<Animated.View
							style={[{
								left: 0,
								position: 'relative',
								top: 0,
							}, swipeWrapperStyle, {
								flexDirection: direction,
								height: direction === 'row' ? height : height * this.count,
								width: direction === 'row' ? width * this.count : width,
							}, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
						>
							{children.map((el: React.ReactNode, i: number) => (<View key={i} style={{ width, height }}>{el}</View>))}
						</Animated.View>
					}
					<Animated.View
						style={[{
							left: 0,
							position: 'relative',
							top: 0,
						}, swipeWrapperStyle, {
							flexDirection: direction,
							height: direction === 'row' ? height : height * this.count,
							width: direction === 'row' ? width * this.count : width,
						}, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
					>
						{children.map((el : React.ReactNode, i: number) => (<View key={i} style={{ width, height }}>{el}</View>))}
					</Animated.View>
					{(showDots || showNextPrev) && <View style={[styles.controlsWrapperStyle, {
						flexDirection: direction,
					}, direction === 'row' ? { left: 0 } : { top: 0 }, controlsWrapperStyle]}>
						{showNextPrev && <View style={{ opacity: !activeIndex ? overRangeButtonsOpacity : 1 }}>
							<TouchableOpacity disabled={!activeIndex && !loop} onPress={() => this.moveUpDown(true)}>
								{prevButtonElement || <Text style={[styles.prevButtonStyle, prevButtonStyle]}>{prevButtonText}</Text>}
							</TouchableOpacity>
						</View>}
						{showDots && <View style={[{ flexDirection: direction }, styles.dotsWrapperStyle, dotsWrapperStyle]}>
							{children.map((_el, i: number) => (
								<View key={i}>
									{i === activeIndex
										? activeDotElement || <View style={[styles.activeDotStyle, activeDotStyle]} />
										: dotElement || <View style={[styles.dotStyle, dotStyle]} />}
								</View>
							))}
						</View>}
						{showNextPrev && <View style={{ opacity: activeIndex + 1 >= this.count ? overRangeButtonsOpacity : 1 }}>
							<TouchableOpacity disabled={activeIndex + 1 >= this.count && !loop} onPress={() => this.moveUpDown()}>
								{nextButtonElement || <Text style={[styles.nextButtonStyle, nextButtonStyle]}>{nextButtonText}</Text>}
							</TouchableOpacity>
						</View>}
					</View>}
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	activeDotStyle: {
		backgroundColor: '#007aff',
		borderRadius: 4,
		height: 8,
		marginBottom: 3,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		width: 8,
	},
	container: {
		backgroundColor: 'transparent',
		flex: 1,
	},
	controlsWrapperStyle: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'space-between',
		padding: 10,
		position: 'absolute',
		right: 0,
	},
	dotStyle: {
		backgroundColor: 'rgba(0,0,0,.2)',
		borderRadius: 4,
		height: 8,
		marginBottom: 3,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		width: 8,
	},
	dotsWrapperStyle: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	nextButtonStyle: {
		color: '#007aff',
	},
	prevButtonStyle: {
		color: '#777777',
	},
	sliderContainer: {
		backgroundColor: 'transparent',
		flex: 1,
		overflow: 'hidden',
		position: 'relative',
	},
});