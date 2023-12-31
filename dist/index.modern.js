import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  strings.raw = raw;
  return strings;
}

var _templateObject, _templateObject2;
var TypoAction = function TypoAction(_ref) {
  var text = _ref.text,
    _ref$pointText = _ref.pointText,
    pointText = _ref$pointText === void 0 ? "" : _ref$pointText,
    className = _ref.className,
    _ref$pointColor = _ref.pointColor,
    pointColor = _ref$pointColor === void 0 ? "red" : _ref$pointColor,
    _ref$cursorText = _ref.cursorText,
    cursorText = _ref$cursorText === void 0 ? "|" : _ref$cursorText,
    _ref$cursorView = _ref.cursorView,
    cursorView = _ref$cursorView === void 0 ? true : _ref$cursorView,
    _ref$cursorColor = _ref.cursorColor,
    cursorColor = _ref$cursorColor === void 0 ? "white" : _ref$cursorColor,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 0 : _ref$delay,
    _ref$speed = _ref.speed,
    speed = _ref$speed === void 0 ? 100 : _ref$speed;
  var _useState = useState(""),
    displayedText = _useState[0],
    setDisplayedText = _useState[1];
  var _useState2 = useState(false),
    animationPlayed = _useState2[0],
    setAnimationPlayed = _useState2[1];
  var _useState3 = useState(null),
    intervalId = _useState3[0],
    setIntervalId = _useState3[1];
  var _useState4 = useState(false),
    playing = _useState4[0],
    setPlaying = _useState4[1];
  var _useState5 = useState(false),
    isVisible = _useState5[0],
    setIsVisible = _useState5[1];
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
  useEffect(function () {
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
  useEffect(function () {
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
  useEffect(function () {
    if (playing) return;
    if (isVisible) {
      if (!animationPlayed && displayedText.length < text.length) {
        handleScroll(function () {
          setPlaying(false);
        });
      }
    } else {
      if (animationPlayed && displayedText.length === text.length) {
        reversedAnimation(function () {
          setPlaying(false);
        });
      }
    }
  }, [isVisible, animationPlayed]);
  var blink = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n  }\n"])));
  var Cursor = styled.span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n    animation: ", " 1s step-end infinite;\n    color: ", ";\n  "])), blink, cursorColor);
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    ref: textRef
  }, /*#__PURE__*/React.createElement("div", null), applyPointText(displayedText), cursorView && /*#__PURE__*/React.createElement(Cursor, null, cursorText));
};

export default TypoAction;
//# sourceMappingURL=index.modern.js.map
