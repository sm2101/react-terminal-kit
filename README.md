# ReactTerminalKit

[![npm version](https://badge.fury.io/js/react-terminal-kit.svg)](https://badge.fury.io/js/react-terminal-kit)
[![Build Status](https://travis-ci.com/ReactTerminalKit/react-terminal-ui.svg?branch=main)](https://travis-ci.com/ReactTerminalKit/react-terminal-ui)
[![Coverage Status](https://coveralls.io/repos/github/ReactTerminalKit/react-terminal-ui/badge.svg?branch=main)](https://coveralls.io/github/ReactTerminalKit/react-terminal-ui?branch=main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Overview

The React Terminal UI package provides a terminal-like user interface for React applications. It allows you to integrate a fully functional terminal component into your React project, enabling users to interact with the application through a command-line interface.

## Installation

To install the React Terminal UI package, use npm or yarn:

```bash
npm install react-terminal-ui
# or
yarn add react-terminal-ui
```

## Usage

1. Import the Terminal component into your React component.

   ```jsx
   import React from "react";
   import Terminal from "react-terminal-ui";
   ```

2. Add the Terminal component to your JSX, providing the necessary props.

   ```jsx
   const commands = {
     help: {
       description: "Show help information",
       callback: (utils, args) => {
         utils.displayOutput("Displaying help information...");
       },
     },
   };

   const MyComponent = () => {
     return (
       <div>
         {/* Your other components */}
         <Terminal
           prefix="root"
           prompt="$"
           cursor="block"
           theme="dark"
           commands={commands}
         />
       </div>
     );
   };
   ```

## Terminal Props

- **prefix**
  A string representing the prefix displayed before the prompt. Defaults to an empty string.

- **prompt**
  A string representing the prompt displayed at the beginning of each command line. Defaults to $.

- **cursor**
  A string representing the cursor type. Options include `'block'`, `'underline'`, and `'bar'`. Defaults to `'block'`.

- **theme**
  A string representing the color theme. Options include `'light'` and `'dark'`. Defaults to 'dark'.

- **commands (required)**
  An object where keys are command triggers and values are objects containing the following properties:
  - description: A short description of the command.
  - callback: A function to be executed when the command is entered. It receives two parameters: utils and args.

---

### Utility Functions

The `utils` parameter passed to the command callbacks contains the following utility functions:

1. `displayOutput(args: DisplayOutputArgs)`: Displays text in the terminal output. ([DisplayOutputArgs](#displayoutputargs))

2. `clearScreen()`: Clears the terminal screen.

3. `input(options: InputOptions): Promise<string>`: Awaits user input. ([InputOptions](#inputoptions))

4. `password(options: PasswordOptions): Promise<string>`: Awaits user input with masking (password). ([PasswordOptions](#passwordoptions))

5. `confirm(prompt: BooleanOptions): Promise<boolean>`: Awaits user choice (Yes/No). ([BooleanOptions](#booleanoptions))

6. `select(options: SelectOptions): Promise<number>`: Awaits user choice from a list of options and returns the index of chosen option. ([SelectOptions](#selectoptions))

7. `openFullScreen(path: string)`: Opens a full-screen output with a specified path. (See [FullScreenOutput](#fullscreenoutput) Component)

8. `closeFullScreen()`: Closes the currently open fullscreen output.

#### DisplayOutputArgs

Represents the arguments for the `displayOutput` function, allowing developers to customize the content and styling of a single line in the terminal window.

- **Each `displayOutput()` call will only print 1 line to the terminal window:**

  - Ensures that each call focuses on presenting a distinct piece of information.

- **The array of `DisplayOutputArgs` is used to style different sections of a single line:**

  - Allows for granular control over the appearance of each part of the displayed content.

- **The dev can pass in a `ReactNode` as an input as well, and that will be displayed as-is on the window:**

  - Provides flexibility to pass a `ReactNode` as content, seamlessly integrating with React components. A [`<Text/>`](#text) component is available for this use case to match terminal styles seamlessly.

- **If a normal string is passed, it'll be displayed with default styling:**
  - Enables quick display of plain text without specifying additional styling options.

#### InputOptions

Represents the options for the `input` function, allowing developers to customize the behavior of the input function.
| Property | Type | Default | Description |
| -------------- | --------------------- | --------------------- | -------------------------------------------------------------------------------- |
| `allowEmpty` | `boolean` (optional) | `true` | Allow empty input. If set to true, the user can submit an empty input. |
| `maxRetries` | `number` (optional) | `NA` | Maximum number of retries allowed. If set to 0, retries are infinite, and `allowEmpty` must be false. |
| `retryMessage` | `string` (optional) | `NA` | Message displayed on retry. |
| `errorMessage` | `string` (optional) | `NA` | Message displayed on error. |
| `validator` | `(input: string) => boolean` (optional) |`NA` | Validator function to check the validity of the input. Should return true if valid, false otherwise. |

#### PasswordOptions

Represents the options for the `password` function, allowing developers to customize the behavior of the password function.

| Property                       | Type                 | Default | Description                                                   |
| ------------------------------ | -------------------- | ------- | ------------------------------------------------------------- |
| `mask`                         | `boolean` (optional) | `true`  | Mask the user's input with asterisks (\*) to keep it private. |
| _Inherits from `InputOptions`_ |

#### BooleanOptions

Represents the options for the `choice` function, allowing developers to customize the behavior of the choice function.

| Property  | Type                 | Default       | Description                               |
| --------- | -------------------- | ------------- | ----------------------------------------- |
| `true`    | `string`             | Yes           | Text to display for a true confirmation.  |
| `false`   | `string`             | No            | Text to display for a false confirmation. |
| `default` | `boolean` (optional) | Not specified | Default selection                         |

#### SelectOptions

Represents the options for the `select` function, allowing developers to customize the behavior of the select function.

| Property  | Type                | Default       | Description                      |
| --------- | ------------------- | ------------- | -------------------------------- |
| `options` | `string[]`          | Not specified | Array of options to choose from. |
| `default` | `number` (optional) | Not specified | Default selection index          |

---

### Available Components

#### FullScreenOutput

The `FullScreenOutput` component is designed to display fullscreen content within the terminal. It provides a way to present extensive information or interactive content in a dedicated fullscreen view.

##### FullScreenOutput Props

| Property         | Type              | Default       | Description                                                               |
| ---------------- | ----------------- | ------------- | ------------------------------------------------------------------------- |
| `unmountOnExit`  | `boolean`         | `false`       | If set to true, the component will unmount when exiting full-screen.      |
| `path`(required) | `string`          | Not specified | A string representing the path or identifier for the full-screen content. |
| `children`       | `React.ReactNode` | Not specified | The content to be displayed within the full-screen output.                |

Example:

```jsx
<FullScreenOutput unmountOnExit={true} path="example-path">
  {/* Your fullscreen content goes here */}
</FullScreenOutput>
```

#### Text

The Text component allows you to display plain text within the terminal. It is useful for rendering simple textual content with terminal styling.

##### Text Props

| Property    | Type                             | Default       | Description                                                         |
| ----------- | -------------------------------- | ------------- | ------------------------------------------------------------------- |
| `variant`   | `OutputVariant`                  | Not specified | The text variant, defining the styling of the text.                 |
| `color`     | `OutputColor`                    | Not specified | The color variant, defining the color of the text.                  |
| `children`  | `React.ReactNode`                | Not specified | The content to be displayed within the `Text` component.            |
| `id`        | `string` (optional)              | Not specified | The HTML id attribute for additional styling or targeting.          |
| `className` | `string` (optional)              | Not specified | Additional CSS classes to apply to the `Text` component.            |
| `href`      | `string` (optional)              | Not specified | If provided, the `Text` component will render as an anchor (`<a>`). |
| `style`     | `React.CSSProperties` (optional) | Not specified | Inline styles to apply to the `Text` component.                     |

Example:

```jsx
<Text
  variant="body1"
  color="primary"
  id="example-id"
  className="custom-class"
  href="https://example.com"
  style={{ fontWeight: "bold" }}
>
  This is an example text using the Text component.
</Text>
```
