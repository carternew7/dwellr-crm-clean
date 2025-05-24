import { useState } from 'react';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useUploadAudio() {
  const [uploading, setUploading] = useState(false);

  const uploadAudio = async (file: File, path: string) => {
    setUploading(true);
    toast.info('Uploading audio...');

    const { error } = await supabase.storage
      .from('recordings')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      });

    setUploading(false);

    if (error) {
      toast.error('Upload failed');
      console.error(error);
      return false;
    }

    toast.success('Upload complete!');
    return true;
  };

  return { uploading, uploadAudio };
}
