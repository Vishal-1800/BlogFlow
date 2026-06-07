import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from './StatusBadge';
import { formatDate, truncate } from '@/lib/utils';
import { CATEGORY_COLORS } from '@/constants';

/**
 * Post preview card for dashboard and listings.
 * @param {object} props
 * @param {object} props.post - Post data object
 */
export function PostCard({ post }) {
  const categoryColor = CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground';

  return (
    <Link to={`/posts/${post._id}`}>
      <Card className="group overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 h-full">
        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="relative overflow-hidden aspect-video">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        )}

        <CardContent className={post.thumbnail ? 'pt-4' : 'pt-6'}>
          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="outline"
              className={`text-xs ${categoryColor} border-0`}
            >
              {post.category}
            </Badge>
            <StatusBadge status={post.status} />
          </div>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {truncate(post.content, 120)}
          </p>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground gap-4">
          <span className="flex items-center gap-1.5">
            <User className="h-3 w-3" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {formatDate(post.createdAt)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
