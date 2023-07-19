function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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
    _ref$speed = _ref.speed,
    speed = _ref$speed === void 0 ? 100 : _ref$speed;
  var _useState = React.useState(''),
    displayedText = _useState[0],
    setDisplayedText = _useState[1];
  var _useState2 = React.useState(false),
    animationPlayed = _useState2[0],
    setAnimationPlayed = _useState2[1];
  var _useState3 = React.useState(1),
    cursorOpacity = _useState3[0],
    setCursorOpacity = _useState3[1];
  var textRef = React.useRef(null);
  var applyPointText = function applyPointText(inputText) {
    if (pointText) {
      var targetIndex = inputText.indexOf(pointText);
      if (targetIndex !== -1) {
        return /*#__PURE__*/React__default.createElement(Fragment, null, inputText.slice(0, targetIndex), /*#__PURE__*/React__default.createElement("span", {
          style: {
            color: pointColor
          }
        }, pointText), inputText.slice(targetIndex + pointText.length));
      }
    }
    return inputText;
  };
  var handleScroll = function handleScroll() {
    if (textRef.current) {
      var windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      var rect = textRef.current.getBoundingClientRect();
      var elemTop = rect.top;
      var isVisible = elemTop <= windowHeight;
      var isOutOfThreshold = elemTop <= windowHeight - 150;
      if (isVisible && !animationPlayed) ; else if (isOutOfThreshold && animationPlayed && displayedText.length === text.length) {
        var reversedIndex = text.length;
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
          }
        }, speed);
        setAnimationPlayed(false);
      }
    }
  };
  React.useEffect(function () {
    window.addEventListener('scroll', handleScroll);
    return function () {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  React.useEffect(function () {
    if (cursorView) {
      var cursorInterval = setInterval(function () {
        setCursorOpacity(function (prevCursorOpacity) {
          return 1 - prevCursorOpacity;
        });
      }, 500);
      return function () {
        clearInterval(cursorInterval);
      };
    }
  }, [cursorView]);
  return /*#__PURE__*/React__default.createElement("span", {
    className: className,
    ref: textRef
  }, applyPointText(displayedText), /*#__PURE__*/React__default.createElement("span", {
    style: {
      marginLeft: '2px',
      color: cursorColor,
      opacity: cursorOpacity
    }
  }, cursorText));
};

module.exports = TypoAction;
//# sourceMappingURL=index.js.map
