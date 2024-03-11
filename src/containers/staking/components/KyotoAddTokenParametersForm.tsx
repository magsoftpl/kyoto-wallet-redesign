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
  onClose(): void
  onSubmit(amountEth: number): void
}

export const KyotoAddTokenParametersForm = ({
  balance,
  poolAvailability,
  onClose,
  onSubmit,
}: KyotoAddTokenParametersFormProps) => {
  const validationSchema = Yup.object({
    amountEth: Yup.number()
      .min(1)
      .max(Number(formatEther(balance)), 'Usufficient funds')
      .max(Number(formatEther(poolAvailability)), 'Amount not available'),
  })

  const handleSubmit = (values: { amountEth: string }) => {
    onSubmit(Number(values.amountEth))
  }

  return (
    <Modal title="Stake Kyoto" theme="dark" show hasCloseButton onClose={onClose}>
      <div className="w-full max-w-[25rem] p-4 pb-8 flex flex-col gap-8 justify-center uppercase text-center">
        <Formik
          initialValues={{
            amountEth: '1',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, values, touched, isValid, handleChange }) => (
            <Form>
              <div className="w-full">
                <div className="w-full flex flex-col gap-3">
                  <div className="px-8 flex justify-between items-center">
                    <div>Pool availability</div>
                    <EthValueFormatter valueWei={poolAvailability} currency="KYOTO" />
                  </div>
                  <div className="px-8 flex justify-between items-center">
                    <div>Apy %</div>
                    {getApyLabel()}
                  </div>
                  <div className="px-8 flex justify-between items-center">
                    <div>Your balance</div>
                    <EthValueFormatter valueWei={balance} currency="KYOTO" />
                  </div>
                  <div className="px-8 flex items-center gap-4">
                    <label className="pb-3" htmlFor="amountEth">
                      Amount
                    </label>
                    <Input
                      id="amountEth"
                      type="number"
                      aria-label="Amount"
                      min={1}
                      step="any"
                      value={values.amountEth}
                      error={getDisplayedError({ errors, touched }, 'amountEth')}
                      onChange={handleChange}
                    />
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
