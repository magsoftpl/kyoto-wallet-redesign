import { useCallback, useMemo } from "react";
import { redirect, useRouter } from "next/navigation";
import { logInfo } from "../maintenanceLogs/maintenanceLog";

const urlMapping = {
  home: () => "/",
  login: () => "/login",
  dashboard: () => `/dashboard`,
  history: () => `/history`,
  staking: () => `/staking`,
  settings: () => `/settings`,
};

type UrlMapping = typeof urlMapping;
type LinkFn = <T extends OnrampUrl>(
  target: T,
  ...args: Parameters<UrlMapping[T]>
) => string;
type NavigationFn = <T extends OnrampUrl>(
  target: T,
  ...args: Parameters<UrlMapping[T]>
) => void;
export type GoToNavigationFn = NavigationFn & { withReplace: NavigationFn };

export type OnrampUrl = keyof UrlMapping;

export const useLinkProvider = (): LinkFn => {
  return useCallback(
    <T extends OnrampUrl>(target: T, ...args: Parameters<UrlMapping[T]>) =>
      (urlMapping[target] as any)(...args),
    []
  );
};

export const useRedirector = (): NavigationFn => {
  return useCallback(
    <T extends OnrampUrl>(target: T, ...args: Parameters<UrlMapping[T]>) => {
      const targetUrl = (urlMapping[target] as any)(...args);
      logInfo("Redirect", targetUrl);
      return redirect(targetUrl);
    },
    []
  );
};

export const useNavigator = (): GoToNavigationFn => {
  const router = useRouter();
  const result = useMemo(() => {
    const goToFn = (<T extends OnrampUrl>(
      target: T,
      ...args: Parameters<UrlMapping[T]>
    ) => {
      const targetUrl = (urlMapping[target] as any)(...args);
      logInfo("Navigate", targetUrl);
      router.push(targetUrl);
    }) as GoToNavigationFn;
    const replaceFn = <T extends OnrampUrl>(
      target: T,
      ...args: Parameters<UrlMapping[T]>
    ) => {
      const targetUrl = (urlMapping[target] as any)(...args);
      logInfo("Navigate (replace)", targetUrl);
      router.replace(targetUrl);
    };
    goToFn.withReplace = replaceFn;
    return goToFn;
  }, [router]);
  return result;
};
