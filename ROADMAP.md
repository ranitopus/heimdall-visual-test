ROADMAP
=======

- [x] Basic API for image comparison using JavaScript Image instances, Canvas elements, and HSL pixels comparison
- [x] Integration with Cypress
- [x] NPM package publishing (base image comparison API + Cypress module)
- [ ] Unit testing for the abstract lib for image comparison
- [ ] Better abstract lib for image comparison, with richer API, working on Node.js and browser environments
- [ ] Friendly display of image comparison on the Cypress suite screen (for headless runs with video recording, for example)
- [ ] End-to-end/interface testing for the Cypress integration
- [ ] CI Automated Pipeline to run tests before merging
- [ ] TypeScript type definitions
- [ ] "How-to-use" documentation
- [ ] Improve test logging for the Cypress command
- [ ] Bundle/build process with separation of libs (example: [Lerna](https://lerna.js.org/))
- [ ] CD Automated Pipeline to publish NPM package
- [ ] Give to the Cypress test command the capacity of screenshoting single elements
- [ ] Better criteria for pixels comparison, with more cofigurable thresholds (separating H, S and L)
- [ ] Improve image comparison methods (make it less naive and brute-force)
- [ ] Integration with Vitest
