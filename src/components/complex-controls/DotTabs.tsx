import { ReactNode } from 'react'
import { Button } from '../simple-controls/button/Button'
import classNames from 'classnames'

interface DotTabsProps {
  steps: {
    title: string
    component: ReactNode
  }[]
  currentStep: number
  maxStep: number
  onStepClick?(step: number): void
}

export const DotTabs = ({ steps, currentStep, maxStep, onStepClick }: DotTabsProps) => {
  const toRender = steps[currentStep]?.component || null

  const calcDotClass = (dotIndex: number) => {
    return classNames(
      'w-4 h-4 rounded-full',
      dotIndex === currentStep ? 'bg-primary-400' : dotIndex <= maxStep ? 'bg-white' : 'bg-inactive-300',
    )
  }

  const handleDotClick = (index: number) => {
    if (!onStepClick) {
      return
    }
    onStepClick(index)
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full">{toRender}</div>
      <div className="w-full flex justify-center items-center gap-1">
        {steps.map((step, index) => (
          <Button
            key={index}
            layout="icon-only"
            variant="transparent"
            disabled={index > maxStep}
            aria-label={step.title}
            onClick={() => handleDotClick(index)}
          >
            <div className={calcDotClass(index)} />
          </Button>
        ))}
      </div>
    </div>
  )
}
