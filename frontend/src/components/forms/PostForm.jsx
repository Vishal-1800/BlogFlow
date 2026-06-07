import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { FormSelect } from './FormSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CATEGORIES, STATUSES } from '@/constants';
import { Loader2, Save } from 'lucide-react';

/** Zod schema for post validation — matches backend rules */
const postSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters'),
  author: z
    .string()
    .min(1, 'Author name is required')
    .max(100, 'Author name must not exceed 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  category: z
    .string()
    .min(1, 'Please select a category'),
  status: z
    .string()
    .min(1, 'Please select a status'),
  tags: z.string().optional(),
  thumbnail: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  shortDescription: z
    .string()
    .min(20, 'Short description must be at least 20 characters'),
  content: z
    .string()
    .min(100, 'Content must be at least 100 characters'),
});

const categoryOptions = CATEGORIES.map((c) => ({ value: c, label: c }));
const statusOptions = STATUSES;

/**
 * Reusable post form for creating and editing posts.
 * Uses React Hook Form + Zod for validation.
 * @param {object} props
 * @param {object} [props.defaultValues] - Pre-filled values for editing
 * @param {function} props.onSubmit - Submit handler receiving validated data
 * @param {boolean} [props.isSubmitting] - Whether form is submitting
 * @param {string} [props.submitLabel='Save Post'] - Submit button text
 */
export function PostForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Save Post',
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      author: '',
      email: '',
      category: '',
      status: 'Draft',
      tags: '',
      thumbnail: '',
      shortDescription: '',
      content: '',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-fade-in">
      <Card className="glass gradient-border">
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Title */}
          <FormInput
            label="Title"
            placeholder="Enter your blog post title"
            required
            error={errors.title?.message}
            {...register('title')}
          />

          {/* Author & Email row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Author"
              placeholder="Author name"
              required
              error={errors.author?.message}
              {...register('author')}
            />
            <FormInput
              label="Email"
              placeholder="author@example.com"
              type="email"
              required
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          {/* Category & Status row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <FormSelect
                  label="Category"
                  name="category"
                  placeholder="Select a category"
                  options={categoryOptions}
                  required
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.category?.message}
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormSelect
                  label="Status"
                  name="status"
                  placeholder="Select status"
                  options={statusOptions}
                  required
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.status?.message}
                />
              )}
            />
          </div>

          {/* Thumbnail URL */}
          <FormInput
            label="Thumbnail URL"
            placeholder="https://example.com/image.jpg"
            error={errors.thumbnail?.message}
            {...register('thumbnail')}
          />

          {/* Tags */}
          <FormInput
            label="Tags"
            placeholder="react, javascript, web-dev"
            description="Separate tags with commas"
            {...register('tags')}
          />

          <Separator />

          {/* Short Description */}
          <FormTextarea
            label="Short Description"
            placeholder="Write a brief summary of your post (min 20 characters)..."
            required
            rows={3}
            error={errors.shortDescription?.message}
            {...register('shortDescription')}
          />

          {/* Content */}
          <FormTextarea
            label="Content"
            placeholder="Write your full blog post content here (min 100 characters)..."
            required
            rows={12}
            error={errors.content?.message}
            {...register('content')}
          />

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {submitLabel}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
