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

export const Settings = () => {
  const { currentUser } = useCurrentUserData()
  const email = currentUser?.email

  const { loadingState, settings } = useSettingsData()
  const { loadPage, unloadPage, loadSettingsData } = useSettingsLogic()
  const { showSettingsResetPasswordWizard } = useSettingsResetPasswordLogic()

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
      <div className="w-full min-h-72 py-12 md:px-4 flex justify-center gap-4">
        <div className="w-full max-w-[64rem]">
          <h1 className="w-full py-8 uppercase font-semibold text-3xl text-center">Settings</h1>
          {loadingState === 'loaded' && !!settings && (
            <div className="w-full p-8 rounded-2xl overflow-y-hidden border-inactive-100 border-solid border-2">
              <EmailSettingsRow email={email} onAddEmailClick={() => {}} />
              <Reset2FaSettingsRow last2FaChange={settings.last2FaChange} onReset2FaClick={() => {}} />
              <ResetPasswordSettingsRow
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
