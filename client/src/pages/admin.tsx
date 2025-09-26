import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/ui/file-upload";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Trash2, Upload, Users, MessageSquare, ImageIcon } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function Admin() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [language, setLanguage] = useState('nl');
  const t = useTranslation(language as any);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'nl';
    setLanguage(savedLanguage);
  }, []);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !(user as any)?.isAdmin)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  // Fetch photos
  const { data: photos, isLoading: photosLoading } = useQuery({
    queryKey: ['/api/photos'],
    enabled: !!(user as any)?.isAdmin,
  });

  // Fetch contact submissions
  const { data: submissions, isLoading: submissionsLoading } = useQuery({
    queryKey: ['/api/admin/contact-submissions'],
    enabled: !!(user as any)?.isAdmin,
  });

  // Photo upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await fetch('/api/photos', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Photo uploaded successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/photos'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to upload photo",
        variant: "destructive",
      });
    },
  });

  // Photo delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (photoId: number) => {
      return await apiRequest("DELETE", `/api/photos/${photoId}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Photo deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/photos'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !(user as any)?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">{t('login.required')}</h1>
              <Button asChild>
                <a href="/api/login">{t('login.button')}</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground" data-testid="admin-title">{t('admin.title')}</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <a href="/">← Back to Site</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/api/logout">{t('logout.button')}</a>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="photos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="photos" className="flex items-center gap-2" data-testid="tab-photos">
              <ImageIcon className="w-4 h-4" />
              {t('admin.photos.title')}
            </TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center gap-2" data-testid="tab-submissions">
              <MessageSquare className="w-4 h-4" />
              {t('admin.submissions.title')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  {t('admin.photos.upload')}
                </CardTitle>
                <CardDescription>
                  Upload new photos to the gallery. Supported formats: JPEG, PNG, WebP (max 5MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onUpload={uploadMutation.mutateAsync}
                  isUploading={uploadMutation.isPending}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>
                  {Array.isArray(photos) ? photos.length : 0} photos in gallery
                </CardDescription>
              </CardHeader>
              <CardContent>
                {photosLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : photos && Array.isArray(photos) && photos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(photos as any[]).map((photo: any) => (
                      <div key={photo.id} className="relative group" data-testid={`admin-photo-${photo.id}`}>
                        <img
                          src={photo.thumbnailUrl || photo.url}
                          alt={photo.originalName}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMutation.mutate(photo.id)}
                            disabled={deleteMutation.isPending}
                            data-testid={`delete-photo-${photo.id}`}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t('admin.photos.delete')}
                          </Button>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground truncate">{photo.originalName}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(photo.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No photos uploaded yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Contact Form Submissions
                </CardTitle>
                <CardDescription>
                  {Array.isArray(submissions) ? submissions.length : 0} total submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="animate-pulse space-y-2">
                          <div className="h-4 bg-muted rounded w-1/3"></div>
                          <div className="h-4 bg-muted rounded w-2/3"></div>
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : submissions && Array.isArray(submissions) && submissions.length > 0 ? (
                  <div className="space-y-4">
                    {(submissions as any[]).map((submission: any) => (
                      <div key={submission.id} className="p-4 border rounded-lg" data-testid={`submission-${submission.id}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-foreground">
                              {submission.firstName} {submission.lastName}
                            </h4>
                            <p className="text-sm text-muted-foreground">{submission.email}</p>
                            {submission.phone && (
                              <p className="text-sm text-muted-foreground">{submission.phone}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              {new Date(submission.createdAt).toLocaleString()}
                            </p>
                            {submission.service && (
                              <Badge variant="secondary" className="mt-1">
                                {submission.service}
                              </Badge>
                            )}
                            {submission.language && (
                              <Badge variant="outline" className="mt-1 ml-2">
                                {submission.language.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-foreground whitespace-pre-wrap">{submission.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No submissions yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
