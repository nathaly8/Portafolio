import { useQuery } from '@tanstack/react-query';
import projects from '@/data/projects';
import siteContent from '@/data/siteContent';

export function useSiteContent() {
  return useQuery({
    queryKey: ['local', 'siteContent'],
    queryFn: async () => {
      return structuredClone(siteContent);
    },
    staleTime: Infinity,
    networkMode: 'always',
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ['local', 'projects', 'published'],
    queryFn: async () => {
      const items = structuredClone(projects.filter((project) => project.published === true));
      return items.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    },
    staleTime: Infinity,
    networkMode: 'always',
  });
}

export function useAllProjects() {
  return useQuery({
    queryKey: ['local', 'projects', 'all'],
    queryFn: async () => {
      const items = structuredClone(projects);
      return items.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    },
    staleTime: Infinity,
    networkMode: 'always',
  });
}

export function useProject(slug) {
  return useQuery({
    queryKey: ['local', 'project', slug],
    queryFn: async () => {
      const items = structuredClone(projects.filter((project) => project.slug === slug));
      return items[0] || null;
    },
    enabled: !!slug,
    staleTime: Infinity,
    networkMode: 'always',
  });
}