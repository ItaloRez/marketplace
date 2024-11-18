import { api } from '@/lib/axios'

interface UploadAttachmentBody {
  files: FormData
}

interface UploadAttachmentResponse {
  attachments: [
    {
      id: string
      url: string
    },
  ]
}

export async function uploadAttachment({ files }: UploadAttachmentBody) {
  return await api.post<UploadAttachmentResponse>('/attachments', files)
}
