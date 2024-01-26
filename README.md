# React Terminal Kit

[![npm version](https://badge.fury.io/js/react-terminal-kit.svg)](https://badge.fury.io/js/react-terminal-kit)
[![Build Status](https://github.com/sm2101/react-terminal-kit/actions/workflows/webpack.yml/badge.svg)](https://github.com/sm2101/react-terminal-kit/actions/workflows/webpack.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Overview

The React Terminal Kit package provides a terminal-like user interface for React applications. It allows you to integrate a fully functional terminal component into your React project, enabling users to interact with the application through a command-line interface.

## Installation

To install the React Terminal Kit package, use npm or yarn:

```bash
npm install react-terminal-kit --save
# or
yarn add react-terminal-kit
```

## Usage

1. Import the Terminal component into your React component.

   ```jsx
   import React from "react";
   import Terminal, {
     TerminalCommands,
     TerminalUtils,
   } from "react-terminal-kit";
   ```

2. Add the Terminal component to your JSX, providing the necessary props.

   ```jsx
   const commands: TerminalCommands = {
     echo: {
       description: "Print the provided text",
       callback: (utils: TerminalUtils, args: string[]) => {
         utils.displayOutput(args.join(" "));
       },
     },
   };

   const MyComponent = () => {
     return (
       <div style={{ width: "500px", height: "300px" }}>
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

**Note**: The `Terminal` component, by default, takes 100% width and height. To control the dimensions, wrap it inside a div element with a specified width and height.

This ensures that the terminal is displayed within the specified dimensions and fits seamlessly into your application layout. If you have specific layout instructions or considerations, you can further customize this section based on your needs.

## Terminal Props

| Property   | Type     | Default Value | Description                                                                                                      |
| ---------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `prefix`   | `string` | `""`          | A string representing the prefix displayed before the prompt. Defaults to an empty string.                       |
| `prompt`   | `string` | `$`           | A string representing the prompt displayed at the beginning of each command line. Defaults to `$`.               |
| `cursor`   | `string` | `'block'`     | A string representing the cursor type. Options include 'block', 'underline', and 'bar'. Defaults to 'block'.     |
| `theme`    | `string` | `'dark'`      | A string representing the color theme. Options include 'light' and 'dark'. Defaults to 'dark'.                   |
| `commands` | `object` | (Required)    | An object where keys are command triggers and values are objects containing description and callback properties. |

### `commands` Object Properties

- `description`: A short description of the command.
- `callback`: A function to be executed when the command is entered. It receives two parameters: `utils` and `args`.

#### Default Commands

In addition to customizing commands using the `commands` prop, React Terminal Kit comes with a set of default commands that serve fundamental purposes. These default commands are included out of the box and should not be overwritten in your custom configurations.

| Command | Description                  | Callback Function                                      |
| ------- | ---------------------------- | ------------------------------------------------------ |
| `help`  | List all available commands. | Displays a list of available commands in the terminal. |
| `clear` | Clear the terminal.          | Clears the terminal screen.                            |

These default commands provide essential functionalities and are designed to work seamlessly with the React Terminal Kit package. Avoid overwriting these commands to ensure proper operation of the terminal component.

---

### Utility Functions

The `utils` parameter passed to the command callbacks contains the following utility functions:

1. `displayOutput(args: DisplayOutputArgs)`: Displays text in the terminal output.

2. `clearScreen()`: Clears the terminal screen.

3. `input(prompt: string, options: InputOptions): Promise<string>`: Awaits user input.

4. `password(prompt: string, options: PasswordOptions): Promise<string>`: Awaits user input with masking (password).

5. `confirm(prompt: string, options: BooleanOptions): Promise<boolean>`: Awaits user choice (Yes/No).

6. `select(prompt: string, options: SelectOptions): Promise<number>`: Awaits user choice from a list of options and returns the index of chosen option.

7. `openFullScreen(path: string)`: Opens a full-screen output with a specified path.

8. `closeFullScreen()`: Closes the currently open full-screen output.

[DisplayOutputArgs](#displayoutputargs) | [InputOptions](#inputoptions) | [PasswordOptions](#passwordoptions) | [BooleanOptions](#booleanoptions) | [SelectOptions](#selectoptions) | [FullScreenOutput](#fullscreenoutput)

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

The `FullScreenOutput` component is designed to display full-screen content within the terminal. It provides a way to present extensive information or interactive content in a dedicated full-screen view.

##### FullScreenOutput Props

| Property         | Type              | Default       | Description                                                               |
| ---------------- | ----------------- | ------------- | ------------------------------------------------------------------------- |
| `unmountOnExit`  | `boolean`         | `false`       | If set to true, the component will unmount when exiting full-screen.      |
| `path`(required) | `string`          | Not specified | A string representing the path or identifier for the full-screen content. |
| `children`       | `React.ReactNode` | Not specified | The content to be displayed within the full-screen output.                |

**Note:** Ensure that you use the `FullScreenOutput` component directly inside the `Terminal` component and pass any custom components as children to it. The `Terminal` component will only render the `FullScreenOutput` component if it is a direct child.

Example:

```jsx
import Terminal, { FullScreenOutput } from "react-terminal-kit";

<Terminal prefix="root" prompt="$" cursor="block" theme="dark">
  <FullScreenOutput path="example-path" unmountOnExit>
    {/* Your custom content here */}
  </FullScreenOutput>
</Terminal>;
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
import Terminal, {
  Text,
  TerminalCommands,
  TerminalUtils,
} from "react-terminal-kit";

const commands: TerminalCommands = {
  echo: {
    description: "Print the provided text",
    callback: (utils: TerminalUtils, args: string[]) => {
      utils.displayOutput(<Text>{args.join(" ")}</Text>);
    },
  },
};

const MyComponent = () => {
  return (
    <div style={{ width: "500px", height: "300px" }}>
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

### Issues

If you encounter any issues or have feature requests, please open an issue on the GitHub repository:

- [GitHub Issues](https://github.com/sm2101/react-terminal-kit/issues)

### License

The React Terminal Kit package is released under the MIT License. See the full license text here:

- [MIT License](https://github.com/sm2101/react-terminal-kit/blob/main/LICENSE.md)

### Author

Thank you for using React Terminal Kit! This package is maintained by [Siddharth Mittal](https://webxsid.com).

#### Contact

- GitHub: [sm2101](https://github.com/sm2101)
- Email: [hello@webxsid.com](mailto:hello@webxsid.com)

If you have any questions, feedback, or if you encounter issues, feel free to reach out. Your input is valuable, and we appreciate your interest in React Terminal Kit.

Happy coding!
