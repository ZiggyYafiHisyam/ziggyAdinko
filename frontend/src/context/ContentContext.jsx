/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { fetchApi } from '../api';
import { manifestDefaults } from '../data/pageManifest';

const ContentContext = createContext({ overrides: {}, ready: false, reload: () => {} });

export const ContentProvider = ({ children }) => {
  // overrides shape: { home: { 'hero.title': 'custom' }, global: { ... }, ... }
  const [overrides, setOverrides] = useState({});
  const [ready, setReady] = useState(false);

  const reload = useCallback(async () => {
    try {
      const res = await fetchApi('/pages');
      setOverrides(res && res.data ? res.data : {});
    } catch {
      setOverrides({});
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => { reload(); }, [reload]);

  return (
    <ContentContext.Provider value={{ overrides, ready, reload }}>
      {children}
    </ContentContext.Provider>
  );
};

/**
 * usePageContent('home') -> { c, ready }
 *   c('hero.title')  -> saved override, else the manifest default, else ''
 */
export const usePageContent = (pageId) => {
  const { overrides, ready } = useContext(ContentContext);
  const pageOverrides = useMemo(() => overrides[pageId] || {}, [overrides, pageId]);

  const c = useCallback((key, inlineFallback) => {
    const ov = pageOverrides[key];
    if (ov !== undefined && ov !== null && ov !== '') return ov;
    const def = manifestDefaults[`${pageId}:${key}`];
    if (def !== undefined) return def;
    return inlineFallback !== undefined ? inlineFallback : '';
  }, [pageOverrides, pageId]);

  return { c, ready };
};

export const useContentAdmin = () => useContext(ContentContext);
