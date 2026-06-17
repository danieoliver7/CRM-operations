import type {
  CampaignWorkspaceFactsDto,
  DetailResponse,
} from '@/modules/campaigns/types';

export type CampaignWorkspaceApiErrorCode =
  | 'CAMPAIGN_NOT_FOUND'
  | 'BACKEND_UNAVAILABLE'
  | 'UNEXPECTED_RESPONSE';

export class CampaignWorkspaceApiError extends Error {
  code: CampaignWorkspaceApiErrorCode;
  status?: number;

  constructor(code: CampaignWorkspaceApiErrorCode, message: string, status?: number) {
    super(message);
    this.name = 'CampaignWorkspaceApiError';
    this.code = code;
    this.status = status;
  }
}

const DEFAULT_API_BASE_URL = '';

function getApiBaseUrl() {
  const meta = import.meta as ImportMeta & { env?: { VITE_API_BASE_URL?: string } };

  return (meta.env?.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, '');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

async function readJsonResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function getErrorCode(payload: unknown, status: number): CampaignWorkspaceApiErrorCode {
  if (isRecord(payload)) {
    const error = payload.error;
    if (isRecord(error) && error.code === 'CAMPAIGN_NOT_FOUND') return 'CAMPAIGN_NOT_FOUND';
  }

  if (status === 404) return 'CAMPAIGN_NOT_FOUND';

  return 'UNEXPECTED_RESPONSE';
}

function getErrorMessage(code: CampaignWorkspaceApiErrorCode) {
  if (code === 'CAMPAIGN_NOT_FOUND') return 'Campaign not found.';
  if (code === 'BACKEND_UNAVAILABLE') return 'Backend unavailable.';

  return 'Unable to load campaign workspace.';
}

export async function getCampaignWorkspaceFacts(
  campaignId: string,
  options?: { signal?: AbortSignal },
): Promise<CampaignWorkspaceFactsDto> {
  const url = `${getApiBaseUrl()}/campaigns/${encodeURIComponent(campaignId)}/workspace`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: options?.signal,
    });

    const payload = await readJsonResponse(response);

    if (!response.ok) {
      const code = getErrorCode(payload, response.status);
      throw new CampaignWorkspaceApiError(code, getErrorMessage(code), response.status);
    }

    if (!isRecord(payload) || !isRecord((payload as DetailResponse<unknown>).data)) {
      throw new CampaignWorkspaceApiError('UNEXPECTED_RESPONSE', getErrorMessage('UNEXPECTED_RESPONSE'), response.status);
    }

    return (payload as DetailResponse<CampaignWorkspaceFactsDto>).data;
  } catch (error) {
    if (error instanceof CampaignWorkspaceApiError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') throw error;

    throw new CampaignWorkspaceApiError('BACKEND_UNAVAILABLE', getErrorMessage('BACKEND_UNAVAILABLE'));
  }
}
