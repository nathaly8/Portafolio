import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

export const base44 = import.meta.env.VITE_ENABLE_BASE44_ADMIN === 'true' ? createClient({
  analytics: { enabled: false },
  appId,
  token,
  functionsVersion,
  serverUrl: '',
  appBaseUrl
}) : null;
