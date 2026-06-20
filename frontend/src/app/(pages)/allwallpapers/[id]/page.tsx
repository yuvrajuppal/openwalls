"use client";

import { ArrowLeft, Heart, Download, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { APIROUTES } from "@/utils/APIROUTES";
import { downloadImage } from "@/utils/download";

export default function WallpaperDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [wallpaper, setWallpaper] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(APIROUTES.wallpaperById(id))
      .then(({ data }) => {
        setWallpaper(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-[70vh]">
        <RefreshCw className="w-8 h-8 animate-spin text-secondary" />
      </main>
    );
  }

  if (!wallpaper) {
    return (
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
        <h1 className="font-display-lg text-headline-md mb-4">Wallpaper not found</h1>
        <button
          onClick={() => router.back()}
          className="font-label-sm text-label-sm uppercase underline underline-offset-4 hover:text-primary transition-colors"
        >
          Go back
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 font-label-sm text-label-sm text-secondary hover:text-primary transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image */}
        <div className="flex-1 min-w-0">
          <div className="bg-surface-container overflow-hidden border border-outline-variant">
            <img
              className="w-full h-auto object-contain max-h-[75vh]"
              alt={wallpaper.id}
              src={wallpaper.imagelink}
            />
          </div>
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="border border-outline-variant divide-y divide-outline-variant">
            {/* Title */}
            <div className="px-6 py-5">
              <span className="font-meta-data text-meta-data text-secondary uppercase tracking-widest mb-1 block">
                ID
              </span>
              <h1 className="font-display-lg text-headline-md uppercase tracking-tight break-all">
                {wallpaper.id}
              </h1>
            </div>

            {/* Details */}
            <div className="px-6 py-5 space-y-4">
              <InfoRow label="Category" value={wallpaper.category} />
              <InfoRow label="Resolution" value={wallpaper.resolution} />
              <InfoRow
                label="File Size"
                value={formatFileSize(parseInt(wallpaper.file_size))}
              />
              <InfoRow label="File Type" value={wallpaper.file_type} />
              <InfoRow
                label="Dimensions"
                value={`${wallpaper.dimension_x} x ${wallpaper.dimension_y} px`}
              />
              <InfoRow
                label="Created"
                value={new Date(wallpaper.createdAt).toLocaleDateString()}
              />
            </div>

            {/* Actions */}
            <div className="px-6 py-5 flex gap-4">
              <button
                onClick={() => downloadImage(wallpaper.imagelink, `wallpaper-${wallpaper.id}`)}
                className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-secondary transition-colors active:scale-[0.99]"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="flex items-center justify-center gap-2 h-12 px-5 border border-outline-variant font-label-sm text-label-sm uppercase tracking-wider hover:border-primary transition-colors active:scale-[0.99]">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <span className="font-meta-data text-meta-data text-secondary uppercase tracking-widest shrink-0">
        {label}
      </span>
      <span className="font-label-sm text-label-sm text-right truncate">
        {value}
      </span>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(1)} KB`;
  return `${bytes} B`;
}
