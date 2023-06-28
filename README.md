# vue-tailwind-lib

Vue 3 + Tailwind CSS components and utilities library. It includes a [Storybook](https://storybook.js.org/) to develop and test components in isolation.

This library is published as a [NPM package](https://www.npmjs.com/package/@nethserver/vue-tailwind-lib) and is currently used by [nethsecurity-ui](https://github.com/NethServer/nethsecurity-ui).

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Development

You can develop and build [inside a container (recommended)](#develop-inside-a-container) or [on your workstation](#develop-on-your-workstation).

### Develop inside a container

You have two options:

- [Build and start a Podman container](#build-and-start-a-podman-container), or
- [Use VSCode Dev Containers](#use-vscode-dev-containers)

#### Build and start a Podman container

Build the container defined by `Containerfile`:

```
podman build -t vue-tailwind-lib .
```

Start storybook (`--network=host` is required for hot-reload):

```
podman run -ti -v $(pwd):/app:Z --network=host --name vue-tailwind-lib-1 --replace vue-tailwind-lib storybook
```

Compiles and minifies before publishing. Build output is put inside `dist` directory:

```
podman run -ti -v $(pwd):/app:Z --network=host --name vue-tailwind-lib-1 --replace vue-tailwind-lib build
```

Publish a new version of the NPM package:

```
podman run -ti -v $(pwd):/app:Z --network=host --name vue-tailwind-lib-1 --replace vue-tailwind-lib publish
```

#### Use VSCode Dev Containers

- Install VSCode extension [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) (beware: this procedure may not work on [VSCodium](https://vscodium.com/))
- Dev Containers uses Docker by default but you can configure it to use Podman: go to `File > Preferences > Settings`, search `dev containers docker path` and type `podman` as `Docker path`
- Open `vue-tailwind-lib` directory (the repository root) in VSCode, if you haven't already
- Open Command Palette (`CTRL+SHIFT+P`) and type `Reopen in Container` (or `Rebuild and Reopen in Container`, if needed)
- Open VSCode integrated terminal: `View > Terminal`
- Enter one of the following commands:
  - `npm install`: project setup
  - `npm run storybook`: start storybook with hot-reload
  - `npm run build`: compiles and minifies before publishing. Build output is put inside `dist` directory
  - `npm publish`: Publish a new version of the NPM package

Container configuration is contained inside `.devcontainer/devcontainer.json`.

### Develop on your workstation

Developing inside a container is the recommended way, but if you want to do it on your workstation:

- Install Node.js (LTS version, currently v18) and npm
- Run a web server on your workstation (hot reloading enabled):
  - `npm install`: project setup
  - `npm run storybook`: start storybook with hot-reload
  - `npm run build`: compiles and minifies before publishing. Build output is put inside `dist` directory
  - `npm publish`: Publish a new version of the NPM package
