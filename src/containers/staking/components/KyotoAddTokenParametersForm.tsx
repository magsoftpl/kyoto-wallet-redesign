import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Modal } from '@/components/complex-controls/Modal'
import { EthValueFormatter } from '@/components/formatters/EthValueFormatter'
import { Button } from '@/components/simple-controls/button/Button'
import { Input } from '@/components/simple-controls/input/Input'
import { getApyLabel } from '../logic/getStakeApy'
import { formatEther } from 'viem'
import { getDisplayedError } from '@/utils/formik/getDisplayedError'

interface KyotoAddTokenParametersFormProps {
  balance: bigint
  poolAvailability: bigint
  minAmountEth: number
  onClose(): void
  onSubmit(amountEth: number): void
}

export const KyotoAddTokenParametersForm = ({
  balance,
  poolAvailability,
  minAmountEth,
  onClose,
  onSubmit,
}: KyotoAddTokenParametersFormProps) => {
  const balanceEth = Number(formatEther(balance))
  const poolAvailabilityEth = Number(formatEther(poolAvailability))
  const validationSchema = Yup.object({
    amountEth: Yup.number()
      .required()
      .min(minAmountEth)
      .max(Math.min(balanceEth, poolAvailabilityEth), 'Amount not available'),
  })

  const handleSubmit = (values: { amountEth: string }) => {
    onSubmit(Number(values.amountEth))
  }

  return (
    <Modal title={<div className="pt-4">Stake Kyoto</div>} theme="dark" show hasCloseButton onClose={onClose}>
      <div className="w-screen max-w-[30rem] h-[20rem] p-4 pb-8 flex flex-col gap-8 uppercase text-center">
        <Formik
          initialValues={{
            amountEth: String(Math.min(balanceEth, 1)),
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, values, touched, isValid, handleChange }) => (
            <Form className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-between">
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full px-8 flex justify-between items-center">
                    <div>Pool availability</div>
                    <EthValueFormatter valueWei={poolAvailability} currency="KYOTO" />
                  </div>
                  <div className="w-full px-8 flex justify-between items-center">
                    <div>Apy %</div>
                    {getApyLabel()}
                  </div>
                  <div className="w-full px-8 flex justify-between items-center">
                    <div>Your balance</div>
                    <EthValueFormatter valueWei={balance} currency="KYOTO" />
                  </div>
                  <div className="w-full flex justify-center">
                    <div className="flex gap-8 items-center">
                      <label className="pb-3" htmlFor="amountEth">
                        Amount
                      </label>
                      <Input
                        id="amountEth"
                        type="number"
                        aria-label="Amount"
                        min={minAmountEth}
                        step="any"
                        value={values.amountEth}
                        error={getDisplayedError({ errors, touched }, 'amountEth')}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full pt-4 px-8">
                  <Button type="submit" variant="primary" fullWidth>
                    Preview
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}
