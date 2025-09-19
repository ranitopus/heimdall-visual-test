import { describe, it, expect } from 'vitest'

import visualTestingTasks from './taskHandlers'

describe('function #visualTestingTasks', () => {
  it('should provide the expected helping methods to be called by visual tests on Cypress as tasks', () => {
    // Arrange
    const methods = [
      'maybeVisualTestExists', 'mvToVisualTestFolder', 'rmCurrentVisualState'
    ]
    // Act
    const result = visualTestingTasks()
    methods.forEach(methodName => {
      // Assert
      expect(result?.[methodName]).to.exist.and.toBeTypeOf('function')
    })
  })

  describe.todo('method #maybeVisualTestExists')
  describe.todo('method #mvToVisualTestFolder')
  describe.todo('method #rmCurrentVisualState')
})
