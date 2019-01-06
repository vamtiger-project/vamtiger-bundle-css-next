# VAMTIGER Bundle CSS Next
[VAMTIGER Bundle CSS Next](https://github.com/vamtiger-project/vamtiger-bundle-css-next) bundles  [CSS Next](http://cssnext.io/) into a single compiled output file.

## Installation
[VAMTIGER Bundle CSS Next](https://github.com/vamtiger-project/vamtiger-bundle-css-next) can be installed using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/lang/en/):
```javascript
npm i --global vamtiger-bundle-css-next 
```
or
```javascript
yarn global vamtiger-bundle-css-next
```

## Usage
[VAMTIGER Bundle CSS Next](https://github.com/vamtiger-project/vamtiger-bundle-css-next) can bundle [CSS Next](http://cssnext.io/) to a single compiled output file:
```bash
vamtiger-bundle-css-next --entryFilePath absolute/path/source/index.css --bundleFilePath --bundleFilePath absolute/path/build/index.css
```

The **watch** option can be added to generate compiled output each time a source file is updated:
```bash
vamtiger-bundle-css-next --entryFilePath absolute/path/source/index.css --bundleFilePath --bundleFilePath absolute/path/build/index.css --watch
```

The **copyBundleFilePath** option will copy the compiled output to a defined path:
```bash
vamtiger-bundle-css-next --relativePath --entryFilePath absolute/path/source/index.css --bundleFilePath --bundleFilePath absolute/path/build/index.css --copyBundleFilePath absolute/path/some/bundle.css
```

The **relativePath** option can be used to reference **entryFilePath** and **bundleFilePath** relative to the current working directory:
```bash
vamtiger-bundle-css-next --relativePath --entryFilePath source/index.ts --bundleFilePath build/bundle.css --sourcemap inline --copyBundleFilePath absolute/path/some/bundle-copy.css
```

Referencing the **--bundleFilePath** with the **ts** extension will generate the bundle as a **Typescript** file:
```bash
vamtiger-bundle-css-next --relativePath --entryFilePath source/index.ts --bundleFilePath build/bundle.css --sourcemap inline --copyBundleFilePath absolute/path/some/bundle-copy.ts
```

[VAMTIGER Bundle CSS Next](https://github.com/vamtiger-project/vamtiger-bundle-css-next) can also be defined as a custom script:
```json
    ...
    scripts: {
        "bundle-css": "vamtiger-bundle-css-next --relativePath --entryFilePath source/index.css --bundleFilePath --bundleFilePath build/index.css",
        "watch": "vamtiger-bundle-css-next --relativePath --entryFilePath source/index.css --bundleFilePath --bundleFilePath build/index.css --watch"
    }
    ...
```