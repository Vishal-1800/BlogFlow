import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { PostForm } from '@/components/forms/PostForm';
import { useCreatePost } from '@/hooks/usePosts';

/**
 * Create new post page.
 */
export default function CreatePostPage() {
  const navigate = useNavigate();
  const createMutation = useCreatePost();

  const handleSubmit = async (data) => {
    // Convert tags string to array
    const postData = {
      ...data,
      tags: data.tags
        ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };
    await createMutation.mutateAsync(postData);
    navigate('/posts');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="Create New Post"
        description="Write and publish a new blog post."
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Posts', href: '/posts' },
          { label: 'Create New Post' },
        ]}
      />

      <PostForm
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
        submitLabel="Publish Post"
      />
    </div>
  );
}
