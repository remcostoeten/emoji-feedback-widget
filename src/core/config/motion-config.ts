// Configuration values for the initial show/fade-in animation of the feedback component.
const showFeedbackMotionConfig = {
	initial: { opacity: 0, y: 100, scale: 0.5 },
	animate: (isAnimatingOut: boolean) => ({
		scale: 1,
		opacity: isAnimatingOut ? 0 : 1,
		y: isAnimatingOut ? 100 : 0,
	}),
	exit: { scale: 0.5, opacity: 0, y: 100 },
	transition: {
		type: 'spring',
		stiffness: 75,
		duration: 0.5,
		ease: [0.16, 0.1, 0.3, 1],
	},
}

// The configuration object for the animation that starts when a user clicks on an emoji and the feedback form shows up.
const afterEmojiClick = {
	initial: { height: 0, opacity: 0 },
	animate: {
		height: 'auto',
		opacity: 1,
		transition: {
			height: { duration: 0.4, delay: 0.4 * 0.25 },
			opacity: { duration: 0.4 },
		},
	},
	exit: { height: 0, opacity: 0 },
	transition: {
		duration: 0.4,
		ease: [0.16, 0.1, 0.3, 1],
	},
}

// The configuration object for the animation of the form which shows up after the emoji click animation for a nicer effect than having them fire simultaneously

const formAnimation = {
	initial: { scale: 0.7, opacity: 0, rotateX: '31deg', rotateZ: '0deg' },
	animate: {
		opacity: 1,
		scale: 1,
		rotateX: '0deg',
		rotateZ: '0deg',
		transition: {
			ease: 'easeInOut',
			duration: 0.35,
			delay: 0.3, // 0.3 seconds delay after afterEmojiClick animation
		},
	},
	exit: { opacity: 0 },
	transition: {
		duration: 0.4,
		ease: [0.16, 0.1, 0.3, 1],
	},
}

export { showFeedbackMotionConfig, afterEmojiClick, formAnimation }

/**
 * Configuration object for feedback motion.
 *
 * @property {Object} initial - Initial state of the animation.
 * @property {number} initial.opacity - Initial opacity (0 = fully transparent).
 * @property {number} initial.y - Initial y-axis position (100 units down).
 * @property {number} initial.scale - Initial scale (0.5 = half size).
 *
 * @property {Function} animate - Function to define the animate state.
 * @param {boolean} isAnimatingOut - Flag to determine if the component is animating out.
 * @returns {Object} - Animate state of the animation.
 * @property {number} animate.scale - Scale during animation (1 = full size).
 * @property {number} animate.opacity - Opacity during animation (0 = fully transparent, 1 = fully visible).
 * @property {number} animate.y - y-axis position during animation (0 = original position, 100 = 100 units down).
 *
 * @property {Object} exit - Exit state of the animation.
 * @property {number} exit.scale - Scale during exit (0.5 = half size).
 * @property {number} exit.opacity - Opacity during exit (0 = fully transparent).
 * @property {number} exit.y - y-axis position during exit (100 units down).
 *
 * @property {Object} transition - Transition properties for the animation.
 * @property {string} transition.type - Type of transition ('spring').
 * @property {number} transition.stiffness - Stiffness of the spring.
 * @property {number} transition.duration - Duration of the animation (0.5 seconds).
 * @property {Array<number>} transition.ease - Easing function for the animation.
 */
