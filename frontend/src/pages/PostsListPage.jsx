import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  TrendingUp,
  PenSquare,
  Layers,
  Plus,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { EmptyState } from '@/components/common/EmptyState';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DataTable } from '@/components/table/DataTable';
import { SearchBar } from '@/components/table/SearchBar';
import { Pagination } from '@/components/table/Pagination';
import { usePosts, useSearchPosts, useDeletePost, useStats } from '@/hooks/usePosts';
import { useDebounce } from '@/hooks/useDebounce';
import { CATEGORIES } from '@/constants';
import postService from '@/services/postService';

/**
 * Posts listing page with filters, search, table, and CRUD actions.
 */
export default function PostsListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 400);
  const isSearching = debouncedSearch.length > 0;

  // Main posts query
  const {
    data: postsData,
    isLoading: postsLoading,
  } = usePosts({ page, limit: 10, category, status });

  // Search query
  const {
    data: searchData,
    isLoading: searchLoading,
  } = useSearchPosts({ query: debouncedSearch, page, limit: 10 });

  const { data: stats } = useStats();
  const deleteMutation = useDeletePost();

  // Determine which data to show
  const activeData = isSearching ? searchData : postsData;
  const isLoading = isSearching ? searchLoading : postsLoading;
  const posts = activeData?.posts || [];
  const pagination = activeData?.pagination;
  const totalPages = pagination?.pages || 1;
  const totalItems = pagination?.total || 0;

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget._id);
    setDeleteTarget(null);
  };

  const handleExport = () => {
    postService.exportCSV({ category, status });
  };

  const handleCategoryChange = (val) => {
    setCategory(val === 'all' ? '' : val);
    setPage(1);
  };

  const handleStatusChange = (val) => {
    setStatus(val === 'all' ? '' : val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog Posts"
        description="Manage, filter, and organize all your blog content."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
            <Link to="/posts/new">
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Posts"
          value={stats?.total ?? 0}
          icon={<FileText className="h-5 w-5" />}
        />
        <StatsCard
          title="Published"
          value={stats?.published ?? 0}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatsCard
          title="Drafts"
          value={stats?.draft ?? 0}
          icon={<PenSquare className="h-5 w-5" />}
        />
        <StatsCard
          title="Categories"
          value={stats?.categoriesCount ?? 0}
          icon={<Layers className="h-5 w-5" />}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
        />
        <div className="flex gap-3">
          <Select value={category || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[160px] bg-muted/30">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={status || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px] bg-muted/30">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table or Empty State */}
      {!isLoading && posts.length === 0 ? (
        <EmptyState
          title={isSearching ? 'No results found' : 'No posts yet'}
          description={
            isSearching
              ? `No posts matching "${debouncedSearch}". Try adjusting your search or filters.`
              : 'Create your first blog post to get started!'
          }
          actionLabel={isSearching ? undefined : 'Create New Post'}
          actionHref={isSearching ? undefined : '/posts/new'}
        />
      ) : (
        <>
          <DataTable
            posts={posts}
            isLoading={isLoading}
            onDelete={setDeleteTarget}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Post"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
