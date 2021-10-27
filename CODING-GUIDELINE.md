## CODING GUIDELINES

### General

- use react and libraries hooks
- components folder should index file and contain subcomponents folders
- functions in components should use useCallback hook
- every folder should have index.ts file which should export all files
- any component in pages folder should wrapped instead Layout component

```tsx
import { FunctionComponent } from "react";
import Lib from "libs";
import { Box } from "@mui/material";

// helpers
import { helper } from "/src/helpers";

// hooks (custom)
import { useFetch } from "/src/hooks";

// components
import Layout from "components/Layout";
import NotFound from "components/NotFound";

export const NotFoundPage: FunctionComponent = () => (
  <Layout>
    <NotFound />
  </Layout>
);
```

- component structure should be

```tsx
... imports

export const SomeComponent = () => {
  ... useState

  ... custom hooks

  ... useMemo

  ... useCallbacks(handler functions)

  ... useCallback(render functions)

  ... useEffects

  ...other code

  return
}

... exports
```

### Git

- commit guideline - https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines (as a scope use task number)

#### How to create new branch for task

(feat or fix)

- git checkout feat/TASK-1

#### How to commit

- git commit -m feat(task-1): describe what you do

#### How to resolve conflict

- git commit pull origin dev // get new changes
- git checkout yourBranch
- git rebase develop
- if have conflict resolve it and do git rebase --continue

### Folder structure

- src
  - components
    - common
      - ComponentName
        - new.tsx
    - OtherComponent
      - new.tsx
  - hooks
    - customHook.ts
  - helpers
    - helper.ts
- .env (environment variables, always need to be .gitignore)
- .env.example (environment example for git, without value)
- .eslintignore
- .eslintrc (for esLint configs)
- .prettierrc (for setting prettier)

### EXTENSION For project

- install TODO Highlight extension in your vs code
- copy and paste code bellow in extension settings.json file

```json
{
  "todohighlight.isEnable": true,
  "todohighlight.isCaseSensitive": true,
  "todohighlight.keywords": [
    {
      "text": "INFO:",
      "color": "blue",
      "backgroundColor": "rgba(0,0,0,.2)"
    },
    {
      "text": "TODO:",
      "color": "yellow",
      "backgroundColor": "rgba(0,0,0,.2)"
    },
    {
      "text": "UGLY:",
      "color": "peru",
      "backgroundColor": "rgba(0,0,0,.2)"
    }
  ],
  "todohighlight.maxFilesForSearch": 5120,
  "todohighlight.toggleURI": false
}
```

- use INFO: if your comment is informative
- use TODO: if you want change or add something in that code
- use UGLY: if you think your code might be better, but you don’t know yet how P.S. it works!
