import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Modal } from '@/components/complex-controls/Modal'
import { EthValueFormatter } from '@/components/formatters/EthValueFormatter'
import { Button } from '@/components/simple-controls/button/Button'
import { Input } from '@/components/simple-controls/input/Input'
import { formatEther } from 'viem'
import { getDisplayedError } from '@/utils/formik/getDisplayedError'

interface KyotoClaimParametersFormProps {
  rewardsAvailable: bigint
  onClose(): void
  onSubmit(amountEth: number): void
}

export const KyotoClaimParametersForm = ({ rewardsAvailable, onClose, onSubmit }: KyotoClaimParametersFormProps) => {
  const rewardsAvailableEth = Number(formatEther(rewardsAvailable))
  const minAmountEth = Number(formatEther(BigInt(1), 'wei'))
  const validationSchema = Yup.object({
    amountEth: Yup.number()
      .min(minAmountEth)
      .max(Number(formatEther(rewardsAvailable)), 'Amount not available'),
  })

  const handleSubmit = (values: { amountEth: string }) => {
    onSubmit(Number(values.amountEth))
  }

  return (
    <Modal title={<div className="pt-4">Claim</div>} theme="dark" show hasCloseButton onClose={onClose}>
      <div className="w-screen max-w-[30rem] h-[20rem] p-4 pb-8 uppercase text-center">
        <Formik
          initialValues={{
            amountEth: String(Math.min(1, rewardsAvailableEth)),
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, values, touched, isValid, handleChange, setFieldValue }) => {
            return (
              <Form className="w-full h-full flex flex-col gap-8 justify-between">
                <div className="w-full flex py-6 flex-col gap-3">
                  <div className="px-8 flex justify-between items-center">
                    <div>Rewards available</div>
                    <EthValueFormatter valueWei={rewardsAvailable} currency="KYOTO" />
                  </div>
                  <div className="px-8 flex items-center gap-4">
                    <label className="basis-1/2 pb-3" htmlFor="amountEth">
                      Enter amount
                    </label>
                    <Input
                      id="amountEth"
                      type="number"
                      aria-label="Amount"
                      min={minAmountEth}
                      step="any"
                      value={values.amountEth}
                      error={getDisplayedError({ errors, touched }, 'amountEth')}
                      icon={
                        <Button
                          variant="transparent"
                          layout="icon-only"
                          type="button"
                          onClick={() => setFieldValue('amountEth', formatEther(rewardsAvailable))}
                        >
                          MAX
                        </Button>
                      }
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full pt-4 px-8">
                  <Button type="submit" variant="primary" fullWidth>
                    Confirm claim
                  </Button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Modal>
  )
}
