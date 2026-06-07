import { Link } from 'react-router-dom';
import {
  FileText,
  Eye,
  PenSquare,
  TrendingUp,
  Sparkles,
  ArrowRight,
  BarChart3,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { StatsCard } from '@/components/common/StatsCard';
import { PostCard } from '@/components/common/PostCard';
import { useStats, usePosts } from '@/hooks/usePosts';

/**
 * Dashboard page with welcome section, stats, recent posts, and quick actions.
 */
export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: postsData, isLoading: postsLoading } = usePosts({ limit: 6 });

  const posts = postsData?.posts || [];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 border border-indigo-500/20 p-8 md:p-10 animate-fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-400">
              Blog Management Dashboard
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Welcome to <span className="gradient-text">BlogFlow</span>
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Manage your blog posts, track performance, and create stunning content — all from one place.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/posts/new">
              <Button className="gap-2">
                <PenSquare className="h-4 w-4" />
                Create New Post
              </Button>
            </Link>
            <Link to="/posts">
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </Card>
          ))
        ) : (
          <>
            <StatsCard
              title="Total Posts"
              value={stats?.total ?? 0}
              icon={<FileText className="h-6 w-6" />}
              description="All time posts"
            />
            <StatsCard
              title="Published"
              value={stats?.published ?? 0}
              icon={<TrendingUp className="h-6 w-6" />}
              description="Live on your blog"
            />
            <StatsCard
              title="Drafts"
              value={stats?.draft ?? 0}
              icon={<PenSquare className="h-6 w-6" />}
              description="Work in progress"
            />
            <StatsCard
              title="Categories"
              value={stats?.categoriesCount ?? 0}
              icon={<Layers className="h-6 w-6" />}
              description="Content categories"
            />
          </>
        )}
      </div>

      {/* Recent Posts */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Recent Posts
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Your latest blog content
            </p>
          </div>
          <Link to="/posts">
            <Button variant="ghost" size="sm" className="gap-1.5">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {postsLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-40 w-full rounded-lg mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-2/3" />
              </Card>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No posts yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start creating content to see it here.
            </p>
            <Link to="/posts/new">
              <Button>Create Your First Post</Button>
            </Link>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/posts/new">
          <Card className="group cursor-pointer hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500/20 transition-colors duration-300">
                <PenSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Create Post</h3>
                <p className="text-xs text-muted-foreground">Write something new</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/posts">
          <Card className="group cursor-pointer hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-colors duration-300">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Manage Posts</h3>
                <p className="text-xs text-muted-foreground">View and edit posts</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="group cursor-pointer hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20 transition-colors duration-300">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Analytics</h3>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
