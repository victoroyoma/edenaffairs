import React, { useState, memo } from 'react';
import { Upload, X, Image, Film } from 'lucide-react';
interface MediaUploaderProps {
  maxPhotos: number;
  maxVideos: number;
  onPhotoChange: (files: File[]) => void;
  onVideoChange: (files: File[]) => void;
}
export function MediaUploader({
  maxPhotos,
  maxVideos,
  onPhotoChange,
  onVideoChange
}: MediaUploaderProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [videoPreviewUrls, setVideoPreviewUrls] = useState<string[]>([]);
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const allowedFiles = newFiles.slice(0, maxPhotos - photos.length);
      const updatedPhotos = [...photos, ...allowedFiles];
      setPhotos(updatedPhotos);
      onPhotoChange(updatedPhotos);
      // Create preview URLs
      const newPreviewUrls = allowedFiles.map(file => URL.createObjectURL(file));
      setPhotoPreviewUrls([...photoPreviewUrls, ...newPreviewUrls]);
    }
  };
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const allowedFiles = newFiles.slice(0, maxVideos - videos.length);
      const updatedVideos = [...videos, ...allowedFiles];
      setVideos(updatedVideos);
      onVideoChange(updatedVideos);
      // Create preview URLs
      const newPreviewUrls = allowedFiles.map(file => URL.createObjectURL(file));
      setVideoPreviewUrls([...videoPreviewUrls, ...newPreviewUrls]);
    }
  };
  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
    onPhotoChange(newPhotos);
    // Release object URL to avoid memory leaks
    URL.revokeObjectURL(photoPreviewUrls[index]);
    const newPreviewUrls = [...photoPreviewUrls];
    newPreviewUrls.splice(index, 1);
    setPhotoPreviewUrls(newPreviewUrls);
  };
  const removeVideo = (index: number) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
    onVideoChange(newVideos);
    // Release object URL to avoid memory leaks
    URL.revokeObjectURL(videoPreviewUrls[index]);
    const newPreviewUrls = [...videoPreviewUrls];
    newPreviewUrls.splice(index, 1);
    setVideoPreviewUrls(newPreviewUrls);
  };
  return <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Photos (Max {maxPhotos})
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {photoPreviewUrls.map((url, index) => <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-slate-700">
              <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
              <button type="button" onClick={() => removePhoto(index)} className="absolute top-1 right-1 bg-slate-900/80 rounded-full p-1 text-white">
                <X size={16} />
              </button>
            </div>)}
          {photos.length < maxPhotos && <label className="aspect-square rounded-md border border-dashed border-slate-600 flex flex-col items-center justify-center cursor-pointer bg-slate-800/50 hover:bg-slate-800 transition">
              <Image size={24} className="text-gray-400 mb-2" />
              <span className="text-xs text-gray-400">Add Photo</span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Upload clear photos of yourself (JPEG, PNG)
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Videos (Optional, Max {maxVideos})
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {videoPreviewUrls.map((url, index) => <div key={index} className="relative aspect-video rounded-md overflow-hidden border border-slate-700">
              <video src={url} className="w-full h-full object-cover" />
              <button type="button" onClick={() => removeVideo(index)} className="absolute top-1 right-1 bg-slate-900/80 rounded-full p-1 text-white">
                <X size={16} />
              </button>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-slate-900/80 flex items-center justify-center">
                  <Film size={24} className="text-amber-400" />
                </div>
              </div>
            </div>)}
          {videos.length < maxVideos && <label className="aspect-video rounded-md border border-dashed border-slate-600 flex flex-col items-center justify-center cursor-pointer bg-slate-800/50 hover:bg-slate-800 transition">
              <Film size={24} className="text-gray-400 mb-2" />
              <span className="text-xs text-gray-400">Add Video</span>
              <input type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
            </label>}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Upload a short introduction video (MP4, max 30MB)
        </p>
      </div>
    </div>;
}