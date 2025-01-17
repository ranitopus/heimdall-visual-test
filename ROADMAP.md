ROADMAP 1.0
===========

## Architecture, tooling & codebase
### Technical milestones
- [x] Basic API for image comparison using JavaScript Image instances, Canvas elements, and HSL pixels comparison
- [x] Integration with Cypress
- [x] NPM package publishing (naive implementation + Cypress integration only)
- [ ] **Consolidate ROADMAP 1.0 `IN PROGRESS`**
- [ ] **Unit testing for the abstract lib for image comparison `IN PROGRESS`**
- [ ] End-to-end/functional testing for the Cypress integration
- [ ] CI Automated Pipeline to run tests before merging
- [ ] Friendly display of image comparison on the Cypress suite screen (for headless runs with video recording, for example)
- [ ] Improve test logging for the Cypress command
- [ ] Better abstract lib for image comparison, with richer API, working on both Node.js and browser environments
- [ ] Give to the Cypress test command the capacity of screenshoting single DOM elements
- [ ] TypeScript type definitions
- [ ] "How-to-use" documentation (Improve README and add more docs if needed)
- [ ] Bundle/build process with separation of libs (example: [Lerna](https://lerna.js.org/))
- [ ] CD Automated Pipeline to publish NPM package
- [ ] Better criteria for pixels comparison, with more cofigurable thresholds (separating H, S and L)
- [ ] Improve/add new image comparison methods (make it less naive and brute-force, possibly apply SURF and/or SIFT from OpenCV)
- [ ] Integration with Vitest

## 1.0.0-alpha Release
### Planned release date
- (TBD...)
### Expected behavior & features
- Two image comparison options: *Naive* (pixel by pixel comparison with some control thresholds), or *OpenCV Algorithm* ([SIFT](https://docs.opencv.org/4.x/da/df5/tutorial_py_sift_intro.html), [SURF](https://docs.opencv.org/4.x/df/dd2/tutorial_py_surf_intro.html), or some other alternative, yet to be chosen)
- (...)

## 1.0.0-beta Release
### Planned release date
- (TBD...)
### Expected behavior & features
- (TBD...)

## 1.0.0 Release
### Planned release date
- (TBD...)
### Expected behavior & features
- (TBD...)
