import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export function useSiteContent() {
  return useQuery({
    queryKey: ['siteContent'],
    queryFn: async () => {
      const items = await base44.entities.SiteContent.list();
      return items[0] || null;
    },
    staleTime: 1000 * 60,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects', 'published'],
    queryFn: async () => {
      const items = await base44.entities.Project.filter({ published: true });
      return items.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    },
    staleTime: 1000 * 60,
  });
}

export function useAllProjects() {
  return useQuery({
    queryKey: ['projects', 'all'],
    queryFn: async () => {
      const items = await base44.entities.Project.list();
      return items.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    },
    staleTime: 1000 * 30,
  });
}

export function useProject(slug) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const items = await base44.entities.Project.filter({ slug });
      return items[0] || null;
    },
    enabled: !!slug,
    staleTime: 1000 * 60,
  });
}