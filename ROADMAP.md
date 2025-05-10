ROADMAP 1.0
===========

## Architecture, tooling & codebase
### Technical milestones
- [x] Basic API for image comparison using JavaScript Image instances, Canvas elements, and HSL pixels comparison
- [x] Integration with Cypress
- [x] NPM first package publishing (naive implementation + Cypress integration only)
- [x] Consolidate ROADMAP 1.0
- [ ] **Unit testing for the abstract lib for image comparison `IN PROGRESS`**
- [ ] End-to-end/functional testing for the Cypress integration
- [ ] CI automated pipeline to run tests before merging
- [ ] Basic GitHub commit/branch/pull request rules and branch protection for contribution/version control safety
- [ ] CHANGELOG
- [ ] Bundle/build process with separation of libs (example: [Lerna](https://lerna.js.org/))
- [ ] CD automated pipeline to publish NPM package (publish only the built bundle)
- [ ] Better criteria for pixels comparison, with more cofigurable thresholds (separating H, S and L)
- [ ] Give to the Cypress test command the capacity of screenshoting single DOM elements
- [ ] Improve/add new image comparison methods (make it less naive and brute-force, possibly apply SURF and/or SIFT from OpenCV)
- [ ] "How-to-use" documentation (Improve README and/or add more docs if needed) `<<< 1.0.0-alpha milestones end here`
- [ ] TypeScript type definitions
- [ ] Improve test logging for the Cypress command
- [ ] Friendly display of image comparison on the Cypress suite screen (for headless runs with video recording, for example)
- [ ] Better abstract lib for image comparison, with richer API, working on both Node.js and browser environments
- [ ] Integration with Vitest
- [ ] Presentation site/landing page
- [ ] CONTRIBUTING and LICENSE documentations

## 1.0.0-alpha Release
### Planned release date
- Release deadline: July 31, 2025
### Expected behavior & features
- Two image comparison strategies: *Naive* (pixel by pixel comparison with some control thresholds), or *OpenCV Algorithm* ([SIFT](https://docs.opencv.org/4.x/da/df5/tutorial_py_sift_intro.html), [SURF](https://docs.opencv.org/4.x/df/dd2/tutorial_py_surf_intro.html), or some other alternative, yet to be chosen)
- Each comparison strategy available with variation settings:
  - For the *Naive* strategy:
    - Threshold for the amount of pixels flagged as different between images before accusing the compared images as being different from each other
    - Thresholds for how "distant" (under the lense of HSL values for comparison) two pixels have to be to be considered different from each other (one threshold for Hue, another for Saturation, and another for Luminosity)
  - For the *OpenCV Algorithm* strategy:
    - TBD (because it depends on the chosen strategy that this lib will offer)
- Cypress integration with the following features:
  - Cypress configuration attribute used to define where the images will be accessed from and stored
  - Cypress command to actually do the assertion, with the following arguments/settings:
    - File name used to name the saved current image and to search for the base image
    - Element selector for filtering, in the case where we don't want a comparison of the entire screen, just for a specific element
    - Selector to choose one of the available comparison strategies: *Naive* or *OpenCV Algorithm*
      - Arguments to pass in all the variation settings available for each strategy
  - Cypress background tasks needed to be used by the Cypress command (without those tasks setup on Cypress configs, the command won't work)
- Basic usage documentation (either on README.md or another markdown file in the repository)

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
