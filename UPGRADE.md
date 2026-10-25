# Node 26 tooling upgrade

Reviewed on 26 October 2026 against main `994df95`.

## Compatibility

Node 26.12.1 and pnpm 12.15.0 are pinned for development and CI. Node is build tooling here: the extension itself runs in the browser. The existing `.nvmrc` is updated rather than duplicated.

`pnpm compile` explicitly invokes TypeScript 7.0.2 through the `@typescript/native` npm alias. TypeScript 6.0.3 remains installed under its normal name for ESLint and other compiler API consumers. `pnpm compile:compat` invokes that compiler explicitly. Both packages expose a `tsc` executable, so scripts do not rely on bare `tsc` resolution.

Direct dependencies are at the current registry latest versions except compatible ESLint 9.39.5, its matching `@eslint/js`, and TypeScript 6 for the compiler API. The React ESLint plugin peer range does not yet include ESLint 10. The separate CLI alias supplies TypeScript 7.

## Verification

Under Node 26.12.1 and pnpm 12.15.0:

- Frozen install and peer dependency checks pass.
- ESLint and both compiler checks pass.
- All 36 existing node-forge security regression tests pass. The security patch, provenance, and integrity checks from main are preserved.
- Chrome MV3 and Firefox MV2 builds pass. Chrome, Firefox, and Firefox source ZIPs pass archive integrity checks; packaged manifests retain version 0.0.1.
- An isolated Chromium 155 profile loads the production extension. The popup counter changes from 0 to 1, the background service worker exposes the extension runtime API, and the actual content script runs on an intercepted matching Google URL. No popup page errors occur. No personal browser profile is used.
- The production dependency audit reports zero advisories. The full audit reports one high node-forge advisory by package version, despite the existing source backport. See [the backport scope and provenance](scripts/security/README.md). No audit exception is added.

Firefox was built and packaged, but its live browser runtime was not exercised. WXT warns that store distribution needs an extension ID and Firefox data collection declarations. These are consumer-specific settings for this boilerplate, not silently assigned here.

## Release readiness

The GitHub release workflow is tag-only. The previous manual trigger could create a release and tag named `main`; it is removed. Release packaging runs lint, both compilers, and the existing security regression suite, and GitHub CLI verifies that the tag already exists.

The package version is 0.0.1. Publication uses a reviewed `v0.0.1` tag and the tag-only workflow. Verify the release workflow and downloaded ZIPs before declaring publication complete. The generated ZIPs are unsigned build artifacts, not evidence of browser-store approval.

The native compiler provides a newer typecheck path; no speed or size improvement is claimed without a controlled benchmark.
