import React, { useState, useRef, useEffect } from 'react';

var TypoAction = function TypoAction(_ref) {
  var text = _ref.text,
    pointText = _ref.pointText,
    className = _ref.className,
    _ref$pointColor = _ref.pointColor,
    pointColor = _ref$pointColor === void 0 ? 'red' : _ref$pointColor,
    _ref$cursorText = _ref.cursorText,
    cursorText = _ref$cursorText === void 0 ? '|' : _ref$cursorText,
    _ref$cursorView = _ref.cursorView,
    cursorView = _ref$cursorView === void 0 ? true : _ref$cursorView,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 0 : _ref$delay,
    _ref$speed = _ref.speed,
    speed = _ref$speed === void 0 ? 100 : _ref$speed;
  var _useState = useState(''),
    displayedText = _useState[0],
    setDisplayedText = _useState[1];
  var _useState2 = useState(cursorView),
    showCursor = _useState2[0],
    setShowCursor = _useState2[1];
  var textRef = useRef(null);
  var applyPointText = function applyPointText(inputText) {
    if (pointText) {
      var targetIndex = inputText.indexOf(pointText);
      if (targetIndex !== -1) {
        return /*#__PURE__*/React.createElement(Fragment, null, inputText.slice(0, targetIndex), /*#__PURE__*/React.createElement("span", {
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
      var playTextAnimation = function playTextAnimation() {
        var index = 0;
        var interval = setInterval(function () {
          if (index < text.length) {
            setDisplayedText(text.substring(0, index + 1));
            index++;
          } else {
            clearInterval(interval);
          }
        }, speed);
      };
      if (isVisible) {
        if (delay !== 0) {
          setTimeout(function () {
            playTextAnimation();
          }, delay);
        } else {
          playTextAnimation();
        }
      } else {
        var reversedIndex = text.length;
        var reversedInterval = setInterval(function () {
          if (reversedIndex > -1) {
            setDisplayedText(text.substring(0, reversedIndex));
            reversedIndex--;
          } else {
            clearInterval(reversedInterval);
          }
        }, speed);
      }
    }
  };
  useEffect(function () {
    window.addEventListener('scroll', handleScroll);
    return function () {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [displayedText]);
  useEffect(function () {
    if (cursorView) {
      var cursorInterval = setInterval(function () {
        setShowCursor(function (prevShowCursor) {
          return !prevShowCursor;
        });
      }, 1000);
      return function () {
        clearInterval(cursorInterval);
      };
    }
  }, [cursorView]);
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    ref: textRef
  }, applyPointText(displayedText), /*#__PURE__*/React.createElement("span", {
    style: showCursor ? {
      marginLeft: '2px'
    } : {
      display: 'none'
    }
  }, cursorText));
};

export default TypoAction;
//# sourceMappingURL=index.modern.js.map
