import React, { useState, useRef, useEffect } from 'react';

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
  var _useState = useState(''),
    displayedText = _useState[0],
    setDisplayedText = _useState[1];
  var _useState2 = useState(false),
    animationPlayed = _useState2[0],
    setAnimationPlayed = _useState2[1];
  var _useState3 = useState(1),
    cursorOpacity = _useState3[0],
    setCursorOpacity = _useState3[1];
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
      if (isVisible && !animationPlayed) {
        if (delay !== 0) {
          setTimeout(function () {
            setDisplayedText('');
            var index = 0;
            var interval = setInterval(function () {
              if (index < text.length) {
                setDisplayedText(function (displayText) {
                  if (displayText.length < text.length) {
                    return text.slice(0, index + 1);
                  }
                  return displayText;
                });
                index++;
              } else {
                clearInterval(interval);
              }
            }, speed);
          }, delay);
        } else {
          setDisplayedText('');
          var index = 0;
          var interval = setInterval(function () {
            if (index < text.length) {
              setDisplayedText(function (displayText) {
                if (displayText.length < text.length) {
                  return text.slice(0, index + 1);
                }
                return displayText;
              });
              index++;
            } else {
              clearInterval(interval);
            }
          }, speed);
        }
        setAnimationPlayed(true);
      } else if (!isVisible && animationPlayed) {
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
  useEffect(function () {
    window.addEventListener('scroll', handleScroll);
    return function () {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(function () {
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
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    ref: textRef
  }, applyPointText(displayedText), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: '2px',
      color: cursorColor,
      opacity: cursorOpacity
    }
  }, cursorText));
};

export default TypoAction;
//# sourceMappingURL=index.modern.js.map
