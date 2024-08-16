<div align="center">
<h1>Copy File Tree</h1>
</div>

Copy the current workspace file tree to the clipboard.

![Demo](https://github.com/dejmedus/gifs/blob/main/copy-file-tree-demo.gif?raw=true)

## Extension Settings


Configure in settings which files not to include in the file tree:

1. Open settings
   - Click the gear icon in the bottom left corner, or
   - Navigate to `File > Preferences > Settings`
2. Search for "Copy File Tree" in the search bar at the top of the settings window.
3. Modify the settings:
   - `Copy File Tree: Ignore Environment Files`: Whether to ignore [environment files](#environment-files).
   - `Copy File Tree: Ignore Git Ignore`: Whether to ignore files listed in .gitignore.
   - `Copy File Tree: Custom Ignored Files`: An array of custom files to ignore.
   

#### File tree example:

```txt
├── README.md
├── bun.lockb
├── index.ts
├── package-lock.json
├── package.json
├── packages
│   ├── cli
│   │   ├── create.ts
│   │   └── studio.ts
│   ├── create
│   │   └── files
│   │       ├── README.md
│   │       ├── package.json
│   │       └── storyline.yaml
│   ├── storyfiles
│   │   ├── api
│   │   └── validation
│   │       ├── scehma.json
│   │       └── validate.ts
│   └── studio
│       ├── .eslintrc.json
│       ├── README.md
│       ├── app
│       │   ├── api
│       │   ├── favicon.ico
│       │   ├── globals.css
│       │   └── page.tsx
│       ├── next.config.mjs
│       ├── package-lock.json
│       ├── package.json
│       ├── postcss.config.mjs
│       ├── public
│       ├── tailwind.config.ts
│       └── tsconfig.json
├── scripts
│   └── precompile.sh
├── terminal.config.json
└── tsconfig.json

```

#### Environment files:

`node_modules` `dist` `build` `out` `coverage` `.next` `.git` `.DS_Store` `.vscode` `temp` `logs` `__pycache__` `.venv` `env` `venv` `target` `.idea` `.classpath` `.project` `.bundle` `vendor/bundle` `vendor` `bin` `pkg` `CMakeFiles` `.stack-work` `_build` `deps` `.dart_tool` and `.flutter-plugins`.