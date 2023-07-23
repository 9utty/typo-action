function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React$1 = require('react');
var React$1__default = _interopDefault(React$1);

var Cursor = function Cursor(_ref) {
  var _ref$cursorText = _ref.cursorText,
    cursorText = _ref$cursorText === void 0 ? '|' : _ref$cursorText,
    _ref$cursorColor = _ref.cursorColor,
    cursorColor = _ref$cursorColor === void 0 ? 'white' : _ref$cursorColor;
  var _useState = React$1.useState(1),
    cursorOpacity = _useState[0],
    setCursorOpacity = _useState[1];
  React$1.useEffect(function () {
    var cursorInterval = setInterval(function () {
      setCursorOpacity(function (state) {
        return state === 0 ? 1 : 0;
      });
    }, 500);
    return function () {
      clearInterval(cursorInterval);
    };
  }, []);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: cursorOpacity,
      paddingLeft: '3px',
      color: cursorColor
    }
  }, cursorText);
};

var TypoAction = function TypoAction(_ref) {
  var text = _ref.text,
    _ref$pointText = _ref.pointText,
    pointText = _ref$pointText === void 0 ? '' : _ref$pointText,
    className = _ref.className,
    _ref$pointColor = _ref.pointColor,
    pointColor = _ref$pointColor === void 0 ? 'red' : _ref$pointColor,
    _ref$cursorText = _ref.cursorText,
    cursorText = _ref$cursorText === void 0 ? '|' : _ref$cursorText,
    _ref$cursorView = _ref.cursorView,
    cursorView = _ref$cursorView === void 0 ? true : _ref$cursorView,
    _ref$cursorColor = _ref.cursorColor,
    cursorColor = _ref$cursorColor === void 0 ? 'white' : _ref$cursorColor,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 0 : _ref$delay,
    _ref$speed = _ref.speed,
    speed = _ref$speed === void 0 ? 100 : _ref$speed;
  var _useState = React$1.useState(''),
    displayedText = _useState[0],
    setDisplayedText = _useState[1];
  var _useState2 = React$1.useState(false),
    animationPlayed = _useState2[0],
    setAnimationPlayed = _useState2[1];
  var _useState3 = React$1.useState(null),
    intervalId = _useState3[0],
    setIntervalId = _useState3[1];
  var _useState4 = React$1.useState(false),
    playing = _useState4[0],
    setPlaying = _useState4[1];
  var _useState5 = React$1.useState(false),
    isVisible = _useState5[0],
    setIsVisible = _useState5[1];
  var textRef = React$1.useRef(null);
  var applyPointText = function applyPointText(inputText) {
    if (pointText) {
      var targetIndex = inputText.indexOf(pointText);
      if (targetIndex !== -1) {
        return /*#__PURE__*/React$1__default.createElement(Fragment, null, inputText.slice(0, targetIndex), /*#__PURE__*/React$1__default.createElement("span", {
          style: {
            color: pointColor
          }
        }, pointText), inputText.slice(targetIndex + pointText.length));
      }
    }
    return inputText;
  };
  var handleScroll = function handleScroll(callback) {
    if (playing) return;
    if (!animationPlayed && displayedText.length < text.length) {
      var index = 0;
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
      var startAnimation = function startAnimation() {
        var interval = setInterval(function () {
          if (index < text.length) {
            setDisplayedText(function (displayText) {
              return text.slice(0, ++index);
            });
          } else {
            clearInterval(interval);
            setIntervalId(null);
            callback();
          }
        }, speed);
        setIntervalId(interval);
      };
      if (delay !== 0) {
        setTimeout(startAnimation, delay);
      } else {
        startAnimation();
      }
      setAnimationPlayed(true);
      setPlaying(true);
    }
  };
  var reversedAnimation = function reversedAnimation(callback) {
    if (playing) return;
    var reversedIndex = text.length;
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    var reversedInterval = setInterval(function () {
      if (reversedIndex > -1) {
        setDisplayedText(function (displayText) {
          if (displayText.length > 0) {
            return text.slice(0, reversedIndex);
          }
          return displayText;
        });
        reversedIndex--;
      } else {
        clearInterval(reversedInterval);
        setIntervalId(null);
        callback();
      }
    }, speed);
    setIntervalId(reversedInterval);
    setPlaying(true);
  };
  React$1.useEffect(function () {
    var observer = new IntersectionObserver(function (entries) {
      setIsVisible(entries[0].isIntersecting);
    }, {
      threshold: 1
    });
    if (textRef.current) {
      observer.observe(textRef.current);
    }
    return function () {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [textRef]);
  React$1.useEffect(function () {
    if (isVisible) {
      if (!animationPlayed && displayedText.length < text.length) {
        handleScroll(function () {
          setPlaying(false);
          setAnimationPlayed(true);
        });
      }
    } else {
      if (animationPlayed && displayedText.length === text.length) {
        reversedAnimation(function () {
          setPlaying(false);
          setAnimationPlayed(false);
        });
      }
    }
  }, [isVisible]);
  return /*#__PURE__*/React$1__default.createElement("span", {
    className: className,
    ref: textRef
  }, applyPointText(displayedText), cursorView && /*#__PURE__*/React$1__default.createElement(Cursor, {
    cursorText: cursorText,
    cursorColor: cursorColor
  }));
};

module.exports = TypoAction;
//# sourceMappingURL=index.js.map
