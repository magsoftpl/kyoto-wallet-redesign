'use client'

import { useEffect } from 'react'
import useCurrentUserData from '../authentication/dataSources/currentUser.slice'
import { SettingResetPasswordWizard } from '../loginAndRegistration/SettingResetPasswordWizard'
import { useSettingsResetPasswordLogic } from '../loginAndRegistration/logic/useSettingsResetPasswordLogic'
import { EmailSettingsRow } from './components/EmailSettingsRow'
import { Reset2FaSettingsRow } from './components/Reset2FaSettingsRow'
import { ResetPasswordSettingsRow } from './components/ResetPasswordSettingsRow'
import { useSettingsLogic } from './logic/useSettingsLogic'
import useSettingsData from './dataSources/settings.slice'
import { SettingsReset2FaWizard } from '../loginAndRegistration/SettingsReset2FaWizard'
import { useSettingsReset2FaLogic } from '../loginAndRegistration/logic/useSettingsReset2FaLogic'
import { useSettingsAddEmailLogic } from '../loginAndRegistration/logic/useSettingsAddEmailLogic'
import { SettingsAddEmailWizard } from '../loginAndRegistration/SettingsAddEmailWizard'

export const Settings = () => {
  const { currentUser } = useCurrentUserData()
  const email = currentUser?.email

  const { loadingState, settings } = useSettingsData()
  const { loadPage, unloadPage, loadSettingsData } = useSettingsLogic()
  const { showSettingsResetPasswordWizard } = useSettingsResetPasswordLogic()
  const { showSettingsReset2FaWizard } = useSettingsReset2FaLogic()
  const { showSettingsAddEmailWizard } = useSettingsAddEmailLogic()

  useEffect(() => {
    loadPage()
    return () => {
      unloadPage()
    }
  }, [loadPage, unloadPage])

  const handleRefreshSetting = () => {
    loadSettingsData()
  }

  return (
    <>
      <SettingResetPasswordWizard onClose={handleRefreshSetting} />
      <SettingsReset2FaWizard onClose={handleRefreshSetting} />
      <SettingsAddEmailWizard onClose={handleRefreshSetting} />
      <div className="w-full min-h-72 py-12 md:px-4 flex justify-center gap-4">
        <div className="w-full max-w-[64rem]">
          <h1 className="w-full py-8 uppercase font-semibold text-3xl text-center">Settings</h1>
          {loadingState === 'loaded' && !!settings && (
            <div className="w-full p-8 rounded-2xl overflow-y-hidden border-inactive-100 border-solid border-2">
              <EmailSettingsRow
                email={email}
                onAddEmailClick={showSettingsAddEmailWizard}
                onChangeEmailClick={() => {}}
              />
              <Reset2FaSettingsRow
                email={email}
                last2FaChange={settings.last2FaChange}
                onReset2FaClick={() => showSettingsReset2FaWizard(email!)}
              />
              <ResetPasswordSettingsRow
                email={email}
                lastPasswordChange={settings.lastPasswordChange}
                onResetPasswordClick={showSettingsResetPasswordWizard}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
