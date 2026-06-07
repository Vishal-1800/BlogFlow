import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Pencil,
  Calendar,
  User,
  Tag,
  Layers,
  Clock,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { usePost, useDeletePost } from '@/hooks/usePosts';
import { formatDate } from '@/lib/utils';
import { CATEGORY_COLORS } from '@/constants';
import { useState } from 'react';

/**
 * Post detail page with full content, metadata, and action buttons.
 */
export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: postData, isLoading } = usePost(id);
  const deleteMutation = useDeletePost();
  const [showDelete, setShowDelete] = useState(false);

  const post = postData;

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id);
    navigate('/posts');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <Skeleton className="h-8 w-32" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex gap-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold">Post not found</h2>
        <p className="text-muted-foreground mt-2">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/posts" className="mt-4 inline-block">
          <Button variant="outline">Back to Posts</Button>
        </Link>
      </div>
    );
  }

  const catColor = CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground';
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/posts">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Back to Posts
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link to={`/posts/${id}/edit`}>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-destructive hover:text-destructive"
            onClick={() => setShowDelete(true)}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Hero / Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={`${catColor} border-0`}>
            <Layers className="h-3 w-3 mr-1" />
            {post.category}
          </Badge>
          <StatusBadge status={post.status} />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDate(post.createdAt)}
          </span>
          {post.updatedAt && post.updatedAt !== post.createdAt && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Updated {formatDate(post.updatedAt)}
            </span>
          )}
        </div>
      </div>

      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="relative overflow-hidden rounded-xl border">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-auto max-h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
        </div>
      )}

      {/* Content */}
      <Card className="glass gradient-border">
        <CardContent className="p-6 md:p-10">
          <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-foreground/90">
            {post.content}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <Separator />

      {/* Footer Actions */}
      <div className="flex items-center justify-between pb-8">
        <Link to="/posts">
          <Button variant="outline" className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            All Posts
          </Button>
        </Link>
        <Link to={`/posts/${id}/edit`}>
          <Button className="gap-1.5">
            <Pencil className="h-4 w-4" />
            Edit Post
          </Button>
        </Link>
      </div>

      {/* Delete dialog */}
      <ConfirmDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        title="Delete Post"
        description={`Are you sure you want to delete "${post.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
