# typo-action

> react typo animation

[![NPM](https://img.shields.io/npm/v/typo-action.svg)](https://www.npmjs.com/package/typo-action) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Execute

<img src="https://user-images.githubusercontent.com/86397600/254705149-0690f3eb-31c9-4913-9264-c623e01b5fa6.gif">

## Install

```bash
npm install --save typo-action
```

## Import

```tsx
import TypoAction from 'typo-action'
```

## Usage

```tsx
import React from 'react'

import TypoAction from 'typo-action'

const App = () => {
  return (
    <TypoAction
      text='No man lives alone.'
      className='typo-action1'
      cursorView={false}
      speed={80}
    />
  )
}
```

## UserGuide

### English

1. text - Please add a string to use.
2. className - Add the name of the css class to apply to the text.
3. pointText - Add the string you want to give points to. Note that the string must be inside the text for this to work.
4. pointColor - Enter a color to apply to the pointText.
5. cursorView - boolean to show or hide the cursor. (default: true)
6. cursorText - provide the text to display on the cursor, "|" is the default.
7. cursorColor - Provide a color to apply to the cursor.
8. delay - Enter the amount of time you want to delay before starting. (in ms)
9. speed - Please set the typo time for each Korean character.(is ms, default: 100)

### Korean

1. text - 사용할 문자열을 추가하세요.
2. className - 텍스트에 적용할 CSS 클래스의 이름을 추가합니다.
3. pointText - 포인트를 부여할 문자열을 추가합니다. 이 기능이 작동하려면 문자열이 텍스트 안에 있어야 합니다.
4. pointColor - pointText에 적용할 색상을 입력합니다.
5. cursorView - 커서를 표시하거나 숨기는 불입니다. (default: true)
6. cursorText - 커서에 표시할 텍스트를 입력합니다(기본값은 "|"입니다).
7. cursorColor - 커서에 적용할 색상을 입력합니다.
8. 지연 - 시작하기 전에 지연할 시간을 입력합니다. (ms 단위)
9. 속도 - 각 한글 문자에 대한 오타 시간을 설정합니다. (ms 단위, default: 100)

## Description

### English

This library works with React.
The main function of this library is to animate an array of strings, displaying the indexes one by one at speed and playing and reversing playback when scrolling.

### Korean

이 라이브러리는 React와 함께 작동합니다.
이 라이브러리의 주요 기능은 문자열 배열에 애니메이션을 적용하여 속도에 따라 인덱스를 하나씩 표시하고 스크롤할 때 재생 및 반전 재생을 하는 것입니다.

## License

MIT © [9utty](https://github.com/9utty)
