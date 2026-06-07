import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/common/PageHeader';
import { PostForm } from '@/components/forms/PostForm';
import { usePost, useUpdatePost } from '@/hooks/usePosts';

/**
 * Edit post page with prefilled form data.
 */
export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: postData, isLoading } = usePost(id);
  const updateMutation = useUpdatePost();

  const post = postData;

  const handleSubmit = async (data) => {
    const updatedData = {
      ...data,
      tags: data.tags
        ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };
    await updateMutation.mutateAsync({ id, data: updatedData });
    navigate('/posts');
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Skeleton className="h-4 w-48 mb-4" />
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Card>
          <CardContent className="p-8 space-y-6">
            <Skeleton className="h-10 w-full" />
            <div className="grid grid-cols-2 gap-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-10 w-32 ml-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold">Post not found</h2>
        <p className="text-muted-foreground mt-2">
          The post you're trying to edit doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="Edit Post"
        description={`Editing: ${post.title}`}
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Posts', href: '/posts' },
          { label: 'Edit Post' },
        ]}
      />

      <PostForm
        defaultValues={{
          title: post.title || '',
          content: post.content || '',
          author: post.author || '',
          email: post.email || '',
          category: post.category || '',
          status: post.status || 'Draft',
          tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
          thumbnail: post.thumbnail || '',
          shortDescription: post.shortDescription || '',
        }}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
        submitLabel="Update Post"
      />
    </div>
  );
}
